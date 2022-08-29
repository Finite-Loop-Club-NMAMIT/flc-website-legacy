/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `RegistrationPayment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RegistrationPayment_orderId_key" ON "RegistrationPayment"("orderId");
