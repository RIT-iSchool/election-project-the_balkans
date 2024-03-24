PG_USER="postgres"
PG_DATABASE="americandream"

PSV_FILE="votes.psv"
COUNT=1
insert_votes() {
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"candidateVote\" (id, member_id, election_candidate_id) VALUES ($COUNT, $1, $2)";
    (($COUNT++))
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
