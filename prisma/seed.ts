import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@talez.local";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "change-this-password";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: "ADMIN",
      passwordHash
    },
    create: {
      email: adminEmail,
      name: process.env.ADMIN_NAME ?? "Talez Admin",
      username: "talez-admin",
      role: "ADMIN",
      passwordHash,
      emailVerified: new Date()
    }
  });

  await prisma.admin.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id, title: "Founding Editor" }
  });

  const categoryCount = await prisma.category.count();
  if (categoryCount === 0) {
    await prisma.category.createMany({
      data: [
        { name: "Short Fiction", slug: "short-fiction", type: "STORY" },
        { name: "Writing Notes", slug: "writing-notes", type: "BLOG" },
        { name: "Technology", slug: "technology", type: "BLOG" }
      ]
    });
  }

  const planCount = await prisma.membershipPlan.count();
  if (planCount === 0) {
    await prisma.membershipPlan.createMany({
      data: [
        {
          name: "Supporter",
          slug: "supporter",
          description: "Premium stories, exclusive blogs, and early releases.",
          priceCents: 500,
          currency: "USD",
          interval: "MONTHLY",
          features: ["Premium content", "Early releases", "Supporter badge"]
        },
        {
          name: "Patron",
          slug: "patron",
          description: "Everything in Supporter plus behind-the-scenes writing notes.",
          priceCents: 5000,
          currency: "USD",
          interval: "YEARLY",
          features: ["Premium content", "Writing roadmap", "Behind-the-scenes notes"]
        }
      ]
    });
  }

  const achievementCount = await prisma.achievement.count();
  if (achievementCount === 0) {
    await prisma.achievement.createMany({
      data: [
        { key: "first-story", title: "Read First Story", description: "Finished your first Talez story.", icon: "book-open" },
        { key: "ten-stories", title: "Read 10 Stories", description: "A steady reader with ten stories completed.", icon: "sparkles" },
        { key: "early-supporter", title: "Early Supporter", description: "Joined the community in its earliest chapter.", icon: "badge" }
      ]
    });
  }

  console.log(`Seeded Talez. Admin email: ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
