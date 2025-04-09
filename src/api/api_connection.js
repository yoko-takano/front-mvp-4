const API_URL = "http://localhost:5001"; // URL da API

export const loginUser = async (username, password) => {

  try {
    // Primeiro, verifica se o usuário já existe
    const userResponse = await fetch(`${API_URL}/users/${username}`);

    if (userResponse.ok) {
      // Se o usuário já existe, apenas retorna os dados dele
      return await userResponse.json();
    }

    // Se o usuário não existe (404), tenta criar um novo usuário
    if (userResponse.status === 404) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const createUserResponse = await fetch(`${API_URL}/users`, {
        method: "POST",
        body: formData,
      });

      if (!createUserResponse.ok) {
        const errorData = await createUserResponse.json();
        throw new Error(errorData.message || "Erro ao criar usuário");
      }

      return await createUserResponse.json();
    }

    throw new Error("Erro ao verificar usuário");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserData = async (username) => {
  try {
    const response = await fetch(`${API_URL}/users/${username}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar dados do usuário");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

export const createGoal = async (username, goalName, goalCurrency, goalValue, valuePerMonth) => {
  try {
    // Criando o FormData para enviar os dados corretamente no formato multipart/form-data
    const formData = new FormData();
    formData.append('goal_currency', goalCurrency); // moeda do objetivo
    formData.append('goal_name', goalName); // nome do objetivo
    formData.append('goal_value', goalValue); // valor do objetivo
    formData.append('monthly_savings', valuePerMonth); // valor por mês de poupança

    // Enviando a requisição POST para atualizar o objetivo
    const response = await fetch(`${API_URL}/users/${username}/goal`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData, // Envia o FormData no corpo da requisição
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao atualizar o objetivo');
    }

    return await response.json(); // Retorna a resposta do servidor
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

export const updateUsername = async (newUsername) => {
  try {

    const username = localStorage.getItem("username");
    const formData = new FormData();
    formData.append("new_username", newUsername);

    const response = await fetch(`${API_URL}/users/${username}/username`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar username");
    }

    localStorage.setItem("username", newValue);
    return await response.json();

  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

export const updateSalary = async (newSalary) => {
  try {

    const username = localStorage.getItem("username");
    const formData = new FormData();
    formData.append("new_salary", newSalary);

    const response = await fetch(`${API_URL}/users/${username}/salary`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar salário");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

export const deleteGoal = async (username, goalId) => {
  try {
    const response = await fetch(`${API_URL}/users/${username}/goal/${goalId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao excluir meta");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao excluir meta:", error);
    throw error;
  }
};

export const updateGoal = async (goal, updatedField, newValue) => {
  try {
    const storedUsername = localStorage.getItem("username");
    const formData = new FormData();
    formData.append('goal_currency', goal.goal_currency);
    formData.append('goal_name', goal.goal_name);
    formData.append('goal_value', updatedField === "goal_value" ? newValue : goal.goal_value);
    formData.append('monthly_savings', updatedField === "monthly_savings" ? newValue : goal.monthly_savings);
    console.log(`${goal.id}`)
    console.log(`${API_URL}/users/${storedUsername}/goal/${goal.id}`)
    const response = await fetch(`${API_URL}/users/${storedUsername}/goal/${goal.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao atualizar o objetivo');
    }

  } catch (error) {
    alert('Failed to update goal: ' + error.message);
  }
};
