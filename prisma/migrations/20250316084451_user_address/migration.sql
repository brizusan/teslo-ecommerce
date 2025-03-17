-- CreateTable
CREATE TABLE "UserAdress" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address2" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserAdress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAdress_userId_key" ON "UserAdress"("userId");

-- AddForeignKey
ALTER TABLE "UserAdress" ADD CONSTRAINT "UserAdress_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAdress" ADD CONSTRAINT "UserAdress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
