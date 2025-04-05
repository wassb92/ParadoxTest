import React, { useContext, useState, useEffect } from "react";
import { AuthContext, IAuthContext } from "../context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SubscriptionSuccess: React.FC = () => {
  const { user } = useContext(AuthContext) as IAuthContext;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>(
    "Nous mettons à jour votre abonnement..."
  );
  const [redirectCountdown, setRedirectCountdown] = useState<number>(10);

  useEffect(() => {
    if (user && user.stripeSubscriptionId) return;

    const sessionId = searchParams.get("session_id");
    const userId = searchParams.get("userId");

    if (sessionId && userId) {
      const updateSubscription = async () => {
        try {
          const token = localStorage.getItem("authToken");
          await axios.post(
            `${global.API_ENDPOINT}/stripe/subscription-update`,
            { sessionId, userId: Number(userId) },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setMessage("Votre abonnement a été mis à jour avec succès !");
        } catch (error) {
          console.error("Erreur lors de la mise à jour de l'abonnement", error);
          setMessage(
            "Une erreur est survenue lors de la mise à jour de votre abonnement."
          );
        }
      };
      updateSubscription();
    }
  }, [searchParams, user]);

  useEffect(() => {
    if (message === "Votre abonnement a été mis à jour avec succès !") {
      const intervalId = setInterval(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
      const timeoutId = setTimeout(() => {
        window.location.href = "/profile";
      }, 10000);
      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [message, navigate]);

  return (
    <div className="max-w-md mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold text-white">Abonnement validé</h1>
      <p className="text-gray-300 mt-4">{message}</p>
      {message === "Votre abonnement a été mis à jour avec succès !" && (
        <p className="text-gray-300 mt-2">
          Redirection dans {redirectCountdown} secondes...
        </p>
      )}
    </div>
  );
};

export default SubscriptionSuccess;
