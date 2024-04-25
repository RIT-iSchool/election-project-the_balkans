CREATE INDEX IF NOT EXISTS "candidate_vote_member_id_index" ON "candidateVote" ("member_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "candidate_vote_election_candidate_id_index" ON "candidateVote" ("election_candidate_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "election_society_id_index" ON "election" ("society_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "election_start_date_index" ON "election" ("start_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "election_end_date_index" ON "election" ("end_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "election_candidate_election_office_id_society_id_index" ON "electionCandidate" ("election_office_id","society_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "election_candidate_name_society_id_index" ON "electionCandidate" ("name","society_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "election_initiative_election_id_society_id_index" ON "electionInitiative" ("election_id","society_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "election_office_election_id_society_id_index" ON "electionOffice" ("election_id","society_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "initiative_option_election_initiative_id_society_id" ON "initiativeOption" ("election_initiative_id","society_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "initiative_vote_election_initiative_id_election_initiative_option_id_index" ON "initiativeVote" ("election_initiative_id","election_initiative_option_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "society_name_index" ON "society" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "society_member_user_id_society_id_index" ON "societyMember" ("user_id","society_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_password_index" ON "user" ("password");