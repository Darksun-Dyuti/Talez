const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const posts = await prisma.post.findMany();
  console.log("DATABASE_POSTS_COUNT:" + posts.length);
  console.log("POST_SLUGS:" + JSON.stringify(posts.map(p => p.slug)));
  await prisma.$disconnect();
}
run().catch(console.error);
