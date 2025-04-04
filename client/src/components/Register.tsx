import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      setMessage("Inscription réussie");
      navigate("/login");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Échec de l'inscription");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl transform transition hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-6">Inscription</h2>
        {message && <p className="mb-4 text-center text-red-400">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Prénom</label>
            <input
              type="text"
              value={firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Nom</label>
            <input
              type="text"
              value={lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>
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
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
