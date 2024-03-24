PG_USER="postgres"
PG_DATABASE="americandream"

# PSV file
PSV_FILE="./scripts/elections.psv"



insert_data() {
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO election (id, name, society_id, start_date, end_date) VALUES ($1, '$2', $3, '$4', '$5')";
}

# Check if PSV file exists
if [ ! -f "$PSV_FILE" ]; then
    echo "PSV file not found."
    exit 1
fi



while IFS='|' read -r id name society start_date end_date; do
    # Skip the header line
    if [ "$id" == "Election ID" ]; then
        continue
    fi
    insert_data "$id" "$name" "$society" "$start_date" "$end_date"
done < "$PSV_FILE"