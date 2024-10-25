/*
  Warnings:

  - You are about to drop the `CashFlow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CashFlow" DROP CONSTRAINT "CashFlow_userId_fkey";

-- DropTable
DROP TABLE "CashFlow";

-- CreateTable
CREATE TABLE "Profit" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "expenses" DOUBLE PRECISION NOT NULL,
    "net_profit" DOUBLE PRECISION NOT NULL,
    "profit_margin" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Profit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profit" ADD CONSTRAINT "Profit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
