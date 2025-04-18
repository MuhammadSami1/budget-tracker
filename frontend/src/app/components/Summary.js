import { FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function Summary({ transactions }) {
    const income = transactions
        ?.filter(t => t.type === 'income')
        ?.reduce((sum, t) => sum + t.amount, 0) || 0;

    const expenses = transactions
        ?.filter(t => t.type === 'expense')
        ?.reduce((sum, t) => sum + t.amount, 0) || 0;

    const balance = income - expenses;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 font-medium">Income</h3>
                    <FiTrendingUp className="text-green-500 text-xl" />
                </div>
                <p className="text-2xl font-bold mt-2 text-green-600">
                    ${income.toFixed(2)}
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 font-medium">Expenses</h3>
                    <FiTrendingDown className="text-red-500 text-xl" />
                </div>
                <p className="text-2xl font-bold mt-2 text-red-600">
                    ${expenses.toFixed(2)}
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 font-medium">Balance</h3>
                    <FiDollarSign className="text-blue-500 text-xl" />
                </div>
                <p className={`text-2xl font-bold mt-2 ${balance >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                    ${balance.toFixed(2)}
                </p>
            </div>
        </div>
    );
}