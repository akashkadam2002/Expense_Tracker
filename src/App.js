import React, { useEffect, useState } from "react";
import BudgetForm from "./components/BudgetForm";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import PieChart from "./components/PieChart";

const App = () => {
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  const [categories] = useState([
    "Food", "Transport", "Entertainment", "Bills", "Health", "Others",
  ]);

  const [budget, setBudget] = useState(() => {
    const storedBudget = localStorage.getItem("budget");
    return storedBudget ? JSON.parse(storedBudget) : 0;
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setEditingExpense(null); // Clear form after update
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const filterByCategory = (category) => setSelectedCategory(category);
  const filterByDate = (date) => setSelectedDate(date);

  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch = selectedCategory
      ? expense.category === selectedCategory
      : true;
    const dateMatch = selectedDate ? expense.date === selectedDate : true;
    return categoryMatch && dateMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Expense Tracker by Tanvir
      </h1>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Budget Input */}
        <BudgetForm setBudget={setBudget} />

        {/* Add / Edit Expense Form */}
        <ExpenseForm
          addExpense={addExpense}
          updateExpense={updateExpense}
          categories={categories}
          editingExpense={editingExpense}
        />

        {/* List of Expenses */}
        <ExpenseList
          expenses={filteredExpenses}
          deleteExpense={deleteExpense}
          updateExpense={updateExpense}          
          categories={categories}
          filterByCategory={filterByCategory}
          filterByDate={filterByDate}
          selectedCategory={selectedCategory}
          selectedDate={selectedDate}
        />

        {/* Chart */}
        <PieChart expenses={filteredExpenses} budget={budget} />
      </div>
    </div>
  );
};

export default App;
