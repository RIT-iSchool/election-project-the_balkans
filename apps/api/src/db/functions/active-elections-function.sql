CREATE OR REPLACE FUNCTION activeElectionsFunction()
RETURNS TABLE (
  totalCount BIGINT
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    count
  FROM 
    "activeElectionsView";
END; $$
LANGUAGE plpgsql;