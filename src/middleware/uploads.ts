import path from "path";
import { createUploader, deleteFileIfExists } from "./uploadFactory.js";
import { processProfileImage, optimizeImage } from "../helpers/imageProcessor.js";

/* =========================
   🖼 PROFILE IMAGE
========================= */

export const uploadProfileImage = createUploader({
    folder: "profiles",
    maxSizeMB: 0.5, // 512 KB
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    shouldCompress: true,
    processor: processProfileImage,
    filename: (req: any, _file: Express.Multer.File) => {
        const customId = req.user?.customId || "unknown";
        return `profile-${customId}.webp`; // 🔥 Forzamos .webp ya que el procesador lo convierte
    },
});

/* =========================
   📄 DOCUMENTS
========================= */

export const uploadDocument = createUploader({
    folder: "documents",
    maxSizeMB: 5, // 5 MB
    allowedMimeTypes: ["application/pdf", "image/jpeg", "image/png"],
    filename: (req, file) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const customId = req.user?.customId || "unknown";
        return `doc-${customId}-${Date.now()}${ext}`;
    },
});

/* =========================
   🏠 PROPERTY IMAGES
========================= */

export const uploadPropertyImage = createUploader({
    folder: "properties",
    maxSizeMB: 3, // 3 MB
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    shouldCompress: true,
    processor: optimizeImage,
    filename: (req, _file) => {
        const customId = req.user?.customId || "unknown";
        return `property-${customId}-${Date.now()}.webp`; // 🔥 Forzamos .webp
    },
});

export const deleteOldProfileImage = (filename: string) => {
    const fullPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        "profiles",
        filename
    );
    deleteFileIfExists(fullPath);
};
