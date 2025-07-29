import { render, screen } from '@testing-library/react';
import TheatreCard from '../components/customer/theatres/TheatreCard';
import { describe, it, expect, jest } from "@jest/globals";

describe("TheatreCard", () => {
    it("renders theatre name", () => {
        render(<TheatreCard name="Main Hall" cinema_id={1} movieId={1} screenings={[]} />);
        expect(screen.getByText("Main Hall"));
    });
});