input_file="members.psv"
output_file="officers.psv"
temp_file="temp.psv"
# awk -F'|' '{ if (!seen[$4]++) print }' members.psv > temp.psv && mv temp.psv members.psv
cp "$input_file" "$temp_file"

for society_id in {1..80}; do
    member_line=$(grep "|$society_id|" "$temp_file" | shuf -n 1)
    modified_line=$(echo "$member_line" | sed 's/member/officer/')
    echo "$modified_line" >> "$output_file"
    sed -i "/$member_line/d" "$input_file"
done


rm "$temp_file"