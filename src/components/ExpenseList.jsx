import React, { useState } from "react";

const ExpenseList = ({
  expenses,
  deleteExpense,
  updateExpense,
  categories,
  filterByCategory,
  filterByDate,
  selectedCategory,
  selectedDate,
}) => {
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleEditClick = (expense) => {
    setEditingExpenseId(expense.id);
    setEditedExpense({ ...expense });
  };

  const handleSaveClick = () => {
    updateExpense(editedExpense); // Call parent update function
    setEditingExpenseId(null); // Exit edit mode
  };

  const handleCancelClick = () => {
    setEditingExpenseId(null);
  };

  const handleInputChange = (e) => {
    setEditedExpense({ ...editedExpense, [e.target.name]: e.target.value });
  };

  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch = selectedCategory
      ? expense.category === selectedCategory
      : true;
    const dateMatch = selectedDate ? expense.date === selectedDate : true;
    return categoryMatch && dateMatch;
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Expense List
      </h2>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Category
          </label>
          <select
            onChange={(e) => filterByCategory(e.target.value)}
            value={selectedCategory}
            className="p-3 w-full border rounded-lg"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => filterByDate(e.target.value)}
            className="p-3 w-full border rounded-lg"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-gray-800">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3 px-4 text-sm font-medium">Title</th>
              <th className="py-3 px-4 text-sm font-medium">Amount</th>
              <th className="py-3 px-4 text-sm font-medium">Category</th>
              <th className="py-3 px-4 text-sm font-medium">Date</th>
              <th className="py-3 px-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="border-b hover:bg-gray-100">
                {editingExpenseId === expense.id ? (
                  <>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        name="description"
                        value={editedExpense.description}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        name="amount"
                        value={editedExpense.amount}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <select
                        name="category"
                        value={editedExpense.category}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                      >
                        {categories.map((cat, i) => (
                          <option key={i} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="date"
                        name="date"
                        value={editedExpense.date}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={handleSaveClick}
                        className="mr-2 px-3 py-1 bg-green-500 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="px-3 py-1 bg-gray-500 text-white rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4">{expense.description}</td>
                    <td className="py-3 px-4">{expense.amount}</td>
                    <td className="py-3 px-4">{expense.category}</td>
                    <td className="py-3 px-4">{expense.date}</td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button
                        onClick={() => handleEditClick(expense)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
