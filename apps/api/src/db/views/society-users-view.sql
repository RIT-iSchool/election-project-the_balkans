CREATE MATERIALIZED VIEW "societyUsersView" AS
SELECT
  "societyMember".society_id AS "societyId",
  COUNT(*) AS "COUNT"
FROM
  "societyMember"
GROUP BY
  "societyMember".society_id;