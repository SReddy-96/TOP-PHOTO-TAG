const prisma = require("./prismaClient");

async function main() {
  await prisma.Character.createMany({
    data: [
      {
        name: "Wally",
        x: 85.2,
        y: 73.9,
      },
      {
        name: "Wilma",
        x: 48.8,
        y: 41.9,
      },
      {
        name: "Odlaw",
        x: 31.5,
        y: 64.2,
      },
      {
        name: "Wizard",
        x: 7.4,
        y: 76.8,
      },
      {
        name: "Woof",
        x: 29.1,
        y: 71.6,
      },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
