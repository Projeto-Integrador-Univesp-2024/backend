-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_usertypeId_fkey";

-- CreateTable
CREATE TABLE "child" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "child_pkey" PRIMARY KEY ("id")
);
