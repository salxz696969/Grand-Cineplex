import { render, screen } from '@testing-library/react';
import SignIn from '../pages/customer/Auth';

test('renders sign in heading', () => {
    render(<SignIn />);
    expect(screen.getByText(/sign in/i));
}); 