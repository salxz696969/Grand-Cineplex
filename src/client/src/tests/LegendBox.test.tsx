import { render, screen } from '@testing-library/react';
import LegendBox from '../components/customer/seats/Legendbox';
import { describe, it, expect, jest } from "@jest/globals";

describe("LegendBox", () => {
    it("renders legend label", () => {
        render(<LegendBox label="VIP" colorFrom="#FFD700" colorTo="#FFD700" />);
        expect(screen.getByText("VIP"));
    });
});