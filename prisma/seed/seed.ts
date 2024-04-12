import prisma from "../../src/lib/db";

async function seedDepartment() {
  await prisma.department.createMany({
    data: [
      {
        name: "fincom",
        description: "description for fincom",
      },
      {
        name: "operations",
        description: "description for operations",
      },
    ],
  });
}

seedDepartment()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
