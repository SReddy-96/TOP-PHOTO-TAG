const prisma = require("./prismaClient");

const checkUserExists = async (name) => {
  const data = await prisma.Scores.findUnique({
    where: {
      name,
    },
  });
  return data;
};