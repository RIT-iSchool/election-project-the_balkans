CREATE OR REPLACE FUNCTION activeBallotsFunction(society_id_param INT)
RETURNS TABLE (
  count INT
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    count
  FROM 
    activeBallotsView
  WHERE 
    societyId = society_id_param;
END; $$
LANGUAGE plpgsql;