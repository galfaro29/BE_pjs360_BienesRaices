import multer from "multer";
import path from "path";
import fs from "fs";

/* =========================
   📁 BASE DIRECTORY
========================= */

const envUploadPath = process.env.UPLOADS_FOLDER_PATH || "public/uploads";
// Remove leading slash if present to avoid absolute path interpretation
const relativeUploadPath = envUploadPath.startsWith("/")
    ? envUploadPath.slice(1)
    : envUploadPath;

const BASE_UPLOAD_DIR = path.join(process.cwd(), relativeUploadPath);

/* =========================
   🛠 HELPERS
========================= */

const ensureDir = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

/* =========================
   🏭 UPLOAD FACTORY
========================= */

type UploadConfig = {
    folder: string;
    maxSizeMB: number;
    allowedMimeTypes: string[];
    filename: (req: any, file: Express.Multer.File) => string;
};

export const createUploader = (config: UploadConfig) => {
    const fullDir = path.join(BASE_UPLOAD_DIR, config.folder);
    ensureDir(fullDir);

    const storage = multer.diskStorage({
        destination: (_, __, cb) => cb(null, fullDir),
        filename: (req, file, cb) => {
            cb(null, config.filename(req, file));
        },
    });

    return multer({
        storage,
        limits: { fileSize: config.maxSizeMB * 1024 * 1024 },
        fileFilter: (_, file, cb) => {
            if (!config.allowedMimeTypes.includes(file.mimetype)) {
                return cb(new Error("INVALID_FILE_TYPE"));
            }
            cb(null, true);
        },
    });
};

/* =========================
   🗑 DELETE HELPERS
========================= */

export const deleteFileIfExists = (fullPath: string) => {
    if (fs.existsSync(fullPath)) {
        try {
            fs.unlinkSync(fullPath);
            console.log(`🗑️ Deleted file: ${fullPath}`);
        } catch (error) {
            console.error(`❌ Error deleting file ${fullPath}:`, error);
        }
    }
};
