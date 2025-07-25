import { render, screen } from '@testing-library/react';
import Featured from '../components/customer/homecomponents/Featured';
import { describe, it, expect, jest } from "@jest/globals";

describe("Featured", () => {
    it("renders featured title", () => {
        render(<Featured  />);       
        expect(screen.getByText("Now Showing"));
    });
});