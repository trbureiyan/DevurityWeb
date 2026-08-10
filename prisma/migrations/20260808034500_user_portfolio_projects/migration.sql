-- CreateTable
CREATE TABLE "user_portfolio_projects" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_portfolio_projects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_portfolio_projects" ADD CONSTRAINT "user_portfolio_projects_fk_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
