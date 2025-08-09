-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" TEXT NOT NULL,
    "postSlug" TEXT NOT NULL,
    "parentId" TEXT,
    "authorName" TEXT NOT NULL,
    "authorEmail" TEXT,
    "emailHash" TEXT,
    "contentMd" TEXT NOT NULL,
    "contentHtml" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isSpam" BOOLEAN NOT NULL DEFAULT false,
    "ipHash" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RateEvent" (
    "id" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "postSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RateEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_postSlug_idx" ON "public"."Comment"("postSlug");

-- CreateIndex
CREATE INDEX "Comment_parentId_idx" ON "public"."Comment"("parentId");

-- CreateIndex
CREATE INDEX "Comment_ipHash_idx" ON "public"."Comment"("ipHash");

-- CreateIndex
CREATE INDEX "Comment_postSlug_createdAt_idx" ON "public"."Comment"("postSlug", "createdAt");

-- CreateIndex
CREATE INDEX "RateEvent_ipHash_idx" ON "public"."RateEvent"("ipHash");

-- CreateIndex
CREATE INDEX "RateEvent_postSlug_idx" ON "public"."RateEvent"("postSlug");

-- CreateIndex
CREATE INDEX "RateEvent_createdAt_idx" ON "public"."RateEvent"("createdAt");

-- CreateIndex
CREATE INDEX "RateEvent_ipHash_postSlug_createdAt_idx" ON "public"."RateEvent"("ipHash", "postSlug", "createdAt");
