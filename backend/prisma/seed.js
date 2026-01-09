/*import { PrismaClient } from "@prisma/client";
import { icons, subIconsData } from "./data.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding main icons...");

  // Insert main icons with upsert
  await Promise.all(
    icons.map(async (icon) => {
      try {
        // Validation: must have either iconName or imgUrl
        if ((!icon.iconName && !icon.imgUrl) || (icon.iconName && icon.imgUrl)) {
          throw new Error(
            `Icon "${icon.title_en}" must have either iconName or imgUrl, not both or neither.`
          );
        }

        await prisma.icon.upsert({
          where: { title_en: icon.title_en },
          update: {},
          create: {
            title_en: icon.title_en,
            title_ar: icon.title_ar || "",
            title_fr: icon.title_fr || "",
            title_es: icon.title_es || "",
            expression_en: icon.expression_en || "",
            expression_ar: icon.expression_ar || "",
            expression_fr: icon.expression_fr || "",
            expression_es: icon.expression_es || "",
            iconName: icon.iconName || null,
            imgUrl: icon.imgUrl || null,
            category: icon.category || "",
          },
        });

        console.log(`Main icon created/upserted: ${icon.title_en}`);
      } catch (err) {
        console.error(`Error creating main icon ${icon.title_en}:`, err.message);
      }
    })
  );

  console.log("Main icons created.");

  // Fetch all main icons to link sub-icons
  const mainIcons = await prisma.icon.findMany();

  console.log("Seeding sub icons...");

  await Promise.all(
    mainIcons.map(async (mainIcon) => {
      const subIcons = subIconsData[mainIcon.title_en];
      if (!subIcons) return;

      await Promise.all(
        subIcons.map(async (s) => {
          try {
            await prisma.subIcon.upsert({
              where: { title_en_iconId: { title_en: s.title_en, iconId: mainIcon.id } },
              update: {},
              create: {
                title_en: s.title_en,
                title_ar: s.title_ar || "",
                title_fr: s.title_fr || "",
                title_es: s.title_es || "",
                imageUrl: s.img || "",
                expression_en: `${mainIcon.expression_en} - ${s.title_en}`,
                expression_ar: `${mainIcon.expression_ar} - ${s.title_ar}`,
                expression_fr: `${mainIcon.expression_fr} - ${s.title_fr}`,
                expression_es: `${mainIcon.expression_es} - ${s.title_es}`,
                icon: { connect: { id: mainIcon.id } },
              },
            });

            console.log(
              `Sub icon created/upserted: ${s.title_en} for main icon: ${mainIcon.title_en}`
            );
          } catch (err) {
            console.error(`Error creating sub icon ${s.title_en}:`, err.message);
          }
        })
      );
    })
  );

  console.log("All sub icons created.");
}

main()
  .catch((err) => console.error("Seed script failed:", err))
  .finally(async () => {
    await prisma.$disconnect();
  });*/
  import { PrismaClient } from "@prisma/client";
import { icons, subIconsData } from "./data.js";

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

async function main() {
  console.log("🌱 Seeding main icons...");

  // ===== MAIN ICONS =====
  for (const icon of icons) {
    try {
      // validation
      if ((!icon.iconName && !icon.imgUrl) || (icon.iconName && icon.imgUrl)) {
        throw new Error(
          `Icon "${icon.title_en}" must have either iconName OR imgUrl`
        );
      }

      await prisma.icon.upsert({
        where: { title_en: icon.title_en },
        update: {},
        create: {
          title_en: icon.title_en,
          title_ar: icon.title_ar || "",
          title_fr: icon.title_fr || "",
          title_es: icon.title_es || "",
          expression_en: icon.expression_en || "",
          expression_ar: icon.expression_ar || "",
          expression_fr: icon.expression_fr || "",
          expression_es: icon.expression_es || "",
          iconName: icon.iconName || null,
          imgUrl: icon.imgUrl || null,
          category: icon.category || "",
        },
      });

      console.log(`✅ Main icon: ${icon.title_en}`);
    } catch (err) {
      console.error(`❌ Main icon error (${icon.title_en}):`, err.message);
    }
  }

  console.log("✅ Main icons done");

  // ===== FETCH MAIN ICONS =====
  const mainIcons = await prisma.icon.findMany();

  console.log("🌱 Seeding sub icons...");

  // ===== SUB ICONS =====
  for (const mainIcon of mainIcons) {
    const subIcons = subIconsData[mainIcon.title_en];
    if (!subIcons) continue;

    for (const s of subIcons) {
      try {
        await prisma.subIcon.upsert({
          where: {
            title_en_iconId: {
              title_en: s.title_en,
              iconId: mainIcon.id,
            },
          },
          update: {},
          create: {
            title_en: s.title_en,
            title_ar: s.title_ar || "",
            title_fr: s.title_fr || "",
            title_es: s.title_es || "",
            imageUrl: s.img || "",
            expression_en: `${mainIcon.expression_en} - ${s.title_en}`,
            expression_ar: `${mainIcon.expression_ar} - ${s.title_ar}`,
            expression_fr: `${mainIcon.expression_fr} - ${s.title_fr}`,
            expression_es: `${mainIcon.expression_es} - ${s.title_es}`,
            icon: {
              connect: { id: mainIcon.id },
            },
          },
        });

        console.log(
          `✅ Sub icon: ${s.title_en} → ${mainIcon.title_en}`
        );
      } catch (err) {
        console.error(
          `❌ Sub icon error (${s.title_en}):`,
          err.message
        );
      }
    }
  }

  console.log("🎉 All seeding completed successfully");
}

main()
  .catch((err) => {
    console.error("🔥 Seed failed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

