'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addTransaction } from '@/lib/api';

export default function TransactionForm() {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        type: 'expense'
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.title || !formData.amount || !formData.category) {
            setError('Please fill all fields');
            return;
        }

        try {
            await addTransaction({
                ...formData,
                amount: parseFloat(formData.amount)
            });

            setFormData({
                title: '',
                amount: '',
                category: '',
                type: 'expense'
            });
            router.refresh();


        } catch (err) {
            setError(err.message || 'Failed to add transaction');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div>
                <label className="block mb-1">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Groceries"
                    required
                    className="border rounded p-2 w-full mb-2"
                />
            </div>

            <div>
                <label className="block mb-1">Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    placeholder="e.g. 100.00"
                    required
                    className="border rounded p-2 w-full mb-2"
                />
            </div>

            <div>
                <label className="block mb-1">Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Food"
                    required
                    className="border rounded p-2 w-full mb-2"
                />
            </div>

            <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="type"
                        value="expense"
                        checked={formData.type === 'expense'}
                        onChange={handleChange}
                        className="h-4 w-4"
                    />
                    <span>Expense</span>
                </label>

                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="type"
                        value="income"
                        checked={formData.type === 'income'}
                        onChange={handleChange}
                        className="h-4 w-4"
                    />
                    <span>Income</span>
                </label>
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
                Add Transaction
            </button>
        </form>
    );
}