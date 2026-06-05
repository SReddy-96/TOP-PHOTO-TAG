const prisma = require("./prismaClient");

const checkUserExists = async (name) => {
  const data = await prisma.Scores.findUnique({
    where: {
      name,
    },
  });
  return data;
};

const createUser = async (name, start_time) => {
  const data = await prisma.Scores.create({
    data: {
      name,
      start_time
    },
  });
  return data;
};

module.exports={
  createUser,
  checkUserExists
}