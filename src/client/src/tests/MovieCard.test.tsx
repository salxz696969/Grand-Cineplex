import { render, screen } from '@testing-library/react';
import MovieCard from '../components/customer/movie/MovieCard';
import { describe, it, expect, jest } from "@jest/globals";

describe('MovieCard', () => {
    it('renders movie title', () => {
        render(<MovieCard id={1} title="Inception" release_date="2010-07-16" duration={"120"} image="https://example.com/image.jpg" />);
        expect(screen.getByText("Inception"));
    });
});