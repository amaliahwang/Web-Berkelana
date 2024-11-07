-- CreateTable
CREATE TABLE "CategoryBlog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT,

    CONSTRAINT "CategoryBlog_pkey" PRIMARY KEY ("id")
);
