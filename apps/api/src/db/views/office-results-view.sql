CREATE MATERIALIZED VIEW "officeResultsView" AS
SELECT
  "election"."id" AS "electionId",
  json_build_object(
    'name', "electionCandidate"."name",
    'office', "electionOffice"."office_name",
    'voteCount', COUNT("candidateVote"."election_candidate_id")
  ) AS "candidate"
FROM
  "election"
INNER JOIN
  "electionOffice" ON "electionOffice"."election_id" = "election"."id"
INNER JOIN
  "electionCandidate" ON "electionCandidate"."election_office_id" = "electionOffice"."id"
INNER JOIN
  "candidateVote" ON "candidateVote"."election_candidate_id" = "electionCandidate"."id"
GROUP BY
  "election"."id", "electionCandidate"."name", "electionOffice"."office_name"
ORDER BY
  COUNT("candidateVote"."election_candidate_id") DESC;