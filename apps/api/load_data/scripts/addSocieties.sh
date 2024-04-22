# PG_USER=""
# PG_DATABASE="americandream"
PG_USER="postgres"
PG_PASSWORD="1234"
PG_DATABASE="americandream"

export PGPASSWORD="$PG_PASSWORD"
# PSV file
PSV_FILE="./scripts/societies.psv"
OWNER_ID=100000

psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" VALUES (100000, 'shpend.ismaili1@gmail.com', 'shpend123', 'Shpend', 'Ismaili', false)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" VALUES (100001, 'chs3578@g.rit.edu', 'connor123', 'Connor', 'Stevens', false)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" VALUES (100002, 'ctg7866@g.rit.edu', 'cooper123', 'Cooper', 'Gadd', false)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" VALUES (100003, 'emr8909@g.rit.edu', 'evan123', 'Evan', 'Reighter', false)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" VALUES (100004, 'connor@admin.com', 'connor123', 'Connor', 'Stevens', true)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" VALUES (100005, 'dean@employee.com', 'dean123', 'Dean', 'Ganskop', false)";
psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO \"user\" VALUES (100006, 'dave@employee.com', 'dave123', 'David', 'Patric', false)";





# Function to insert data into PostgreSQL
insert_data() {
    if [ $OWNER_ID -eq 100004 ]; then
        OWNER_ID=100000
    else
        ((OWNER_ID++))
    fi
    psql -h localhost -U "$PG_USER" -d "$PG_DATABASE" -c "INSERT INTO society (name, owner_id) VALUES ('$1', $OWNER_ID)";
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
    insert_data "$name"
done < "$PSV_FILE"

echo "Data insertion completed."