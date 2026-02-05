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
    shouldCompress?: boolean;
    processor?: (buffer: Buffer, outputPath: string) => Promise<void>;
    filename: (req: any, file: Express.Multer.File) => string;
};

export const createUploader = (config: UploadConfig) => {
    const fullDir = path.join(BASE_UPLOAD_DIR, config.folder);
    ensureDir(fullDir);

    // Si hay compresión, usar memoria; si no, disco
    const storage = config.shouldCompress
        ? multer.memoryStorage()
        : multer.diskStorage({
            destination: (_, __, cb) => cb(null, fullDir),
            filename: (req, file, cb) => {
                cb(null, config.filename(req, file));
            },
        });

    const upload = multer({
        storage,
        limits: { fileSize: config.maxSizeMB * 1024 * 1024 },
        fileFilter: (_, file, cb) => {
            if (!config.allowedMimeTypes.includes(file.mimetype)) {
                return cb(new Error("INVALID_FILE_TYPE"));
            }
            cb(null, true);
        },
    });

    // Si no hay compresión, retornar multer normal
    if (!config.shouldCompress) {
        return upload;
    }

    // Wrapper para procesar la imagen
    return {
        single: (fieldName: string) => {
            return (req: any, res: any, next: any) => {
                upload.single(fieldName)(req, res, async (err: any) => {
                    if (err) return next(err);
                    if (!req.file) return next();

                    // Solo procesar si es imagen (por si acaso se mezclan tipos)
                    if (req.file.mimetype.startsWith("image/") && config.processor) {
                        try {
                            const filename = config.filename(req, req.file);
                            const outputPath = path.join(fullDir, filename);

                            await config.processor(req.file.buffer, outputPath);

                            // 🔧 Emular req.file de diskStorage para el controlador
                            req.file.path = outputPath;
                            req.file.filename = filename;
                            req.file.destination = fullDir;
                            delete req.file.buffer; // Liberar memoria
                        } catch (processErr) {
                            return next(processErr);
                        }
                    }
                    next();
                });
            };
        },
        // Implementar array/fields si fuera necesario, por ahora single basta
        array: upload.array.bind(upload),
        fields: upload.fields.bind(upload),
        any: upload.any.bind(upload),
    } as any; // Cast as any to match Multer instance interface loosely
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
