import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [expenseName,setExpenseName] = useState("");
  const [expenses,setExpenses] = useState(JSON.parse(localStorage.getItem("expenses"))||[]);
  const [budget,setBudget] = useState(localStorage.getItem("budget")||"");
  const [amount,setAmount] = useState("");
  const [search,setSearch] = useState("");

  useEffect(()=>{
    localStorage.setItem("expenses",JSON.stringify(expenses));
  },[expenses]);

  useEffect(()=>{
    localStorage.setItem("budget",budget);
  },[budget]);

  function addExpenses(){
    if(expenseName === "" || amount === ""){return}
    const newExpense = {
      id:Date.now(),
      name:expenseName,
      amount:Number(amount),
      date:new Date().toLocaleDateString()
    };
    setExpenses([...expenses,newExpense]);
    setExpenseName("");
    setAmount("");
  }

  function deleteExpenses(id){
    const updateExpenses = expenses.filter((expense)=>expense.id !==id);
    setExpenses(updateExpenses);
  }

  function clearExpenses(){
    setExpenses([]);
  }

  let totalExpense = 0;
  for(const expense of expenses){
    totalExpense+=expense.amount;
  }

  const remainingBudget = Number(budget) - totalExpense;

  return (
    <div className="App">
        <h1>Expense Tracker</h1>
        <h3>Set Budget</h3>
        <input type="number" 
        value={budget} 
        placeholder="Enter budget" 
        onChange={(e)=>setBudget(e.target.value)}/>
        <hr/>
        <h3>Add expense</h3>
        <input type="text" 
        value={expenseName} 
        placeholder="Expense name" 
        onChange={(e)=>setExpenseName(e.target.value)}/>
        <input type="number" 
        value={amount} 
        placeholder="Amount" 
        onChange={(e)=>setAmount(e.target.value)}
        onKeyDown={(e)=>{if(e.key === "Enter"){addExpenses()}}}/>
        <button 
        onClick={addExpenses}
        >Add expenses</button>
        <hr/>
        <div  className="summary">
        <h2>Budget:${budget}</h2>
        <h2>Total Expense:${totalExpense}</h2>
        <h2>Remaining Budget:${remainingBudget}</h2>
        <h2>Total transactions:{" "}{expenses.length}</h2>
        </div>
        {budget && totalExpense > Number(budget) && (
        <h2 className="warning">⚠ Budget Exceeded!</h2>)}
        <hr/>
        <input 
        type="text"
        value={search}
        placeholder="Search expenses"
        onChange={(e)=>setSearch(e.target.value)}/>
        <br/>
        <br/>
        <button onClick={clearExpenses}>Clear All Expenses</button>
        <hr/>
        <h2>Expense List</h2>
        {expenses.filter((expense)=>
        expense.name.toLowerCase().includes(search.toLowerCase())) 
        .map((expense)=>(
          <div key={expense.id} className="expense-card">
            <p>Expense name:{expense.name}</p>
            <p>Amount:{expense.amount}</p>
            <p>Date:{expense.date}</p>
            <button onClick={()=>deleteExpenses(expense.id)}>delete</button>
          </div>
        ))}
    </div>
  );
}

export default App;