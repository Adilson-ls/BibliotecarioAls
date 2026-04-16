import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ReaderSearchPortal from './ReaderSearchPortal';

const fakeWorks = [
  { id: '1', title: 'Governança de TI', author: 'Maria Almeida', isbn: '9788571234567', publisher: 'Atlas', year: 2024 }
];

describe('ReaderSearchPortal', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeWorks)
      } as Response)
    ));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and renders works from the backend proxy', async () => {
    render(<ReaderSearchPortal />);

    await waitFor(
      () => expect(global.fetch).toHaveBeenCalledWith('/api/works', expect.anything()),
      { timeout: 1000 }
    );

    expect(await screen.findByText('Governança de TI')).toBeInTheDocument();
    expect(screen.getByText('Maria Almeida')).toBeInTheDocument();
    expect(screen.getByText('9788571234567')).toBeInTheDocument();
  });

  it('updates the query and calls the proxy with the search term', async () => {
    render(<ReaderSearchPortal />);
    const input = screen.getByPlaceholderText('Título, autor ou ISBN');

    await act(async () => {
      await userEvent.type(input, 'governança');
    });

    await waitFor(
      () => expect(global.fetch).toHaveBeenCalledWith('/api/works?search=governan%C3%A7a', expect.anything()),
      { timeout: 1000 }
    );
  });
});
