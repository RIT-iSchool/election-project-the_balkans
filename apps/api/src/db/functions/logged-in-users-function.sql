CREATE OR REPLACE FUNCTION loggedInUsersFunction()
RETURNS TABLE (
  count INT
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    count
  FROM 
    loggedInUsersView
END; $$
LANGUAGE plpgsql;