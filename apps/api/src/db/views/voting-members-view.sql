CREATE MATERIALIZED VIEW "votingMembersView" AS
SELECT
  "societyMember"."society_id",
  COUNT(DISTINCT "candidateVote"."member_id") AS "count"
FROM
  "candidateVote"
INNER JOIN "societyMember" ON "societyMember".id = "candidateVote".member_id
GROUP BY
  "societyMember"."society_id";