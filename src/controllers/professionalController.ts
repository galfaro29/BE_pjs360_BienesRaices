// **MODELO DE USUARIO**  
import { Request, Response } from 'express';
import { User, ProfessionalApplication, ProfessionalType, Country } from '../models/index.js';
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

    // 📧 Verifica si ya existe una solicitud con ese correo
    const existing = await ProfessionalApplication.findOne({
      where: { email },
    });

    if (existing) {
      return res.status(409).json({
        code: 'ERR_PROFESSIONAL_APPLICATION_EXISTS'
      });
    }

    // 📝 Crea la solicitud profesional
    await ProfessionalApplication.create({
      professionalTypeId,
      displayName,
      phone,
      email,
      bio,
      hasVehicle,
      vehicleType,
      canTravel,
      countryCode,
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
const getProfessionalTypes = async (_req: Request, res: Response) => {
  try {
    const types: ProfessionalTypeResponse[] = await ProfessionalType.findAll({
      where: { status: true },
      attributes: ['id', 'name', 'status']
    });

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
const getCountryTypeProfessional = async (_req: Request, res: Response) => {
  try {
    const [countries, professionalTypes] = await Promise.all([
      Country.findAll({
        where: { status: true },
        attributes: ['code', 'name']
      }),
      ProfessionalType.findAll({
        where: { status: true },
        attributes: ['id', 'name', 'status']
      })
    ]);

    return res.json({
      code: 'SUCCESS_GET_CONFIG_DATA',
      countries,
      professionalTypes
    });
  } catch (error) {
    console.error('❌ Error al obtener datos de configuración:', error);
    return res.status(500).json({ code: 'ERROR_GET_CONFIG_DATA' });
  }
};

export {
  getProfessionalDashboard,
  createProfessionalApplication,
  getCountry,
  getProfessionalTypes,
  getCountryTypeProfessional
};
