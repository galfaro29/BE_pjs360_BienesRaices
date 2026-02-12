// **MODELO DE USUARIO**  
import { Request, Response } from 'express';
import { User, ProfessionalApplication, ProfessionalType, Country, CountryProfessionalType } from '../models/index.js';
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
      countryCode
    }: ProfessionalApplicationPayload = req.body;

    // 🧩 Validaciones básicas
    if (!professionalTypeId || !displayName || !phone || !email || !countryCode) {
      return res.status(400).json({
        code: 'ERR_PROFESSIONAL_APPLICATION_VALIDATION',
        message: 'Missing required fields'
      });
    }

    // 🌍 Validar configuración por país (CountryProfessionalType)
    const countryConfig = await CountryProfessionalType.findOne({
      where: {
        countryCode,
        professionalTypeId,
        isEnabled: true,
        allowRegister: true
      },
      include: [
        {
          model: ProfessionalType,
          as: 'professionalType',
          where: { status: true }
        },
        {
          model: Country,
          as: 'country',
          where: {
            status: true,
            allowRegister: true
          }
        }
      ]
    });

    if (!countryConfig) {
      return res.status(403).json({
        code: 'ERR_PROFESSIONAL_TYPE_NOT_ALLOWED',
        message: 'This professional type is not enabled or the country is not active.'
      });
    }

    // 🔍 Validación de solicitudes previas (Email + Configuración de País/Profesión)
    const previousApplications = await ProfessionalApplication.findAll({
      where: {
        email,
        countryProfessionalTypeId: countryConfig.id
      }
    });

    // 1️⃣ Bloquear si ya hay una solicitud activa (pendiente o aprobada)
    const activeApp = previousApplications.find((app: any) => ['pending', 'approved'].includes(app.status));
    if (activeApp) {
      return res.status(409).json({
        code: activeApp.status === 'pending' ? 'ERR_PROFESSIONAL_APPLICATION_PENDING' : 'ERR_PROFESSIONAL_ALREADY_APPROVED',
        message: activeApp.status === 'pending'
          ? 'You already have a pending application for this category.'
          : 'You are already an approved professional in this category.'
      });
    }

    // 2️⃣ Anti-Spam: Bloquear si ha sido rechazado 3 veces o más
    const rejectedCount = previousApplications.filter((app: any) => app.status === 'rejected').length;
    if (rejectedCount >= 3) {
      return res.status(429).json({
        code: 'ERR_PROFESSIONAL_APPLICATION_SPAM_LIMIT',
        message: 'Maximum number of attempts reached for this category. Please contact support.'
      });
    }

    // 📝 Crea la solicitud profesional
    await ProfessionalApplication.create({
      countryProfessionalTypeId: countryConfig.id,
      displayName,
      phone,
      email,
      bio,
      hasVehicle,
      vehicleType,
      canTravel,
      status: 'pending'
    });

    return res.status(201).json({
      code: 'SUCCESS_PROFESSIONAL_APPLICATION'
    });
  } catch (error) {
    console.error('❌ Error al crear la aplicación profesional:', error);
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

    return res.json({
      code: 'SUCCESS_GET_COUNTRY_PROFESSIONAL',
      data: result
    });

  } catch (error) {
    console.error('❌ Error al obtener datos:', error);
    return res.status(500).json({ code: 'ERROR_GET_COUNTRY_PROFESSIONAL' });
  }
};

export {
  getProfessionalDashboard,
  createProfessionalApplication,
  getCountry,
  getProfessionalTypes,
  getCountryTypeProfessional
};
