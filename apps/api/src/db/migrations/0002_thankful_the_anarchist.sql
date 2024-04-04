ALTER TABLE "society" RENAME COLUMN "user_id" TO "owner_id";--> statement-breakpoint
ALTER TABLE "society" DROP CONSTRAINT "society_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "society" ADD CONSTRAINT "society_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
