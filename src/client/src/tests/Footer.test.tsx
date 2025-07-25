import { render, screen } from '@testing-library/react';
import Footer from '../components/customer/Footer';

test('renders copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/copyright/i));
}); 