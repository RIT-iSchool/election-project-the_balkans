CREATE OR REPLACE FUNCTION totalVotesFunction(election_id_param INT)
RETURNS TABLE (
  totalCount BIGINT
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    count
  FROM 
      "totalVotesView"
  WHERE 
      electionId = election_id_param;
END; $$
LANGUAGE plpgsql;