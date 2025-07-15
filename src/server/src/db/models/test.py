theaters = 10
rows = [chr(i) for i in range(ord('A'), ord('H') + 1)]  # Rows A to H
seats_per_row = 12

values = []
for theater_id in range(1, theaters + 1):
    seat_count = 0
    for row in rows:
        for seat_num in range(1, seats_per_row + 1):
            seat_count += 1
            if seat_count <= 36:
                seat_type = 'regular'
                price = 4.00
            elif seat_count <= 72:
                seat_type = 'premium'
                price = 10.00
            else:
                seat_type = 'vip'
                price = 15.00
            values.append(
                f"({theater_id}, '{row}', {seat_num}, '{seat_type}', {price:.2f}, NOW(), NOW())"
            )

print("INSERT INTO seat (theater_id, row_number, seat_number, seat_type, price, created_at, updated_at) VALUES")
print(",\n".join(values) + ";")
