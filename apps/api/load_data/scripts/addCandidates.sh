PG_USER="postgres"
PG_DATABASE="americandream"

PSV_FILE="./scripts/candidates.psv"


if [ ! -f "$PSV_FILE" ]; then
    echo "PSV file not found."
    exit 1
fi

insert_offices() {
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"electionOffice\" (id, election_id, office_name, max_votes) VALUES ($1, $2, '$3', $4)";
}
insert_candidates() {
    if [ -z "$5" ]; then
        psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"electionCandidate\" (id, election_office_id, name, description) VALUES ($1, $2, '$3 $4', 'My name is $3 $4 and I am the best candidate for this office')";
    else 
        psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"electionCandidate\" (id, election_office_id, name, description) VALUES ($1, $2, '$3 $4', '$5')";
    fi
}
escape_single_quotes() {
    local input_string="$1"
    local escaped_string=""

    for (( i=0; i<${#input_string}; i++ )); do
        char="${input_string:$i:1}"
        if [[ "$char" == "'" ]]; then
            escaped_string+="''"
        else
            escaped_string+="$char"
        fi
    done

    echo "$escaped_string"
}

while IFS='|' read -r CandidateID OfficeID ElectionID OfficeName MaxVotes CandidateFirstName CandidateLastName CandidateCredentials CandidateBio; do
    # Skip the header line
    if [ "$CandidateID" == "Candidate ID" ]; then
        continue
    fi
    if [ -z "$CandidateBio" ]; then
        insert_offices "$OfficeID" "$ElectionID" "$OfficeName" "$MaxVotes"
        insert_candidates "$CandidateID" "$OfficeID" "$CandidateFirstName" "$CandidateLastName" "$CandidateBio"
    else
        insert_offices "$OfficeID" "$ElectionID" "$OfficeName" "$MaxVotes"
        insert_candidates "$CandidateID" "$OfficeID" "$CandidateFirstName" "$CandidateLastName" "$(escape_single_quotes "$CandidateBio")"
    fi
done < "$PSV_FILE"
