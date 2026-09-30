"use server";

import { createHash } from "crypto";
import { requireAdmin } from "@/lib/verifyAdmin";

const FOLDER = "wennie/listings";
const ALLOWED_FORMATS = "jpg,jpeg,png,webp,heic";

function cloudinaryEnv() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) throw new Error("Cloudinary is not configured");
  return { cloudName, apiKey, apiSecret };
}

function sign(params: Record<string, string | number>, apiSecret: string) {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(toSign + apiSecret).digest("hex");
}

export async function signUpload(idToken: string) {
  await requireAdmin(idToken);
  const { cloudName, apiKey, apiSecret } = cloudinaryEnv();
  const timestamp = Math.round(Date.now() / 1000);
  const params = { allowed_formats: ALLOWED_FORMATS, folder: FOLDER, timestamp };
  return { cloudName, apiKey, ...params, signature: sign(params, apiSecret) };
}

export async function deleteImages(idToken: string, publicIds: string[]) {
  await requireAdmin(idToken);
  const { cloudName, apiKey, apiSecret } = cloudinaryEnv();

  await Promise.all(
    publicIds
      .filter((id) => id.startsWith(`${FOLDER}/`))
      .map(async (public_id) => {
        const timestamp = Math.round(Date.now() / 1000);
        const body = new FormData();
        body.append("public_id", public_id);
        body.append("timestamp", String(timestamp));
        body.append("api_key", apiKey);
        body.append("signature", sign({ public_id, timestamp }, apiSecret));
        await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, { method: "POST", body });
      })
  );
}
