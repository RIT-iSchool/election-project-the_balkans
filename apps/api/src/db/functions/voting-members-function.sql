CREATE OR REPLACE FUNCTION votingMembersFunction(society_id_param INT)
RETURNS TABLE (
  totalCount BIGINT
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    count
  FROM 
    votingMembersView
  WHERE 
    societyId = society_id_param;
END; $$
LANGUAGE plpgsql;