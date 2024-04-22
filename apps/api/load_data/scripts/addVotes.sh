# PG_USER=""
# PG_DATABASE="americandream"
PG_USER="postgres"
PG_PASSWORD="1234"
PG_DATABASE="americandream"

export PGPASSWORD="$PG_PASSWORD"
PSV_FILE="./scripts/votes.psv"

insert_votes() {
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"candidateVote\" (member_id, election_candidate_id) VALUES ($1, $2)";

}

while IFS='|' read -r MemberID ElectionID OfficeID CandidateID; do
    # Skip the header line
    if [ "$MemberID" == "Member ID" ]; then
        continue
    fi
    if [ "$MemberID" -gt 300 ]; then
        exit 1
    fi

    insert_votes "$MemberID" "$CandidateID"

done < "$PSV_FILE"

echo "Data insertion completed."
