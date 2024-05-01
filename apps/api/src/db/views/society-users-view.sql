CREATE MATERIALIZED VIEW "societyUsersView" AS
SELECT
  "societyMember".society_id AS societyId,
  COUNT(*) AS count
FROM
  "societyMember"
GROUP BY
  "societyMember".society_id;