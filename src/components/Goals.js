import React, { useState, useEffect } from 'react'
import '../goals-style.css'; // Styles specific to the Goals screen
import Snowfall from 'react-snowfall'; // Import the Snowfall component
import { FaUserCircle } from "react-icons/fa";
import { TbMoneybag, TbPigMoney } from "react-icons/tb";

const Goals = () => {
  const [goalName, setGoalName] = useState('')
  const [goalCurrency, setGoalCurrency] = useState('BRL')
  const [goalValue, setGoalValue] = useState('')
  const [valuePerMonth, setValuePerMonth] = useState('')
  const [goals, setGoals] = useState([])
  const [salary, setSalary] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Fetching data from the JSON file
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        const userData = data.users[0] // Accessing the first user for simulation purposes
        setUsername(userData.username)
        setSalary(userData.salary)
        setGoals(userData.goals)
      })
      .catch((error) => {
        console.error('Error loading data:', error)
      })
  }, [])

  // Function to add a Goal
  const addGoal = () => {
    if (goalName && goalValue && valuePerMonth) {
      const newGoal = {
        goal_currency: goalCurrency,
        goal_name: goalName,
        goal_value: goalValue,
        value_per_month: valuePerMonth,
      }
      setGoals([...goals, newGoal])
      // Clear the form
      setGoalName('')
      setGoalValue('')
      setValuePerMonth('')
    }
  }

  return (
    <div className="goals-container">
      {/* Adds the Snowfall component for a snowfall effect */}
      <Snowfall />
      <div className="left-column">
      <div className="data-section">

        <h2>My Data</h2>
        <div className="user-info">
          <div className="user-detail">
            <div className="user-info-text">
              <FaUserCircle className="user-icon" />
              <p className="data-label">Username</p>
            </div>
            <p className="data-value">{username}</p>
          </div>
          <div className="user-detail">
            <div className="user-info-text">
              <TbMoneybag className="money-icon" />
              <p className="data-label">Salary</p>
            </div>
            <p className="data-value">R$ {salary}</p>
          </div>
          <div className="user-detail">
            <div className="user-info-text">
              <TbPigMoney className="savings-icon" />
              <p className="data-label">Total Savings</p>
            </div>
            <p className="data-value">R$ 1000</p>
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
          <input
            type="text"
            placeholder="BRL"
            value={goalCurrency}
            onChange={(e) => setGoalCurrency(e.target.value)}
          />
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
          <button onClick={addGoal}>Add Goal</button>
        </div>
      </div>

      <div className="right-column">
        <div className="goals-display">
          <h3>My Goals</h3>
          <div className="goals-cards">
            {goals.map((goal, index) => (
              <div className="goal-card" key={index}>
                <h4>{goal.goal_name}</h4>
                <p>
                  {goal.goal_currency} {goal.goal_value}
                </p>
                <p>{goal.value_per_month} per month</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Goals
