// Keep in sync with isAdmin() in firestore.rules — the rules are the real
// enforcement; this list only decides what the admin UI shows.
export const ADMIN_EMAILS = ["ganhongkit@gmail.com", "winniewong.trr@yahoo.com"];

export function isAdminEmail(email: string | null | undefined) {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}
