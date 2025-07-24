import { render, screen } from '@testing-library/react';
import Results from '../components/Results';
import '@testing-library/jest-dom';

const results = [
  { _id: '1', filename: 'test.txt', size: 10, highlights: ['match 1', 'match 2'] },
];

describe('Results', () => {
  it('renders result file names and highlights', () => {
    render(<Results results={results} />);
    expect(screen.getByText('test.txt')).toBeInTheDocument();
    expect(screen.getByText('match 1')).toBeInTheDocument();
    expect(screen.getByText('match 2')).toBeInTheDocument();
  });
});