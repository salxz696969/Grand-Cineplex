import { render, screen } from '@testing-library/react';
import Home from '../pages/customer/Home';

test('renders home page', () => {
    render(<Home />);
    expect(screen.getByText(/home|welcome/i));
}); 