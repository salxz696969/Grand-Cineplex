import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../components/customer/LoadingSpinner';
import { describe, it, expect, jest } from "@jest/globals";

describe("LoadingSpinner", () => {
    it("renders loading spinner", () => {
        render(<LoadingSpinner />);
        // Check for a spinner element, e.g., by role or class
        // Adjust the query as needed based on the actual implementation
        expect(screen.getByTestId("loading-spinner"));
    });
});