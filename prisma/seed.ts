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
      hash: "Wachtwoord1",
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      hash: "ExamplePassword1",
    },
  });
  const saif = await prisma.user.upsert({
    where: { email: "saif@prisma.io" },
    update: {},
    create: {
      email: "saif@prisma.io",
      hash: "ExamplePassword1",
    },
  });
  const tico = await prisma.user.upsert({
    where: { email: "tico@prisma.io" },
    update: {},
    create: {
      email: "tico@prisma.io",
      hash: "ExamplePassword1",
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

  // // create datapods
  // if (bram) {
  //   const datapod = await prisma.datapod.create({
  //     data: {
  //       title: "Spotify",
  //       description: "My private songs",
  //     },
  //   });
  // }
  // if (saif) {
  //   const datapod = await prisma.datapod.create({
  //     data: {
  //       title: "Youtube",
  //       description: "My most watched videos",
  //     },
  //   });
  // }
  // if (bob) {
  //   const datapod = await prisma.datapod.create({
  //     data: {
  //       title: "Passwords",
  //       description: "My password vault",
  //     },
  //   });
  // }
  // if (tico) {
  //   const datapod = await prisma.datapod.create({
  //     data: {
  //       title: "Gymtrackings",
  //       description: "I like to keep notes of my progress",
  //     },
  //   });
  // }
}
