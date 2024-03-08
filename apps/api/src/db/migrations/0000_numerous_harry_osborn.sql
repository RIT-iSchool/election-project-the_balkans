DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('member', 'officer', 'employee');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "candidateVote" (
	"id" serial NOT NULL,
	"member_id" integer NOT NULL,
	"election_candidate_id" integer NOT NULL,
	CONSTRAINT "candidateVote_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "election" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"society_id" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"photo_url" varchar(250),
	CONSTRAINT "election_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "electionCandidate" (
	"id" serial NOT NULL,
	"election_office_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"photo_url" varchar(250),
	"description" text NOT NULL,
	CONSTRAINT "electionCandidate_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "electionInitiative" (
	"id" serial NOT NULL,
	"election_id" integer NOT NULL,
	"initiative_name" varchar(30) NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "electionInitiative_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "electionOffice" (
	"id" serial NOT NULL,
	"election_id" integer NOT NULL,
	"office_name" varchar(30) NOT NULL,
	"max_votes" integer NOT NULL,
	CONSTRAINT "electionOffice_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "initiativeOption" (
	"id" serial NOT NULL,
	"election_initiative_id" integer NOT NULL,
	"title" varchar(30) NOT NULL,
	CONSTRAINT "initiativeOption_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "initiativeVote" (
	"id" serial NOT NULL,
	"member_id" integer NOT NULL,
	"election_initiative_id" integer NOT NULL,
	"election_initiative_option_id" integer NOT NULL,
	CONSTRAINT "initiativeVote_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" varchar(250) NOT NULL,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "session_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "society" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "society_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "societyMember" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"society_id" integer NOT NULL,
	"role" "role" NOT NULL,
	CONSTRAINT "societyMember_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(250) NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"admin" boolean DEFAULT false NOT NULL,
	CONSTRAINT "user_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_token_index" ON "session" ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email_index" ON "user" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "candidateVote" ADD CONSTRAINT "candidateVote_member_id_societyMember_id_fk" FOREIGN KEY ("member_id") REFERENCES "societyMember"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "candidateVote" ADD CONSTRAINT "candidateVote_election_candidate_id_electionCandidate_id_fk" FOREIGN KEY ("election_candidate_id") REFERENCES "electionCandidate"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "election" ADD CONSTRAINT "election_society_id_society_id_fk" FOREIGN KEY ("society_id") REFERENCES "society"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "electionCandidate" ADD CONSTRAINT "electionCandidate_election_office_id_electionOffice_id_fk" FOREIGN KEY ("election_office_id") REFERENCES "electionOffice"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "electionInitiative" ADD CONSTRAINT "electionInitiative_election_id_election_id_fk" FOREIGN KEY ("election_id") REFERENCES "election"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "electionOffice" ADD CONSTRAINT "electionOffice_election_id_election_id_fk" FOREIGN KEY ("election_id") REFERENCES "election"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "initiativeOption" ADD CONSTRAINT "initiativeOption_election_initiative_id_electionInitiative_id_fk" FOREIGN KEY ("election_initiative_id") REFERENCES "electionInitiative"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "initiativeVote" ADD CONSTRAINT "initiativeVote_member_id_societyMember_id_fk" FOREIGN KEY ("member_id") REFERENCES "societyMember"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "initiativeVote" ADD CONSTRAINT "initiativeVote_election_initiative_id_electionInitiative_id_fk" FOREIGN KEY ("election_initiative_id") REFERENCES "electionInitiative"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "initiativeVote" ADD CONSTRAINT "initiativeVote_election_initiative_option_id_initiativeOption_id_fk" FOREIGN KEY ("election_initiative_option_id") REFERENCES "initiativeOption"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "society" ADD CONSTRAINT "society_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "societyMember" ADD CONSTRAINT "societyMember_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "societyMember" ADD CONSTRAINT "societyMember_society_id_society_id_fk" FOREIGN KEY ("society_id") REFERENCES "society"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
