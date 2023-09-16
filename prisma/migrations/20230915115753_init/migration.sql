-- DropIndex
DROP INDEX "Cat_name_key";

-- AlterTable
ALTER TABLE "Cat" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Cat_pkey" PRIMARY KEY ("id");
