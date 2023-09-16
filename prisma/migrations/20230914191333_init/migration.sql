-- CreateTable
CREATE TABLE "Cat" (
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "breed" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cat_name_key" ON "Cat"("name");
