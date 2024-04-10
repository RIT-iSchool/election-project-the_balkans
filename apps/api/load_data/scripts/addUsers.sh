PG_USER=""
PG_DATABASE="americandream"

PSV_FILE="./scripts/dirty.psv"
COUNT=1
# inserting the society owners
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO "user" VALUES (1, 'shpend.ismaili1@gmail.com', 'shpend123', 'Shpend', 'Ismaili', false)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO "user" VALUES (2, 'chs3578@g.rit.edu', 'connor123', 'Connor', 'Stevens', false)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO "user" VALUES (3, 'ctg7866@g.rit.edu', 'connor123', 'Cooper', 'Gadd', false)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO "user" VALUES (4, 'emr8909@g.rit.edu', 'evan123', 'Evan', 'Reighter', false)";
insert_user() {
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" (id, email, password, first_name, last_name, admin) VALUES ($COUNT, '$2@gmail.com', '123456789', '$3', '$4', false)";
}
#  Command to remove non-unique usernames
# awk -F'|' '{ if (!seen[$4]++) print }' dirty.psv > temp.psv && mv temp.psv dirty.psv

insert_society_member() {
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"societyMember\" (id, user_id, society_id, "role") VALUES ($1, $COUNT, $2, 'member')";
    ((COUNT++))
}

while IFS='|' read -r id FirstName LastName Username SocietyID Role; do
    # Skip the header line
    if [ "$id" == "MemberID" ]; then
        continue
    fi
    insert_user "$id" "$Username" "$FirstName" "$LastName"
    insert_society_member "$id" "$SocietyID"

done < "$PSV_FILE"








