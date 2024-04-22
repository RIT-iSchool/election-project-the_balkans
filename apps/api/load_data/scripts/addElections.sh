# PG_USER=""
# PG_DATABASE="americandream"
PG_USER="postgres"
PG_PASSWORD="1234"
PG_DATABASE="americandream"

export PGPASSWORD="$PG_PASSWORD"
# PSV file
PSV_FILE="./scripts/elections.psv"



insert_data() {
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO election (name, society_id, start_date, end_date) VALUES ('$1', $2, '$3', '$4')";
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
    insert_data "$name" "$society" "$start_date" "$end_date"
done < "$PSV_FILE"