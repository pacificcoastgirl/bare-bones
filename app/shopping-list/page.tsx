// app/shopping-list/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase, type ShoppingItem } from '@/utils/supabase';

type ItemCategory = 'Groceries' | 'Kitty' | 'Medication' | 'Other';

export default function PersonalShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Form Fields State Tracker
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemQty, setNewItemQty] = useState<number>(1);
  const [newItemCat, setNewItemCat] = useState<ItemCategory>('Groceries');

  // 1. DATA READ: Fetch existing items from the cloud database on page mount
  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase
        .from('shopping_items')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching database list:', error);
      } else if (data) {
        setItems(data as ShoppingItem[]);
      }
      setLoading(false);
    }
    fetchItems();
  }, []);

  // 2. DATA WRITE: Insert a new row into PostgreSQL
  const handleAddItem = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const targetName = newItemName.trim();
    setNewItemName(''); // Optimistically clear input for faster UI feel

    const { data, error } = await supabase
      .from('shopping_items')
      .insert([
        { name: targetName, quantity: newItemQty, category: newItemCat, completed: false }
      ])
      .select(); // Request the created row back so we have its real database UUID

    if (error) {
      console.error('Error saving item:', error);
    } else if (data) {
      setItems(prev => [...prev, data[0] as ShoppingItem]);
    }
    
    setNewItemQty(1);
  };

  // 3. DATA UPDATE: Modify the checked value of an item row
  const handleToggleComplete = async (id: string, currentStatus: boolean) => {
    // Optimistically update the UI layout state immediately for speed
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: !currentStatus } : item));

    const { error } = await supabase
      .from('shopping_items')
      .update({ completed: !currentStatus })
      .eq('id', id);

    if (error) {
      console.error('Error updating completion status:', error);
    }
  };

  // 4. DATA DELETE: Wipe out completed rows
  const handleClearCompleted = async () => {
    // Isolate target IDs to wipe out
    const completedIds = items.filter(item => item.completed).map(item => item.id);
    
    // Filter local layout memory instantly
    setItems(prev => prev.filter(item => !item.completed));

    const { error } = await supabase
      .from('shopping_items')
      .delete()
      .in('id', completedIds);

    if (error) {
      console.error('Error deleting rows:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6 md:p-12 flex justify-center">
      {/* The master wrapper container forces a tight, strict maximum width and handles the screen center math */}
      <div className="w-full max-w-2xl flex flex-col items-stretch">
        
        {/* 1. FIXED HEADER ALIGNMENT */}
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-900">
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-500 mb-1">Taxes and things</span>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Le Shopping List</h1>
          </div>
          <Link href="/" className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-800 transition-colors">
            ← Hub
          </Link>
        </header>

        {/* 2. INPUT ENTRY SUBMISSION PANEL */}
        <form onSubmit={handleAddItem} className="bg-gray-900/60 border border-gray-800/80 p-5 rounded-2xl mb-6 shadow-xl flex flex-col md:flex-row gap-4 items-end backdrop-blur-sm">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Item Description</label>
            <input
              type="text"
              placeholder="Add item name..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="w-full bg-gray-950 border border-slate-800 focus:border-teal-500 rounded-xl px-4 py-2.5 outline-none transition-all text-white text-sm"
            />
          </div>

          <div className="w-full md:w-36">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Category</label>
            <select
              value={newItemCat}
              onChange={(e) => setNewItemCat(e.target.value as ItemCategory)}
              className="w-full bg-gray-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-2.5 outline-none transition-all text-white text-sm cursor-pointer"
            >
              <option value="Groceries">Groceries</option>
              <option value="Kitty">Kitty</option>
              <option value="Medication">Medication</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="w-full md:w-20">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Qty</label>
            <input
              type="number"
              min="1"
              value={newItemQty}
              onChange={(e) => setNewItemQty(parseInt(e.target.value) || 1)}
              className="w-full bg-gray-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-2.5 outline-none text-center transition-all text-white text-sm"
            />
          </div>

          <button type="submit" className="w-full md:w-auto bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg active:scale-95 text-sm h-[46px] shrink-0">
            Add Item
          </button>
        </form>

        {/* 3. DISPLAY TABLE PANEL */}
        <div className="bg-gray-900/40 border border-gray-800/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center gap-3">
              <div className="w-6 h-6 border-2 border-teal-500/20 border-t-teal-400 rounded-full animate-spin" />
              <p className="text-slate-400 text-xs font-medium tracking-wide">Syncing catalog rows...</p>
            </div>
          ) : items.length === 0 ? (
            <p className="text-slate-500 p-12 text-center text-sm font-medium">Yay! No items to display.</p>
          ) : (
            <div className="divide-y divide-gray-800/60">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleToggleComplete(item.id, item.completed)}
                  className="flex items-center justify-between p-4 hover:bg-slate-800/20 transition-colors cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Styled Checkbox UI */}
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs font-bold transition-all shrink-0 ${
                      item.completed 
                        ? 'bg-teal-500 border-teal-400 text-slate-950' 
                        : 'border-slate-700 bg-gray-950 group-hover:border-slate-500'
                    }`}>
                      {item.completed && '✓'}
                    </div>
                    
                    {/* Left-Justified Text Block mapping flush against the container border */}
                    <span className={`text-sm font-medium truncate transition-all ${
                      item.completed ? 'line-through text-slate-500' : 'text-slate-200'
                    }`}>
                      {item.name} 
                      {item.quantity > 1 && (
                        <span className="text-xs text-teal-400 font-mono ml-2 bg-teal-500/10 px-1.5 py-0.5 rounded">
                          x{item.quantity}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Right-Aligned Category Tag Pill */}
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border shrink-0 ${
                    item.category === 'Groceries' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' :
                    item.category === 'Kitty' ? 'bg-amber-500/5 text-amber-400 border-amber-500/10' :
                    item.category === 'Medication' ? 'bg-rose-500/5 text-rose-400 border-rose-500/10' :
                    'bg-slate-500/5 text-slate-400 border-slate-500/10'
                  }`}>
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          )}

          {items.some(i => i.completed) && (
            <div className="p-3 bg-gray-950/60 border-t border-gray-800/60 flex justify-end">
              <button onClick={handleClearCompleted} className="text-xs text-amber-700 hover:text-amber-500 font-semibold px-3 py-1.5 rounded-lg hover:bg-amber-600/10 transition-colors">
                Clear Checked Items
              </button>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}