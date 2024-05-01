CREATE MATERIALIZED VIEW "loggedInUsersView" AS
SELECT 
  COUNT(DISTINCT session."user_id") AS count
FROM
  session
WHERE
  expires_at > NOW();