import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function main() {
  //Create users
  const bram = await prisma.user.upsert({
    where: { email: "bram@prisma.io" },
    update: {},
    create: {
      email: "bram@prisma.io",
      hash: "$argon2id$v=19$m=65536,t=3,p=4$p7suq6UdIDH1au8uOtd6fA$dhDbY447/KqOt9l6ju5V8w+EQ2RUKmHa0fDoOO87AQE",
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      hash: "$argon2id$v=19$m=65536,t=3,p=4$p7suq6UdIDH1au8uOtd6fA$dhDbY447/KqOt9l6ju5V8w+EQ2RUKmHa0fDoOO87AQE",
    },
  });
  const saif = await prisma.user.upsert({
    where: { email: "saif@prisma.io" },
    update: {},
    create: {
      email: "saif@prisma.io",
      hash: "$argon2id$v=19$m=65536,t=3,p=4$p7suq6UdIDH1au8uOtd6fA$dhDbY447/KqOt9l6ju5V8w+EQ2RUKmHa0fDoOO87AQE",
    },
  });
  const tico = await prisma.user.upsert({
    where: { email: "tico@prisma.io" },
    update: {},
    create: {
      email: "tico@prisma.io",
      hash: "$argon2id$v=19$m=65536,t=3,p=4$p7suq6UdIDH1au8uOtd6fA$dhDbY447/KqOt9l6ju5V8w+EQ2RUKmHa0fDoOO87AQE",
    },
  });

  // Create roles

  const roleReader = await prisma.role.create({
    data: {
      name: "Reader",
      description: "This person can just read the content of a datapod",
    },
  });
  const roleWriter = await prisma.role.create({
    data: {
      name: "Writer",
      description:
        "This person can create, read, update, delete content of the datapod",
    },
  });
  const roleOwner = await prisma.role.create({
    data: {
      name: "Owner",
      description:
        "This person can create, read, update, delete content of the datapod and add/remove users to" +
        " the datapod and delete the datapod itself, this person is also the owner of the datapod",
    },
  });
  const roleManager = await prisma.role.create({
    data: {
      name: "Manager",
      description:
        "This person can create, read, update, delete content of the datapod and add/remove users to the datapod and delete the datapod itself",
    },
  });
}
