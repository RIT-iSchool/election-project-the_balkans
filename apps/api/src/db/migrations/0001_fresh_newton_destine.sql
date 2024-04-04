ALTER TABLE "electionCandidate" ADD COLUMN "society_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "electionInitiative" ADD COLUMN "society_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "electionOffice" ADD COLUMN "society_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "initiativeOption" ADD COLUMN "society_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "electionCandidate" ADD CONSTRAINT "electionCandidate_society_id_society_id_fk" FOREIGN KEY ("society_id") REFERENCES "society"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "electionInitiative" ADD CONSTRAINT "electionInitiative_society_id_society_id_fk" FOREIGN KEY ("society_id") REFERENCES "society"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "electionOffice" ADD CONSTRAINT "electionOffice_society_id_society_id_fk" FOREIGN KEY ("society_id") REFERENCES "society"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "initiativeOption" ADD CONSTRAINT "initiativeOption_society_id_society_id_fk" FOREIGN KEY ("society_id") REFERENCES "society"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
