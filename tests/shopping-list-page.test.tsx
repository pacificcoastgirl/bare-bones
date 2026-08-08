import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  deleteInMock,
  deleteMock,
  fromMock,
  insertMock,
  insertSelectMock,
  orderMock,
  selectMock,
  updateEqMock,
  updateMock,
} from './mocks/supabase';

const savedItem = { id: 'item-1', name: 'Test Item', quantity: 1, category: 'Groceries', completed: false };
const completedItem = { ...savedItem, completed: true };
const addedItem = { id: 'item-2', name: 'Bananas', quantity: 2, category: 'Kitty', completed: false };

vi.mock('@/utils/supabase', () => ({
  supabase: {
    from: fromMock,
  },
}));

import PersonalShoppingList from '@/app/shopping-list/page';

describe('PersonalShoppingList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    orderMock.mockImplementation(() => Promise.resolve({ data: [savedItem], error: null }));
    selectMock.mockImplementation(() => ({ order: orderMock }));
    fromMock.mockImplementation(() => ({ select: selectMock, insert: insertMock, update: updateMock, delete: deleteMock }));
  });

  it('renders loading state and then shows fetched items', async () => {
    render(<PersonalShoppingList />);

    expect(screen.getByText(/syncing catalog rows/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/syncing catalog rows/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/test item/i)).toBeInTheDocument();
    expect(fromMock).toHaveBeenCalledWith('shopping_items');
    expect(selectMock).toHaveBeenCalledWith('*');
    expect(orderMock).toHaveBeenCalledWith('created_at', { ascending: true });
  });

  it('adds a new item when the form is submitted with valid input', async () => {
    render(<PersonalShoppingList />);

    await waitFor(() => {
      expect(screen.queryByText(/syncing catalog rows/i)).not.toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/add item name/i), { target: { value: 'Bananas' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Kitty' } });
    fireEvent.change(screen.getByLabelText(/qty/i), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: /add item/i }));

    await waitFor(() => {
      expect(screen.getByText(/bananas/i)).toBeInTheDocument();
    });

    expect(insertMock).toHaveBeenCalledWith([
      { name: 'Bananas', quantity: 2, category: 'Kitty', completed: false },
    ]);
    expect(insertSelectMock).toHaveBeenCalled();
  });

  it('does not insert a row when the item name is blank', async () => {
    render(<PersonalShoppingList />);

    await waitFor(() => {
      expect(screen.queryByText(/syncing catalog rows/i)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /add item/i }));

    expect(insertMock).not.toHaveBeenCalled();
  });

  it('toggles completion state on item click and updates the database', async () => {
    render(<PersonalShoppingList />);

    await waitFor(() => {
      expect(screen.queryByText(/syncing catalog rows/i)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/test item/i));

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalledWith({ completed: true });
      expect(updateEqMock).toHaveBeenCalledWith('item-1');
    });

    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('clears completed items and removes them from the list', async () => {
    orderMock.mockResolvedValue({ data: [completedItem], error: null });

    render(<PersonalShoppingList />);

    await waitFor(() => {
      expect(screen.queryByText(/syncing catalog rows/i)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /clear checked items/i }));

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalled();
      expect(deleteInMock).toHaveBeenCalledWith(['item-1']);
    });

    expect(screen.queryByText(/test item/i)).not.toBeInTheDocument();
  });
});
