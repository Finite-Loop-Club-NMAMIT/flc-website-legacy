-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "links" JSONB;

-- CreateTable
CREATE TABLE "Members" (
    "email" TEXT NOT NULL,
    "name" TEXT,
    "batch" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_email_key" ON "Members"("email");
