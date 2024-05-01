CREATE MATERIALIZED VIEW "totalVotesView" AS
SELECT
  "electionOffice".election_id as electionId,
  COUNT(*) AS count
FROM
  "candidateVote"
INNER JOIN "electionCandidate" ON "electionCandidate"."id" = "candidateVote"."election_candidate_id"
INNER JOIN "electionOffice" ON "electionOffice"."id" = "electionCandidate"."election_office_id"
GROUP BY
  "electionOffice"."election_id";