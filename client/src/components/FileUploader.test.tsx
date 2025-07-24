import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUploader from './FileUploader';
import '@testing-library/jest-dom';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FileUploader', () => {
  const mockUpload = vi.fn();
  
  it('renders file input', () => {
    render(<FileUploader onUploadSuccess={mockUpload} />);
    const fileInput = screen.getByLabelText(/file/i);
    expect(fileInput).toBeInTheDocument();
  });

  it('calls onUpload when file is selected and button is clicked', async () => {
    const mockUpload = vi.fn();

    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    render(<FileUploader onUploadSuccess={mockUpload} />);

    const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    const fileInput = screen.getByLabelText(/file/i);

    fireEvent.change(fileInput, { target: { files: [file] } });

    const button = screen.getByRole('button', { name: /upload/i });
    fireEvent.click(button);

    await waitFor(() => expect(mockUpload).toHaveBeenCalled());
  });

});
