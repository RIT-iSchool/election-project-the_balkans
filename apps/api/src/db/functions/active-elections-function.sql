CREATE OR REPLACE FUNCTION activeElectionsFunction()
RETURNS TABLE (
  count INT
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    count
  FROM 
    activeElectionsView
END; $$
LANGUAGE plpgsql;