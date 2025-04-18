'use client';

import { FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { deleteTransaction } from '@/lib/api';
import { useState } from 'react';

export default function TransactionList({ transactions }) {
    const router = useRouter();
    const [error, setError] = useState('');

    const handleDelete = async (id) => {
        setError('');
        try {
            await deleteTransaction(id);
            router.refresh();
        } catch (err) {
            setError(err.message || 'Failed to delete transaction');
        }
    };

    if (!transactions || transactions.length === 0) {
        return <p className="text-gray-500">No transactions yet. Add one to get started!</p>;
    }

    return (
        <div className="overflow-x-auto">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-left">Title</th>
                        <th className="p-2 text-left">Amount</th>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Type</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{transaction.title}</td>
                            <td className={`p-2 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                            </td>
                            <td className="p-2">{transaction.category}</td>
                            <td className="p-2 capitalize">{transaction.type}</td>
                            <td className="p-2">{new Date(transaction.date).toLocaleDateString()}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => handleDelete(transaction.id)}
                                    className="text-red-500 hover:text-red-700"
                                    aria-label="Delete transaction"
                                >
                                    <FiTrash2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}