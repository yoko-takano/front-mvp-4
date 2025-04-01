import React, { useState, useEffect } from 'react';
import '../styles/goals-style.css'; // Styles specific to the Goals screen
import Snowfall from 'react-snowfall'; // Import the Snowfall component
import { FaUserCircle, FaTrash } from "react-icons/fa";
import { TbMoneybag, TbPigMoney } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { createGoal, getUserData, deleteGoal, updateSalary, updateUsername, updateGoal } from '../api/api_connection';
import EditModal from './Modal';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [salary, setSalary] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [username, setUsername] = useState("");

  const [goalName, setGoalName] = useState("");
  const [goalCurrency, setGoalCurrency] = useState("");
  const [goalValue, setGoalValue] = useState(0);
  const [valuePerMonth, setValuePerMonth] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [goal, setGoal] = useState(null);

  // Lista de moedas
  const currencies = ["USD", "BRL", "EUR", "JPY", "KRW"];

  const currencySymbols = {
    USD: "$",
    BRL: "R$",
    EUR: "€",
    JPY: "¥",
    KRW: "₩",
  };
  
  useEffect(() => {
    handleGoal();
  }, []);

  const handleGoal = async () => {

    try {
      const storedUsername = localStorage.getItem("username");
      const userInfo = await getUserData(storedUsername);

      // Atualiza os estados com os dados do backend
      setUsername(userInfo.username);
      setSalary(userInfo.salary);
      setTotalSavings(userInfo.total_savings);
      setGoals(userInfo.goals); // Salva a lista de metas
      console.log("Deu tudo certo no handleGoal")
    } catch (error) {
      console.log("Deu erro no handleGoal")
      console.error("Erro ao carregar os dados:", error);
    }
  };

  // Função para criar uma nova meta
  const handleCreateGoal = async () => {
    try {
      const storedUsername = localStorage.getItem("username");
      console.log(`storedUsername: ${storedUsername}`);
      await createGoal(storedUsername, goalName, goalCurrency, goalValue, valuePerMonth);
      alert('Goal created successfully!');
      // Atualizar a lista de metas após a criação
      handleGoal();
    } catch (error) {
      alert('Failed to create goal: ' + error.message);
    }
  };

  // Função para deletar uma meta
  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteGoal(username, goalId);
      alert('Goal deleted successfully!');
      handleGoal(); // Atualiza a lista de metas após a exclusão
    } catch (error) {
      alert('Failed to delete goal: ' + error.message);
    }
  };

  const openEditModal = (field, value, goal = null) => {
    setEditField(field);
    setEditValue(value);
    console.log(`field: ${field}`)
    console.log(`value: ${value}`)
    console.log(`goal: ${goal}`)
    if (field === "Goal Value" || field === "Monthly Savings") {
      setGoal(goal);
    } else {
      setGoal(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (newValue) => {

    try {
      if (editField === "Salary") {
        await updateSalary(newValue);
        setSalary(newValue);
        alert("Salário atualizado com sucesso!");
      } 
      else if (editField === "Username") {
        await updateUsername(newValue);
        setUsername(newValue);
      } 
      else if ((editField === "Goal Value" || editField === "Monthly Savings") && goal) {
        const field = editField === "Goal Value" ? "goal_value" : "monthly_savings";
        await updateGoal(goal, field, newValue);
  
        // Atualizando estados corretamente
        if (editField === "Goal Value") setGoalValue(newValue);
        if (editField === "Monthly Savings") setValuePerMonth(newValue);
  
        alert('Goal updated successfully!');
      }

      setIsModalOpen(false);
      // Atualizar a lista de metas após a atualização
      handleGoal();
  
    } catch (error) {
      console.error(`Erro ao atualizar ${editField.toLowerCase()}: `, error);
      alert(`Failed to update ${editField.toLowerCase()}: ` + error.message);
    }
  };

  return (
    
    <div className="goals-container">
      {/* Efeito de neve */}
      <Snowfall />
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`New ${editField}`}
        initialValue={editValue}
        onSave={handleSave}
      />
      <div className="left-column">
        <div className="data-section">
          <h2>My Data</h2>
          <div className="user-info">
            <div className="user-detail">
              <div className="user-info-text">
                <FaUserCircle className="user-icon" />
                <p className="data-label">Username</p>
                <FiEdit className="edit-icon" onClick={() => openEditModal("Username", username)} />
              </div>
              <p className="data-value">{username}</p>
            </div>
            <div className="user-detail">
              <div className="user-info-text">
                <TbMoneybag className="money-icon" />
                <p className="data-label">Salary</p>
                <FiEdit className="edit-icon" onClick={() => openEditModal("Salary", salary)} />
              </div>
              <p className="data-value">
                R$ {parseFloat(salary).toFixed(2)}
              </p>
            </div>
            <div className="user-detail">
              <div className="user-info-text">
                <TbPigMoney className="savings-icon" />
                <p className="data-label">Total Savings</p>
              </div>
              <p className="data-value">
                R$ {parseFloat(totalSavings).toFixed(2)} / month
              </p>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Register a New Goal</h3>
          <p>Goal Name:</p>
          <input
            type="text"
            placeholder="That dress"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />
          <p>Currency:</p>
          <select
            value={goalCurrency}
            onChange={(e) => setGoalCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <p>Goal value:</p>
          <input
            type="number"
            placeholder="300.00"
            value={goalValue}
            onChange={(e) => setGoalValue(e.target.value)}
          />
          <p>Savings per Month:</p>
          <input
            type="number"
            placeholder="100.00"
            value={valuePerMonth}
            onChange={(e) => setValuePerMonth(e.target.value)}
          />
          <button onClick={handleCreateGoal}>Create Goal</button>
        </div>
      </div>

      <div className="right-column">
        <div className="goals-display">
          <h3>My Goals</h3>
          <div className="goals-cards">
            {goals.map((goal) => (
              <div className="goal-card" key={goal.id}>

                {/* Nome da meta! */}
                <div className="goal-header">
                  <h4>{goal.goal_name}</h4>
                  <FaTrash className="delete-icon" onClick={() => handleDeleteGoal(goal.id)} />
                </div>

                {/* Valor da meta na moeda original */}
                <div className="goal-details">
                  <p>
                    Original:&nbsp;
                    {currencySymbols[goal.goal_currency] || goal.goal_currency} 
                    {parseFloat(goal.goal_value).toFixed(2)}</p>
                    <FiEdit className="edit-icon" onClick={() => openEditModal("Goal Value", goal.goal_value, goal)}/>
                </div>

                {/* Valor convertido para BRL */}
                <div className="goal-details">
                  <p> 
                    Converted: R$ 
                    {parseFloat(goal.converted_value).toFixed(2)}
                  </p>
                </div>

                {/* Economia mensal */}
                <div className="goal-details">
                  <p>
                    R$ {parseFloat(goal.monthly_savings).toFixed(2)} / month
                  </p>
                  <FiEdit className="edit-icon" onClick={() => openEditModal("Monthly Savings", goal.monthly_savings, goal)}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
