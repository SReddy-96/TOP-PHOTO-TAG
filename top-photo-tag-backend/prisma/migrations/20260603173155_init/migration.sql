-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scores" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "score_time" INTEGER NOT NULL,

    CONSTRAINT "Scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Found_character" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "Found_character_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Found_character" ADD CONSTRAINT "Found_character_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Found_character" ADD CONSTRAINT "Found_character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Scores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
