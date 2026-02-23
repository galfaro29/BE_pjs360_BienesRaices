// **MODELO DE USUARIO**  
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import {
  db as sequelize,
  User,
  Professional,
  ProfessionalApplication,
  ProfessionalType,
  Country,
  CountryProfessionalType
} from '../models/index.js';
import {
  ProfessionalApplicationPayload,
  CountryResponse,
  ProfessionalTypeResponse
} from '../types/professional/professional.types.js';

/**
 * getProfessionalDashboard
 * — Controlador para GET /professional/dashboard
 */
const getProfessionalDashboard = (req: Request, res: Response) => {
  res.json({
    code: 'SUCCESS_PROFESSIONAL_DASHBOARD',
    user: (req as any).user
  });
};

/**
 * createProfessionalApplication
 * — Controlador para POST /professional/applications
 * — Guarda los datos enviados por el formulario de aplicación profesional
 */
const createProfessionalApplication = async (req: Request<any, any, ProfessionalApplicationPayload>, res: Response) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      professionalTypeId,
      displayName,
      phone,
      email,
      bio,
      hasVehicle,
      vehicleType,
      canTravel,
      engagementModel,
      countryCode
    }: ProfessionalApplicationPayload = req.body;

    const isCommission = engagementModel === 'commission';

    // 🔎 Validaciones básicas
    if (!professionalTypeId || !displayName || !phone || !email || !engagementModel || (isCommission && !countryCode)) {
      return res.status(400).json({ code: 'ERR_VALIDATION' });
    }

    let countryConfig = null;

    if (isCommission) {
      countryConfig = await CountryProfessionalType.findOne({
        where: {
          countryCode,
          professionalTypeId,
          isEnabled: true,
          allowRegister: true
        }
      });

      if (!countryConfig) {
        return res.status(403).json({
          code: 'ERR_PROFESSIONAL_TYPE_NOT_ALLOWED'
        });
      }
    } else {
      const proType = await ProfessionalType.findOne({
        where: {
          id: professionalTypeId,
          status: true,
          engagementModel: { [Op.in]: ['subscription', 'both'] }
        }
      });

      if (!proType) {
        return res.status(403).json({
          code: 'ERR_PROFESSIONAL_TYPE_NOT_ALLOWED'
        });
      }
    }

    // 👤 Buscar o crear Usuario (en un flujo real esto usaría el usuario autenticado)
    // Para propósitos de esta refactorización, lo buscaremos por email
    let user = await User.findOne({ where: { email } });
    if (!user) {
      // Si no existe, lo creamos (ajustar según lógica de negocio si requiere password, etc)
      user = await User.create({
        email,
        name: displayName,
        role: 'professional',
        customId: `PRO-${Date.now()}` // Placeholder
      }, { transaction });
    } else {
      // Si ya existe, actualizamos su nombre si es necesario
      await user.update({ name: displayName, role: 'professional' }, { transaction });
    }

    // 🔍 Validación anti-duplicados en Professional
    const existingPro = await Professional.findOne({
      where: {
        userId: user.id,
        engagementModel,
        status: { [Op.in]: ['pending', 'active_basic', 'active_verified'] }
      }
    });

    if (existingPro) {
      await transaction.rollback();
      return res.status(409).json({
        code: existingPro.status === 'pending' ? 'ERR_PROFESSIONAL_APPLICATION_PENDING' : 'ERR_PROFESSIONAL_ALREADY_APPROVED'
      });
    }

    // 🟢 1️⃣ Crear o Actualizar Perfil Profesional (Fuente de Verdad)
    const [professional] = await Professional.upsert({
      userId: user.id,
      engagementModel,
      professionalTypeId: isCommission ? null : professionalTypeId,
      countryProfessionalTypeId: isCommission ? countryConfig.id : null,
      status: 'pending',
      phone,
      bio,
      hasVehicle,
      vehicleType,
      canTravel,
      available: true
    }, { transaction, returning: true });

    // 🟢 2️⃣ Crear registro en historial de aplicaciones
    await ProfessionalApplication.create({
      professionalId: professional.id,
      status: 'pending'
    }, { transaction });

    await transaction.commit();

    return res.status(201).json({
      code: 'SUCCESS_PROFESSIONAL_APPLICATION'
    });

  } catch (error) {
    console.error('❌ Error al crear la aplicación profesional:', error);
    if (transaction) await transaction.rollback();
    return res.status(500).json({
      code: 'ERROR_PROFESSIONAL_APPLICATION'
    });
  }
};

/**
 * getCountry
 * - Retorna países habilitados (status = true)
 */
const getCountry = async (_req: Request, res: Response) => {
  try {
    const countries: CountryResponse[] = await Country.findAll({
      where: { status: true },
      attributes: ['code', 'name']
    });

    return res.json({
      code: 'SUCCESS_GET_COUNTRIES',
      countries
    });
  } catch (error) {
    console.error('❌ Error al obtener países:', error);
    return res.status(500).json({ code: 'ERROR_GET_COUNTRIES' });
  }
};

/**
 * getProfessionalTypes
 * - Retorna tipos de profesionales habilitados (status = true)
 */
