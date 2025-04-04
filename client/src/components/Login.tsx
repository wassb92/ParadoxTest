// client/src/components/Login.tsx
import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext, IAuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { login } = useContext(AuthContext) as IAuthContext;
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      login(data.access_token, data.user);
      setMessage("Connexion réussie");
      navigate("/");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Échec de la connexion");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl transform transition hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-6">Connexion</h2>
        {message && <p className="mb-4 text-center text-red-400">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-800 to-blue-600 text-white font-bold rounded hover:from-blue-600 hover:to-purple-800 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
