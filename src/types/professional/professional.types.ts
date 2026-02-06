/**
 * Payload for creating a new professional application
 */
export interface ProfessionalApplicationPayload {
    professionalTypeId: number;
    displayName: string;
    phone: string;
    email: string;
    bio?: string;
    hasVehicle: boolean;
    vehicleType: 'car' | 'motorcycle' | 'none';
    canTravel: boolean;
    countryCode: string;
}

/**
 * Response structure for active countries
 */
export interface CountryResponse {
    code: string;
    name: string;
}

/**
 * Response structure for active professional types
 */
export interface ProfessionalTypeResponse {
    id: number;
    name: string;
    status: boolean;
}
