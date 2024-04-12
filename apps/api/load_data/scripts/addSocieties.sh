PG_USER=""
PG_DATABASE="americandream"

# PSV file
PSV_FILE="./scripts/societies.psv"
OWNER_ID=1

psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" VALUES (1, 'shpend.ismaili1@gmail.com', 'shpend123', 'Shpend', 'Ismaili', false)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" VALUES (2, 'chs3578@g.rit.edu', 'connor123', 'Connor', 'Stevens', false)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" VALUES (3, 'ctg7866@g.rit.edu', 'cooper123', 'Cooper', 'Gadd', false)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" VALUES (4, 'emr8909@g.rit.edu', 'evan123', 'Evan', 'Reighter', false)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" VALUES (5, 'connor@admin.com', 'connor123', 'Connor', 'Stevens', true)";


# Function to insert data into PostgreSQL
insert_data() {
    if [ $OWNER_ID -eq 4 ]; then
        OWNER_ID=1
    else
        ((OWNER_ID++))
    fi
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO society (id, name, owner_id) VALUES ($1, '$2', $OWNER_ID)";
}

# Check if PSV file exists
if [ ! -f "$PSV_FILE" ]; then
    echo "PSV file not found."
    exit 1
fi

# Read data from PSV file and insert into PostgreSQL
while IFS='|' read -r id name abbreviation discipline; do
    # Skip the header line
    if [ "$id" == "Society ID" ]; then
        continue
    fi
    insert_data "$id" "$name"
done < "$PSV_FILE"

echo "Data insertion completed."