PG_USER="postgres"
PG_DATABASE="americandream"

# PSV file
PSV_FILE="societies.psv"
OWNER_ID=1




# Function to insert data into PostgreSQL
insert_data() {
    if [ $OWNER_ID -eq 4 ]; then
        OWNER_ID=1
    else
        ((OWNER_ID++))
    fi
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO society (id, name, user_id) VALUES ($1, '$2', $OWNER_ID)";
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