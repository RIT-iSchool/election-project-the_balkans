CREATE OR REPLACE FUNCTION loggedInUsersFunction()
RETURNS TABLE (
  totalCount BIGINT
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    count
  FROM 
    "loggedInUsersView";
END; $$
LANGUAGE plpgsql;