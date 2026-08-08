import { vi } from 'vitest';

export const orderMock = vi.fn(() => Promise.resolve({ data: [], error: null }));
export const selectMock = vi.fn(() => ({ order: orderMock }));
export const insertSelectMock = vi.fn(() => Promise.resolve({ data: [], error: null }));
export const insertMock = vi.fn(() => ({ select: insertSelectMock }));
export const updateEqMock = vi.fn(() => Promise.resolve({ error: null }));
export const updateMock = vi.fn(() => ({ eq: updateEqMock }));
export const deleteInMock = vi.fn(() => Promise.resolve({ error: null }));
export const deleteMock = vi.fn(() => ({ in: deleteInMock }));
export const fromMock = vi.fn(() => ({
  select: selectMock,
  insert: insertMock,
  update: updateMock,
  delete: deleteMock,
}));
export const supabaseMock = {
  from: fromMock,
};
