CREATE OR REPLACE FUNCTION activeBallotsFunction(society_id_param INT)
RETURNS TABLE (
  totalCount BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    count
  FROM
    "activeBallotsView"
  WHERE
    societyId = society_id_param;
END; $$
LANGUAGE plpgsql;

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

CREATE OR REPLACE FUNCTION inactiveBallotsFunction(society_id_param INT)
RETURNS TABLE (
  totalCount BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    totalCount
  FROM
    "inactiveBallotsView"
  WHERE
    societyId = society_id_param;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION initiativeResultsFunction(election_id_param INT)
RETURNS TABLE (
  optionData JSON
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    option
  FROM
      "initiativeResultsView"
  WHERE
      electionId = election_id_param;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION loggedInUsersFunction()
RETURNS TABLE (
  totalCount BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    count
  FROM
    "loggedInUsersView";
END; $$
LANGUAGE plpgsql;

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

CREATE OR REPLACE FUNCTION officeResultsFunction(election_id_param INT)
RETURNS TABLE (
  candidateData JSON
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    candidate
  FROM
    "officeResultsView"
  WHERE
    electionId = election_id_param;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION societyUsersFunction(society_id_param INT)
RETURNS TABLE (
  totalCount BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    count
  FROM
    "societyUsersView"
  WHERE
    societyId = society_id_param;
END; $$
LANGUAGE plpgsql;

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

CREATE OR REPLACE FUNCTION votingMembersFunction(society_id_param INT)
RETURNS TABLE (
  totalCount BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    count
  FROM
    "votingMembersView"
  WHERE
    societyId = society_id_param;
END; $$
LANGUAGE plpgsql;

