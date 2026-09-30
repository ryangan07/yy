import { createRemoteJWKSet, jwtVerify } from "jose";
import { isAdminEmail } from "@/lib/admin";

// Firebase ID tokens are signed by Google's securetoken service; verifying
// against its public JWKS avoids needing a service-account key on the server.
const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
);

export async function requireAdmin(idToken: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId || !idToken) throw new Error("Not authorised");

  const { payload } = await jwtVerify(idToken, JWKS, {
    issuer: `https://securetoken.google.com/${projectId}`,
    audience: projectId,
  });

  if (payload.email_verified !== true || !isAdminEmail(payload.email as string | undefined)) {
    throw new Error("Not authorised");
  }
  return payload;
}
