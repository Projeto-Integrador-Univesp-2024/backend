-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskTypeId_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "taskTypeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TaskType" ALTER COLUMN "color" SET DEFAULT 'bg-stone-300';

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskTypeId_fkey" FOREIGN KEY ("taskTypeId") REFERENCES "TaskType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
