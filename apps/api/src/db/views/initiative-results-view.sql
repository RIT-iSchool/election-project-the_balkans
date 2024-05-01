CREATE MATERIALIZED VIEW "initiativeResultsView" AS
SELECT
  "election"."id" AS electionId,
  json_build_object(
    'title', "initiativeOption"."title",
    'initiative', "electionInitiative"."initiative_name",
    'voteCount', COUNT("initiativeVote"."election_initiative_id")
  ) AS option
FROM
  "election"
INNER JOIN
  "electionInitiative" ON "electionInitiative"."election_id" = "election"."id"
INNER JOIN
  "initiativeOption" ON "initiativeOption"."election_initiative_id" = "electionInitiative"."id"
INNER JOIN
  "initiativeVote" ON "initiativeVote"."election_initiative_id" = "initiativeOption"."id"
GROUP BY
  "election"."id", "initiativeOption"."title", "electionInitiative"."initiative_name"
ORDER BY
  COUNT("initiativeVote"."election_initiative_id") DESC;