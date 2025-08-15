//import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import fs from "fs";
import { promisify } from "util";

// Ensure upload folder exists
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, uploadDir);
    },
    filename: function (_req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Convert multer to promise
const runMiddleware = promisify(upload.single("file"));

// export const post = async (req: NextRequest) => {
//     try {
//         // @ts-ignore - Node-style req/res handling
//         await runMiddleware(req, {});

//         // @ts-ignore - multer attaches file
//         const file = req.file;

//         return NextResponse.json({
//             message: "File uploaded successfully",
//             file,
//         });
//     } catch (err) {
//         console.error(err);
//         return NextResponse.json({ error: "File upload failed" }, { status: 500 });
//     }
// };

// export const config = {
//     api: {
//         bodyParser: false, // Important for file uploads
//     },
// };
