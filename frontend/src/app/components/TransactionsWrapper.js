'use client'
import { Suspense } from 'react';
import Summary from '@/app/components/Summary';
import TransactionForm from '@/app/components/TransactionForm';
import TransactionList from '@/app/components/TransactionList';
import CategoryChart from '@/app/components/CategoryChart';
import useFetch from '@/hook/useData';

const TransactionsWrapper = () => {
    const { transactions } = useFetch();
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-10">
            <div className="lg:col-span-2 space-y-6">
                <Summary transactions={transactions} />

                <div className="card">
                    <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
                    <Suspense fallback={<div>Loading form...</div>}>
                        <TransactionForm />
                    </Suspense>
                </div>

                <div className="card">
                    <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                    <Suspense fallback={<div>Loading transactions...</div>}>
                        <TransactionList transactions={transactions} />
                    </Suspense>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="card">
                    <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
                    <Suspense fallback={<div>Loading chart...</div>}>
                        <CategoryChart transactions={transactions} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default TransactionsWrapper;
