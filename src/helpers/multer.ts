import multer from "multer";
import path from "path";
import fs from "fs";

// 📁 Crear carpeta para imágenes si no existe
const uploadDir = path.join("public", "uploads", "profile");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 📦 Configurar almacenamiento de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req: any, file, cb) {
        const ext = path.extname(file.originalname);
        // Se usa el customId del usuario autenticado
        const customId = req.user?.customId || `unknown-${Date.now()}`;
        const uniqueName = `profile-${customId}${ext}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

export const deleteOldProfileImage = (filename: string) => {
    const oldImagePath = path.join(uploadDir, filename);
    if (fs.existsSync(oldImagePath)) {
        try {
            fs.unlinkSync(oldImagePath);
            console.log(`🗑️ Deleted old profile image: ${filename}`);
        } catch (error) {
            console.error(`❌ Error deleting old profile image ${filename}:`, error);
        }
    }
};

export default upload;
