import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext, IAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Subscribe: React.FC = () => {
  const { user, authToken, login } = useContext(AuthContext) as IAuthContext;
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubscribe = async (plan: "monthly" | "yearly") => {
    if (!user || !authToken) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${global.API_ENDPOINT}/stripe/checkout`,
        { plan, userId: user.id },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      const sessionId = response.data.sessionId;
      const stripe = await loadStripe(
        "pk_test_51RAaUvKsRGYDWNO8ZzFso54OrVyyxV8aaGIANR3EO3RRHgkbmaD90Gc1cQBLVoFnjiFQj36M8axJ042XGzVv7oKR0008rBXRLI"
      );
      if (!stripe) {
        throw new Error("Stripe failed to initialize.");
      }
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error("Erreur lors de la redirection vers Stripe:", error);
      }
    } catch (err) {
      console.error(
        "Erreur lors de la création de la session de paiement",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!user || !authToken) return;
    setLoading(true);
    try {
      await axios.post(
        `${global.API_ENDPOINT}/stripe/unsubscribe`,
        { userId: user.id },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      const updatedUser = {
        ...user,
        subscriptionType: null,
        stripeSubscriptionId: null,
      };
      login(authToken, updatedUser);
      navigate("/profile");
    } catch (error) {
      console.error("Erreur lors de la désinscription", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-lg text-center">
      {!user.subscriptionType ? (
        <>
          <h2 className="text-3xl font-bold text-white mb-4">
            Choisissez votre abonnement
          </h2>
          <div className="space-y-4">
            <button
              onClick={() => handleSubscribe("monthly")}
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
            >
              Abonnement Mensuel - 9,99€
            </button>
            <button
              onClick={() => handleSubscribe("yearly")}
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition"
            >
              Abonnement Annuel - 99,99€
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-white mb-4">
            Vous êtes abonné(e) ({user.subscriptionType})
          </h2>
          <p className="text-gray-300 mb-4">
            Si vous souhaitez vous désabonner, cliquez sur le bouton ci-dessous.
          </p>
          <button
            onClick={handleUnsubscribe}
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
          >
            Se désabonner
          </button>
        </>
      )}
    </div>
  );
};

export default Subscribe;
