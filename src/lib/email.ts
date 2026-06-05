import { Resend } from "resend";
import type { TalezPost } from "@/types/content";
import { absoluteUrl } from "@/lib/utils";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const from = process.env.EMAIL_FROM ?? "Talez <hello@talez.local>";

export async function sendEmail(options: { to: string | string[]; subject: string; html: string }) {
  if (!resend) {
    console.info("Email skipped because RESEND_API_KEY is not configured:", options.subject);
    return { id: "demo-email" };
  }

  return resend.emails.send({
    from,
    ...options
  });
}

export function newPostEmailTemplate(post: TalezPost, unsubscribeUrl?: string) {
  const image = absoluteUrl(post.coverImage ?? "/og-image.png");
  const url = absoluteUrl(`/posts/${post.slug}`);
  return `
    <div style="font-family:Inter,Segoe UI,sans-serif;background:#f8f4ec;color:#25211b;padding:32px">
      <div style="max-width:640px;margin:0 auto;background:#fffaf1;border:1px solid #eadfca;border-radius:18px;overflow:hidden">
        <img src="${image}" alt="${post.title}" style="width:100%;height:auto;display:block" />
        <div style="padding:28px">
          <img src="${absoluteUrl("/brand/talez-logo-256.png")}" alt="Talez" width="56" height="56" style="border-radius:14px" />
          <p style="text-transform:uppercase;letter-spacing:0.12em;color:#a26b26;font-size:12px">${post.type === "STORY" ? "New Story" : "New Blog"}</p>
          <h1 style="font-family:Georgia,serif;font-size:34px;line-height:1.1;margin:0 0 12px">${post.title}</h1>
          <p style="font-size:16px;line-height:1.7;color:#645b4c">${post.excerpt}</p>
          <a href="${url}" style="display:inline-block;background:#2a2721;color:#fff7e8;text-decoration:none;padding:12px 18px;border-radius:999px;margin-top:12px">Read on Talez</a>
          ${
            unsubscribeUrl
              ? `<p style="font-size:12px;color:#8a8174;margin-top:28px"><a href="${unsubscribeUrl}" style="color:#8a5a1f">Unsubscribe</a></p>`
              : ""
          }
        </div>
      </div>
    </div>
  `;
}

export async function sendSubscriberConfirmation(email: string, token: string) {
  const url = absoluteUrl(`/subscribe?confirm=${token}`);
  return sendEmail({
    to: email,
    subject: "Confirm your Talez subscription",
    html: `
      <p>Welcome to Talez.</p>
      <p>Please confirm your subscription by opening this link:</p>
      <p><a href="${url}">${url}</a></p>
    `
  });
}
