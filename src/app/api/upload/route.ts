import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { Readable } from "stream";

// ✅ Cloudinary Configuration (Reads from .env)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: Request) {
  try {
    // ✅ Read file from FormData
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // ✅ Convert file Blob to Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // ✅ Upload to Cloudinary
    const uploadResult = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: "avatars", resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!);
        }
      );

      Readable.from(fileBuffer).pipe(uploadStream); // ✅ Use Readable Stream for Cloudinary
    });

    return NextResponse.json({ url: uploadResult.secure_url }); // ✅ Return URL to Frontend
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // ✅ Next.js automatically handles file uploads
  },
};
