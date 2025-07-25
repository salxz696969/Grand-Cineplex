import { render, screen } from '@testing-library/react';
import { SeatCard } from '../components/customer/seats/Seatcard';
import { Seat } from '../../../shared/types/type';

describe("SeatCard", () => {
    it("renders seat number", () => {
        render(<SeatCard seat={{ id: "1", row: "A", number: 5, type: "regular", price: 10, isBooked: false } as Seat} isSelected={false} onToggle={() => { }} />);
        expect(screen.getByText("5"));
    });
});