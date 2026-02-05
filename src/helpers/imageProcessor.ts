import sharp from "sharp";
import fs from "fs";
import path from "path";

/**
 * Optimiza y redimensiona específicamente para fotos de perfil (cuadradas, 512x512)
 */
export const processProfileImage = async (
    buffer: Buffer,
    outputPath: string
) => {
    await sharp(buffer)
        .resize(512, 512, {
            fit: "cover",
            withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toFile(outputPath);
};

/**
 * Optimización genérica para propiedades u otras imágenes (Max 1920px width, mantiene aspecto)
 */
export const optimizeImage = async (
    buffer: Buffer,
    outputPath: string
) => {
    await sharp(buffer)
        .resize(1920, 1080, {
            fit: "inside", // Mantiene aspect ratio, no corta
            withoutEnlargement: true, // No explota imágenes pequeñas
        })
        .webp({ quality: 80 })
        .toFile(outputPath);
};
