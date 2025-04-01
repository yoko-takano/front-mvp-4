import React, { useEffect, useState } from "react"; // useState para controle do áudio
import { FaSeedling } from "react-icons/fa6"; // Ícone de semente para registro
import { LuFlower } from "react-icons/lu"; // Ícone de flor para login
import Snowfall from 'react-snowfall'; // Importa o componente Snowfall
import { useNavigate } from 'react-router-dom'; // Hook para navegação
import { loginUser } from "../api/api_connection.js";
import "../styles/login-style.css"; // Seu arquivo de estilo CSS
import "../api/api_connection.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [audio, setAudio] = useState(null); // Armazena a referência do áudio
  const [audioPlayed, setAudioPlayed] = useState(false); // Controla se o áudio já foi tocado
  const navigate = useNavigate(); // Instanciando o useNavigate

  // Função para lidar com o login (sem validação)
  const handleLogin = async () => {

    setError(""); // Reseta o erro antes da requisição

    try {
      const data = await loginUser(username, password);
      console.log("Login bem-sucedido:", data);
      localStorage.setItem("username", username);

      // Redireciona para a página de metas
      navigate("/goals");
    } catch (error) {
      console.log("Erro ao fazer login:", error);
      setError(error.message);
    }

  };

  // Função para lidar com a reprodução do áudio após interação do usuário
  const playAudio = () => {
    if (audio && !audioPlayed) {
      audio.play().catch((err) => {
        console.error("Erro ao tentar reproduzir o áudio: ", err);
      });
      setAudioPlayed(true); // Marca o áudio como tocado
    }
  };

  // UseEffect para inicializar o áudio ao carregar o componente
  useEffect(() => {
    const newAudio = new Audio("./harvest_moon_spring.mp3");
    newAudio.loop = true;
    setAudio(newAudio); // Armazena a referência do áudio no estado

    // Limpa o áudio quando o componente for desmontado
    return () => {
      if (newAudio) {
        newAudio.pause(); // Pausa o áudio
        newAudio.currentTime = 0; // Reseta o áudio
      }
    };
  }, []); // O array vazio faz o efeito rodar apenas uma vez, quando o componente for montado

  // Adiciona um evento global de clique para reproduzir o áudio ao clicar na página
  useEffect(() => {
    const handleDocumentClick = () => {
      if (!audioPlayed) {
        playAudio();
      }
    };

    // Adiciona o evento de clique no documento
    document.addEventListener("click", handleDocumentClick);

    // Limpa o evento ao desmontar o componente
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [audioPlayed, audio]);

  return (
    <div className="login-container" style={{ position: 'relative' }}>
      {/* Adiciona o componente Snowfall para a neve */}
      <Snowfall />

      <div className="login-box">

        {/* Parte superior com imagem */}
        <div className="login-box-top">
          <img src="background.jpg" alt="Login Illustration" className="login-image" />
        </div>

        {/* Parte inferior com título, inputs e botões */}
        <div className="login-box-bottom">
          <h2>Welcome to <span className="highlighted-text">CoinCutie</span>!</h2>
          <p className="subheading">Login in to your account to continue</p>

          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={playAudio} // Reproduz o áudio quando o input de texto recebe o foco
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={playAudio} // Reproduz o áudio quando o input de senha recebe o foco
            />
          </div>

          <div className="button-group">
            {/* Botão de Login com ícone de flor */}
            <button className="login-button" onClick={handleLogin}>
              <LuFlower className="icon" /> Login
            </button>

            {/* Botão de Registro com ícone de semente */}
            <button className="signup-button">
              <FaSeedling className="icon" /> Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
