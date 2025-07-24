import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '../components/SearchBox';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('SearchBox', () => {
  it('renders input and button', () => {
    render(<SearchBox onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted', () => {
    const mockSearch = vi.fn();
    render(<SearchBox onSearch={mockSearch} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockSearch).toHaveBeenCalled();
  });
});