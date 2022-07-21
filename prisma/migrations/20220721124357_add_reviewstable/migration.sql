-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "reviewText" VARCHAR(255) NOT NULL,
    "overallRating" DOUBLE PRECISION NOT NULL,
    "safetyRating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
