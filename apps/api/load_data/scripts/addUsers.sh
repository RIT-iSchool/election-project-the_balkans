PG_USER=""
PG_DATABASE="americandream"

MEMBERS="./scripts/members.psv"
OFFICERS="./scripts/officers.psv"
# inserting the society owners
COUNT=0
insert_user() {
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" (email, password, first_name, last_name, admin) VALUES ('$2@gmail.com', '123456789', '$3', '$4', false)";
}

insert_society_member() {
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"societyMember\" (user_id, society_id, "role") VALUES ($COUNT,  $1, '$2')";
    ((COUNT++))
}

while IFS='|' read -r id FirstName LastName Username SocietyID Role; do
    # Skip the header line
    if [ "$id" == "MemberID" ]; then
        continue
    fi
    insert_user "$Username" "$FirstName" "$LastName"
    insert_society_member "$SocietyID" "member"

done < "$MEMBERS"

while IFS='|' read -r id FirstName LastName Username SocietyID Role; do
    # Skip the header line
    if [ "$id" == "MemberID" ]; then
        continue
    fi
    insert_user "$Username" "$FirstName" "$LastName" 
    insert_society_member "$SocietyID" "officer"

done < "$OFFICERS"








