-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "registered_at" TIMESTAMP(3) NOT NULL,
    "registered_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
