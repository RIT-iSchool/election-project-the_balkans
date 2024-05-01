CREATE OR REPLACE FUNCTION societyUsersFunction(society_id_param INT)
RETURNS TABLE (
  count INT
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    count
  FROM 
    societyUsersView
  WHERE 
    societyId = society_id_param;
END; $$
LANGUAGE plpgsql;