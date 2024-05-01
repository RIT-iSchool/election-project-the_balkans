CREATE MATERIALIZED VIEW "activeBallotsView" AS
SELECT
election.society_id AS societyId,
COUNT(*) AS count
FROM
"election"
WHERE
"start_date" <= CURRENT_DATE
AND "end_date" >= CURRENT_DATE
GROUP BY
election.society_id;

CREATE MATERIALIZED VIEW "activeElectionsView" AS
SELECT 
COUNT(*) AS count
FROM
election
WHERE
start_date <= CURRENT_DATE
AND
end_date >= CURRENT_DATE;

CREATE MATERIALIZED VIEW "inactiveBallotsView" AS
SELECT
election.society_id AS societyId,
COUNT(*) AS count
FROM
"election"
WHERE
"start_date" > CURRENT_DATE
OR "end_date" < CURRENT_DATE
GROUP BY
election.society_id;

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

CREATE MATERIALIZED VIEW "loggedInUsersView" AS
SELECT 
COUNT(DISTINCT session."user_id") AS count
FROM
session
WHERE
expires_at > NOW();

CREATE MATERIALIZED VIEW "nonVotingView" AS
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
LEFT JOIN "electionOffice" ON "electionOffice"."election_id" = "election"."id"
LEFT JOIN "electionCandidate" ON "electionCandidate"."election_office_id" = "electionOffice"."id"
LEFT JOIN "candidateVote" ON "candidateVote"."election_candidate_id" = "electionCandidate"."id"
WHERE "candidateVote"."election_candidate_id" IS NULL;

CREATE MATERIALIZED VIEW "officeResultsView" AS
SELECT
"election"."id" AS electionId,
json_build_object(
  'name', "electionCandidate"."name",
  'office', "electionOffice"."office_name",
  'voteCount', COUNT("candidateVote"."election_candidate_id")
) AS candidate
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

CREATE MATERIALIZED VIEW "societyUsersView" AS
SELECT
"societyMember".society_id AS societyId,
COUNT(*) AS count
FROM
"societyMember"
GROUP BY
"societyMember".society_id;

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

CREATE MATERIALIZED VIEW "votingMembersView" AS
SELECT
"societyMember"."society_id" AS societyId,
COUNT(DISTINCT "candidateVote"."member_id") AS "count"
FROM
"candidateVote"
INNER JOIN "societyMember" ON "societyMember".id = "candidateVote".member_id
GROUP BY
"societyMember"."society_id";

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