PG_USER=""
PG_DATABASE="americandream"

export PGPASSWORD="$PG_PASSWORD"

PSV_FILE="./scripts/candidates.psv"

societyID=1
changeID=false
prevOfficeID=0

if [ ! -f "$PSV_FILE" ]; then
    echo "PSV file not found."
    exit 1
fi

insert_offices() {
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"electionOffice\" (election_id, office_name, max_votes, society_id) VALUES ($1, '$2', $3, $societyID)";
}
insert_candidates() {

    if [ -z "$5" ]; then
        psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"electionCandidate\" (election_office_id, name, description, society_id) VALUES ($1, '$2 $3', 'My name is $2 $3 and I am the best candidate for this office', $societyID)";
    else 
        psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"electionCandidate\" (election_office_id, name, description, society_id) VALUES ($1, '$2 $3', '$4', $societyID)";
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

    # increments societyIDfor every 25th election
    if (($ElectionID % 25 == 0)) && ! $changeID; then
        changeID=true
    elif ! (($ElectionID % 25 == 0)) && $changeID; then
        ((societyID++))
        changeID=false
    fi



    if [ -z "$CandidateBio" ]; then
        if [ $prevOfficeID != $OfficeID ]; then
            insert_offices "$ElectionID" "$OfficeName" "$MaxVotes"
            insert_candidates "$OfficeID" "$CandidateFirstName" "$CandidateLastName" "$CandidateBio"
        else 
            insert_candidates "$OfficeID" "$CandidateFirstName" "$CandidateLastName" "$CandidateBio"
        fi
    else
        if [ $prevOfficeID != $OfficeID ]; then
            insert_offices "$ElectionID" "$OfficeName" "$MaxVotes"
            insert_candidates "$OfficeID" "$CandidateFirstName" "$CandidateLastName" "$(escape_single_quotes "$CandidateBio")"
        else 
            insert_candidates "$OfficeID" "$CandidateFirstName" "$CandidateLastName" "$(escape_single_quotes "$CandidateBio")"
        fi
    fi
    prevOfficeID=$OfficeID
done < "$PSV_FILE"
