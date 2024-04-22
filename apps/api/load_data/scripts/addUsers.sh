PG_USER=""
PG_DATABASE="americandream"

PSV_FILE="./scripts/dirty.psv"
# inserting the society owners
insert_user() {
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" (email, password, first_name, last_name, admin) VALUES ('$2@gmail.com', '123456789', '$3', '$4', false)";
}
#  Command to remove non-unique usernames
# awk -F'|' '{ if (!seen[$4]++) print }' dirty.psv > temp.psv && mv temp.psv dirty.psv

insert_society_member() {
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"societyMember\" (user_id, society_id, "role") VALUES ($1,  $2, 'member')";
    ((COUNT++))
}

while IFS='|' read -r id FirstName LastName Username SocietyID Role; do
    # Skip the header line
    if [ "$id" == "MemberID" ]; then
        continue
    fi
    insert_user "$Username" "$FirstName" "$LastName"
    insert_society_member "$id" "$SocietyID"

done < "$PSV_FILE"








