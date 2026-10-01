# Winnie Wong — Website Handover

Website: **https://winnieproperties.com**
Admin: **https://winnieproperties.com/admin**

---

## 1. Signing in

1. Open https://winnieproperties.com/admin
2. Click **Sign in with Google** and choose **cari.myproperty@gmail.com**.
3. Only this account (and your developer's) can enter. Any other Google account is refused.

To sign out, click **Sign out** at the top right. On a shared computer, always sign out.

## 2. Enquiries

- When someone sends the enquiry form, you get an **email at cari.myproperty@gmail.com** with their
  details and a **Reply on WhatsApp** button.
- Every enquiry is also saved in **Admin → Enquiries**:
  - **WhatsApp** opens a chat with that person.
  - **Mark replied** keeps track of who you have answered.
  - **Delete** removes it permanently.
- Under the privacy law (PDPA), if a person asks you to delete or correct their details, do it here.

## 3. Listings

**Admin → Listings → + New listing**

| Field | Notes |
|---|---|
| Photos | **Upload photos** (several at once, max 15 MB each). The first photo is the cover. Hover a photo to: move it left/right, ★ make it the cover, ✂ **crop** it, ✕ remove it. |
| Watermark | Added **automatically** to every photo on the website — nothing to do. Your original photos stay clean. |
| Crop | Choose a shape (Original, 4:3, 16:10, 1:1, 3:4), drag and zoom, then **Apply crop**. You can re-crop or **Reset to original** at any time. |
| Drop-down lists | If an option is missing, choose **+ Add custom…** — it is remembered for next time. |
| Price | Leave empty to show "Price on request". For rentals enter the monthly rent. |
| **Published** | Ticked = visible on the website. Unticked = a private draft. |
| **Featured** | Ticked = shown on the **homepage** (up to 6). If nothing is featured, the newest 6 show. |

Click **Save listing** — changes are live immediately. Photos you removed are deleted when you save.

## 4. Homepage photo

**Admin → Homepage → Upload new photo**

- Use a wide (landscape) photo, at least 2000 pixels across.
- The website shows it in black & white with the water-ripple effect; the preview shows how it will look.
- **Restore original photo** brings back the original one.

## 5. Please do not touch

These keep the site running and secure. Changing them can take the site offline:

- Netlify environment variables, Firebase security rules, DNS records
- The Cloudinary folder `wennie/site` (it holds the watermark)
- Anything you were not shown in this guide — ask first

## 6. Accounts and renewals

| Service | What it does | Cost |
|---|---|---|
| Domain `winnieproperties.com` | The web address | Renews yearly — **must be renewed or the site goes offline** |
| Netlify | Hosting | Free plan |
| Google Firebase | Enquiries, listings, sign-in | Free plan |
| Cloudinary | Photos | Free plan |
| Resend | Enquiry emails | Free plan (3,000 emails/month) |

## 7. Things to check with your agency

- Confirm with The Roof Realty whether your personal website needs the firm's approval.
- Ask whether the firm has a standard PDPA notice; if so, the Privacy Notice page can be aligned with it.

## 8. Help

Changes beyond this guide (new sections, testimonials, wording, design) — contact your developer.
