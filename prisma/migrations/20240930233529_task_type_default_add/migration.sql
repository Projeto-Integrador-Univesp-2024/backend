-- AlterTable
ALTER TABLE "TaskType" ADD COLUMN     "guardianId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "TaskType" ADD CONSTRAINT "TaskType_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
