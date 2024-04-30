CREATE OR REPLACE FUNCTION officeResultsFunction(election_id_param INT)
RETURNS TABLE (
    candidate JSON
) AS $$
BEGIN
    RETURN QUERY 
    SELECT 
      candidate
    FROM 
        officeResultsView
    WHERE 
        electionId = election_id_param;
END; $$
LANGUAGE plpgsql;