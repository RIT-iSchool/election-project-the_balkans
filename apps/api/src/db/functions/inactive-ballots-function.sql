CREATE OR REPLACE FUNCTION inactiveBallotsFunction(society_id_param INT)
RETURNS TABLE (
  totalCount BIGINT
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    count
  FROM 
    "inactiveBallotsView"
  WHERE 
    societyId = society_id_param;
END; $$
LANGUAGE plpgsql;