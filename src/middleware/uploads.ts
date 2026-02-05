import path from "path";
import { createUploader, deleteFileIfExists } from "./uploadFactory.js";

/* =========================
   🖼 PROFILE IMAGE
========================= */

export const uploadProfileImage = createUploader({
  folder: "profiles",
  maxSizeMB: 0.5, // 512 KB
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  filename: (req: any, file: Express.Multer.File) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const customId = req.user?.customId || "unknown";
    return `profile-${customId}${ext}`;
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
  filename: (req, file) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const customId = req.user?.customId || "unknown";
    return `property-${customId}-${Date.now()}${ext}`;
  },
});

/* =========================
   🗑 SPECIFIC HELPERS
========================= */

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
