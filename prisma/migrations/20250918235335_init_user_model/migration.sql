-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "spotifyId" TEXT NOT NULL,
    "spotifyRefreshToken" TEXT NOT NULL,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_spotifyId_key" ON "public"."User"("spotifyId");
