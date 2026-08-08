import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const createClientMock = vi.fn(() => ({}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: createClientMock,
}));

describe('utils/supabase', () => {
  beforeEach(() => {
    vi.resetModules();
    createClientMock.mockClear();
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  });

  it('initializes the Supabase client with normalized environment variables', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co/';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = ' anon-key ';

    const { supabase } = await import('../utils/supabase');

    expect(createClientMock).toHaveBeenCalledWith('https://example.supabase.co', 'anon-key');
    expect(supabase).toBeDefined();
  });

  it('throws when environment variables are missing or malformed', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = '   ';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = '';

    await expect(import('../utils/supabase')).rejects.toThrow(
      'Missing or malformed Supabase Environment Variables in .env.local'
    );
  });
});
