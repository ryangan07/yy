import { auth } from "@/lib/firebase";
import { deleteImages, signUpload } from "@/app/admin/actions";
import type { Photo } from "@/lib/image";

const MAX_BYTES = 15 * 1024 * 1024;

async function idToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not signed in");
  return user.getIdToken();
}

export async function uploadImage(file: File): Promise<Photo> {
  if (file.size > MAX_BYTES) throw new Error(`${file.name} is larger than 15 MB`);
  const s = await signUpload(await idToken());

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", s.apiKey);
  body.append("timestamp", String(s.timestamp));
  body.append("folder", s.folder);
  body.append("allowed_formats", s.allowed_formats);
  body.append("signature", s.signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${s.cloudName}/image/upload`, { method: "POST", body });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || `Upload failed for ${file.name}`);
  return { url: json.secure_url, publicId: json.public_id };
}

export async function removeImages(publicIds: string[]) {
  if (publicIds.length === 0) return;
  await deleteImages(await idToken(), publicIds);
}
