import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
 import { icons , subIconsData  } from "./data";


async function main() {
 async function main() {
  console.log("Seeding main icons...");

  // Insert main icons
  await Promise.all(
    icons.map(async (icon) => {
      return prisma.icon.upsert({
        where: { title: icon.title },
        update: {},
        create: {
          title: icon.title,
          expression: icon.expression,
          iconName: icon.iconName,
          category: icon.category,
        },
      });
    })
  );
   console.log("Main icons created.");

  // Fetch all main icons at once
  const mainIcons = await prisma.icon.findMany();

  console.log("Seeding sub icons...");

  // Insert sub icons
  await Promise.all(
    mainIcons.map(async (mainIcon) => {
      const subIcons = subIconsData[mainIcon.title];
      if (!subIcons) return;

      await Promise.all(
        subIcons.map(async (s) => {
          try {
            await prisma.subIcon.upsert({
              where: { title_iconId: { title: s.title, iconId: mainIcon.id } },
              update: {},
              create: {
                title: s.title,
                imageUrl: s.img,
                expression: `${mainIcon.expression} - ${s.title}`,
                icon: { connect: { id: mainIcon.id } },
              },
            });
            console.log(`Created subIcon: ${s.title} for mainIcon: ${mainIcon.title}`);
          } catch (e) {
            console.error(`Error creating subIcon ${s.title}:`, e.message);
          }
        })
      );
    })
  );

  console.log("All sub icons created.");
}
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });