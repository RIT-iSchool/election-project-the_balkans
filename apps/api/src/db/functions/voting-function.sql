CREATE OR REPLACE FUNCTION votingFunction(election_id_param INT)
RETURNS TABLE (
  "votingUser" json
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    "user"
  FROM 
      "votingView"
  WHERE 
      electionId = election_id_param;
END; $$
LANGUAGE plpgsql;