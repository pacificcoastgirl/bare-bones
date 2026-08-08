import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const insertMock = vi.fn(() => Promise.resolve({ error: null }));
const fromMock = vi.fn(() => ({ insert: insertMock }));

vi.mock('@/utils/supabase', () => ({
  supabase: {
    from: fromMock,
  },
}));

import AppViewer from '@/app/app-viewer/[appId]/page';

describe('AppViewer', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('renders the selected app id and back link', async () => {
    render(<AppViewer params={Promise.resolve({ appId: 'space-shooter' })} />);

    expect(await screen.findByText(/running:/i)).toBeInTheDocument();
    expect(screen.getByText('space-shooter')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to hub/i })).toHaveAttribute('href', '/');
    expect(screen.getByTitle('space-shooter')).toBeInTheDocument();
  });

  it('processes valid hub messages and forwards them to Supabase', async () => {
    vi.useFakeTimers();

    render(<AppViewer params={Promise.resolve({ appId: 'space-shooter' })} />);

    await screen.findByText(/running:/i);

    const payload = { score: 123 };
    const event = new MessageEvent('message', {
      origin: window.location.origin,
      data: {
        type: 'HUB_STATE_UPDATE',
        action: 'LEVEL_COMPLETE',
        payload,
      },
    });

    fireEvent(window, event);

    await waitFor(() => {
      expect(screen.getByText(/received "LEVEL_COMPLETE" event/i)).toBeInTheDocument();
    });

    expect((supabase.from as any)).toHaveBeenCalledWith('family_app_logs');
    expect((supabase.from as any).mock.results[0].value.insert).toHaveBeenCalledWith({
      app_id: 'space-shooter',
      action_type: 'LEVEL_COMPLETE',
      data_payload: payload,
      timestamp: expect.any(String),
    });

    vi.advanceTimersByTime(4000);

    await waitFor(() => {
      expect(screen.queryByText(/received "LEVEL_COMPLETE" event/i)).not.toBeInTheDocument();
    });
  });

  it('ignores messages from an untrusted origin', async () => {
    render(<AppViewer params={Promise.resolve({ appId: 'space-shooter' })} />);

    await screen.findByText(/running:/i);

    const event = new MessageEvent('message', {
      origin: 'https://malicious.example',
      data: {
        type: 'HUB_STATE_UPDATE',
        action: 'LEVEL_COMPLETE',
        payload: { score: 999 },
      },
    });

    fireEvent(window, event);

    await waitFor(() => {
      expect((__mocks as any).insertMock).not.toHaveBeenCalled();
      expect(screen.queryByText(/received "LEVEL_COMPLETE" event/i)).not.toBeInTheDocument();
    });
  });
});