const getProfessionalTypes = async (req: Request, res: Response) => {
  try {
    const { countryCode } = req.query;

    let types;
    if (countryCode) {
      // Si hay país, filtramos por la configuración de ese país
      types = await ProfessionalType.findAll({
        // where: { status: true }, // Respetamos lo habilitado por país
        include: [
          {
            model: CountryProfessionalType,
            as: 'countryConfigs',
            where: {
              countryCode: countryCode as string,
              isEnabled: true
            },
            attributes: ['allowRegister', 'allowBusiness']
          }
        ],
        attributes: ['id', 'name', 'status']
      });
    } else {
      // Si no hay país, retornamos los que tengan status true
      types = await ProfessionalType.findAll({
        where: { status: true },
        attributes: ['id', 'name', 'status']
      });
    }

    return res.json({
      code: 'SUCCESS_GET_PROFESSIONAL_TYPES',
      professionalTypes: types
    });
  } catch (error) {
    console.error('❌ Error al obtener tipos de profesionales:', error);
    return res.status(500).json({ code: 'ERROR_GET_PROFESSIONAL_TYPES' });
  }
};

/**
 * getCountryTypeProfessional
 * - Endpoint combinado para países y tipos de profesionales
 */
const getCountryTypeProfessional = async (req: Request, res: Response) => {
  try {

    //Retorna países y tipos de profesionales habilitados
    const countries = await Country.findAll({
      where: { status: true },
      attributes: ['code', 'name'],
      include: [
        {
          model: CountryProfessionalType,
          as: 'professionalTypeConfigs',
          required: true, // 🔥 solo países con tipos habilitados
          where: {
            isEnabled: true,
            allowBusiness: true
          },
          include: [
            {
              model: ProfessionalType,
              as: 'professionalType',
              where: { status: true },
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });

    // 🔥 Transformación limpia para frontend
    const result = countries.map((country: any) => ({
      code: country.code,
      name: country.name,
      professionalTypes: country.professionalTypeConfigs.map((cpt: any) => ({
        id: cpt.professionalType.id,
        name: cpt.professionalType.name
      }))
    }));

    // 🆕 Obtener tipos profesionales con engagementModel = 'subscription'
    const professionalTypesSubscription = await ProfessionalType.findAll({
      where: {
        status: true,
        engagementModel: 'subscription'
      },
      attributes: ['id', 'name']
    });

    return res.json({
      code: 'SUCCESS_GET_COUNTRY_PROFESSIONAL',
      data: {
        countryBased: result,
        subscriptionBased: professionalTypesSubscription
      }
    });

  } catch (error) {
    console.error('❌ Error al obtener datos:', error);
    return res.status(500).json({ code: 'ERROR_GET_COUNTRY_PROFESSIONAL' });
  }
};

/**
 * getProfessionalProfileByUserId
 * — Controlador para GET /professional/profile/:id
 */
const getProfessionalProfileByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const professional = await Professional.findOne({
      where: { userId: id },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: ProfessionalType, as: 'professionalType', attributes: ['id', 'name'] }
      ]
    });
    if (!professional) {
      return res.status(404).json({ code: 'ERR_PROFESSIONAL_NOT_FOUND' });
    }
    return res.json({
      code: 'SUCCESS_GET_PROFESSIONAL_PROFILE',
      professional
    });
  } catch (error) {
    console.error('❌ Error al obtener perfil profesional:', error);
    return res.status(500).json({ code: 'ERROR_GET_PROFESSIONAL_PROFILE' });
  }
};

/**
 * updateProfessionalProfile
 * — Controlador para PUT /professional/profile/:id
 */
const updateProfessionalProfile = async (req: any, res: any) => {
  const transaction = await sequelize.transaction();
  try {
    const id = req.user.id;

    // Buscar el perfil profesional
    const professional = await Professional.findOne({ where: { userId: id } });

    if (!professional) {
      await transaction.rollback();
      return res.status(404).json({ code: 'ERR_PROFESSIONAL_NOT_FOUND' });
    }

    // Campos permitidos del modelo Professional
    const allowedFields = [
      'professionalTypeId',
      'countryProfessionalTypeId',
      'status',
      'firstName',
      'lastName',
      'phone',
      'bio',
      'address',
      'lat',
      'lng',
      'bankName',
      'accountNumber',
      'accountHolder',
      'profileImage',
      'hasVehicle',
      'vehicleType',
      'canTravel',
      'available'
    ];

    const dataToUpdate: any = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        // 🛠️ Sanitización: si es string vacío, convertir a null
        dataToUpdate[field] = req.body[field] === '' ? null : req.body[field];
      }
    });
    console.log({ dataToUpdate })

    // 1️⃣ Actualizar el modelo Professional (Fuente de Verdad)
    await professional.update(dataToUpdate, { transaction });

    // 2️⃣ 🟢 Insertar en ProfessionalApplication si NO existe el registro
    // Solo insertamos si no existe, no se actualiza este modelo si ya existe.
    await ProfessionalApplication.findOrCreate({
      where: { professionalId: professional.id },
      defaults: {
        status: 'pending'
      },
      transaction
    });

    await transaction.commit();

    return res.json({
      code: 'SUCCESS_UPDATE_PROFESSIONAL_PROFILE',
      professional
    });
  } catch (error) {
    console.error('❌ Error al actualizar perfil profesional:', error);
    if (transaction) await transaction.rollback();
    return res.status(500).json({ code: 'ERROR_UPDATE_PROFESSIONAL_PROFILE' });
  }
};

export {
  getProfessionalDashboard,
  createProfessionalApplication,
  getCountry,
  getProfessionalTypes,
  getCountryTypeProfessional,
  getProfessionalProfileByUserId,
  updateProfessionalProfile
};
