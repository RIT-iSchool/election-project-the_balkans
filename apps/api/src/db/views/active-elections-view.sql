CREATE MATERIALIZED VIEW "activeElectionsView" AS
SELECT 
  COUNT(*) AS count
FROM
  election
WHERE
  start_date <= CURRENT_DATE
AND
  end_date >= CURRENT_DATE;