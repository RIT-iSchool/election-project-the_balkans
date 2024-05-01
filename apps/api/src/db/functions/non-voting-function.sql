CREATE OR REPLACE FUNCTION nonVotingFunction(election_id_param INT)
RETURNS TABLE (
  "nonVotingUser" json
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    "user"
  FROM 
      "nonVotingView"
  WHERE 
      electionId = election_id_param;
END; $$
LANGUAGE plpgsql;