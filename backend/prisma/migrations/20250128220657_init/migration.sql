-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "original" TEXT NOT NULL,
    "shortId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortId_key" ON "Url"("shortId");
