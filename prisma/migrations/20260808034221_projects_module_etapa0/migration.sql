-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('leader', 'member');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "content_markdown" TEXT,
ADD COLUMN     "content_markdown_path" TEXT,
ADD COLUMN     "current_phase" TEXT,
ADD COLUMN     "current_phase_updated_at" TIMESTAMP(3),
ADD COLUMN     "funding_notes" TEXT,
ADD COLUMN     "funding_source" TEXT,
ADD COLUMN     "has_funding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_funding_updated_at" TIMESTAMP(3),
ADD COLUMN     "project_type" TEXT,
ADD COLUMN     "project_type_updated_at" TIMESTAMP(3),
ADD COLUMN     "stage_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user_projects" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "project_role",
ADD COLUMN     "project_role" "ProjectRole" NOT NULL DEFAULT 'member';

-- CreateTable
CREATE TABLE "project_articles" (
    "id" BIGSERIAL NOT NULL,
    "project_id" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT,
    "publication" TEXT,
    "url" TEXT,
    "published_at" DATE,
    "created_by" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_congresses" (
    "id" BIGSERIAL NOT NULL,
    "project_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "location" TEXT,
    "url" TEXT,
    "held_at" DATE,
    "created_by" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_congresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_resources" (
    "id" BIGSERIAL NOT NULL,
    "project_id" BIGINT NOT NULL,
    "kind" TEXT NOT NULL,
    "title" TEXT,
    "storage_path" TEXT,
    "external_url" TEXT,
    "mime_type" TEXT,
    "size_bytes" INTEGER,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "uploaded_by" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_traceability_comments" (
    "id" BIGSERIAL NOT NULL,
    "project_id" BIGINT NOT NULL,
    "author_id" BIGINT,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_traceability_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_projects_project_user_unique" ON "user_projects"("project_id", "user_id");

-- AddForeignKey
ALTER TABLE "project_articles" ADD CONSTRAINT "project_articles_fk_projects" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_articles" ADD CONSTRAINT "project_articles_fk_users" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_congresses" ADD CONSTRAINT "project_congresses_fk_projects" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_congresses" ADD CONSTRAINT "project_congresses_fk_users" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_resources" ADD CONSTRAINT "project_resources_fk_projects" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_resources" ADD CONSTRAINT "project_resources_fk_users" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_traceability_comments" ADD CONSTRAINT "project_traceability_comments_fk_projects" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_traceability_comments" ADD CONSTRAINT "project_traceability_comments_fk_users" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
