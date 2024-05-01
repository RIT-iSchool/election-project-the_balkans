CREATE MATERIALIZED VIEW "votingView" AS
SELECT DISTINCT ON ("user"."id")
    "election".id AS electionId,
    json_build_object(
        'firstName', "user"."first_name",
        'lastName', "user"."last_name"
    ) as "user"
FROM
    "user"
INNER JOIN "societyMember" ON "societyMember".user_id = "user"."id"
INNER JOIN "society" ON "society"."id" = "societyMember"."society_id"
INNER JOIN "election" ON "election"."society_id" = "society"."id"
INNER JOIN "electionOffice" ON "electionOffice"."election_id" = "election"."id"
INNER JOIN "electionCandidate" ON "electionCandidate"."election_office_id" = "electionOffice"."id"
INNER JOIN "candidateVote" ON "candidateVote"."election_candidate_id" = "electionCandidate"."id";