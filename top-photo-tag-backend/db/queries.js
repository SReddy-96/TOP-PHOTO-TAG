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
      start_time,
    },
  });
  return data;
};

const getAllCharacters = async () => {
  const data = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return data;
};

const findCharacterById = async (character_id) => {
  const data = await prisma.character.findUnique({
    where: {
      id: character_id,
    },
  });
  return data;
};

const findUserById = async (user_id) => {
  const data = await prisma.Scores.findUnique({
    where: {
      id: user_id,
    },
  });
  return data;
};

const foundCharacter = async (userId, characterId) => {
  const data = await prisma.found_character.create({
    data: {
      userId,
      characterId,
    },
  });
  return data;
};

// give the amount of characters found
const foundCharacterAmount = async (userId) => {
  const data = await prisma.found_character.count({
    where: {
      userId,
    },
  });
  return data;
};

// add end_time and score
const addScore = async (id, end_time, score_time) => {
  const data = await prisma.Scores.update({
    where: {
      id,
    },
    data: {
      end_time,
      score_time,
    },
  });
  return data;
};

// scoreboard
const getAllScoreboard = async () => {
  const data = await prisma.Scores.findMany({
    orderBy: {
      score_time: "asc",
    },
    select: {
      id: true,
      name: true,
      score_time: true,
    },
  });
  return data;
};

module.exports = {
  createUser,
  checkUserExists,
  getAllCharacters,
  findCharacterById,
  findUserById,
  foundCharacter,
  foundCharacterAmount,
  addScore,
  getAllScoreboard,
};
