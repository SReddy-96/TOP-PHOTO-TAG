/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Scores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Scores_name_key" ON "Scores"("name");
