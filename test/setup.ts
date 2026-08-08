import '@testing-library/jest-dom';
import { createElement } from 'react';
import { vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) =>
    createElement('a', { href, ...props }, children),
}));
