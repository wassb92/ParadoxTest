import React, { useContext, useState, useEffect } from "react";
import { AuthContext, IAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Profile: React.FC = () => {
  const { user, authToken, logout } = useContext(AuthContext) as IAuthContext;
  const [courseNames, setCourseNames] = useState<string[]>([]);
  const [loadingCourses, setLoadingCourses] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseNames = async () => {
      if (user && user.enrolledCourses && user.enrolledCourses.length > 0) {
        setLoadingCourses(true);
        try {
          const responses = await Promise.all(
            user.enrolledCourses.map((courseId: number) =>
              axios.get<{ title: string }>(
                `${global.API_ENDPOINT}/courses/${courseId}`
              )
            )
          );
          const names = responses.map((res) => res.data.title);
          setCourseNames(names);
        } catch (error) {
          console.error("Erreur lors du chargement des noms de cours", error);
        } finally {
          setLoadingCourses(false);
        }
      } else {
        setCourseNames([]);
      }
    };

    fetchCourseNames();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const confirmDeleteProfile = async () => {
    if (!user) return;
    try {
      await axios.delete(`${global.API_ENDPOINT}/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      localStorage.removeItem("authToken");
      logout();
      navigate("/register");
    } catch (error) {
      console.error("Erreur lors de la suppression du profil", error);
    }
  };

  if (!authToken || !user) {
    return (
      <div className="max-w-2xl mx-auto mt-12 bg-gray-800 p-8 rounded-lg shadow-2xl">
        <p className="text-center text-red-400 mb-4">
          Vous n'êtes pas connecté. Veuillez vous connecter pour voir votre
          profil.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/login")}
            className="py-2 px-4 bg-gradient-to-r from-purple-800 to-blue-600 text-white font-bold rounded hover:from-blue-600 hover:to-purple-800 transition"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-12 bg-gray-800 p-8 rounded-lg shadow-2xl relative text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold text-center mb-8">Mon Profil</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Informations personnelles</h3>
          <p>
            <span className="font-semibold">Prénom :</span> {user.firstName}
          </p>
          <p>
            <span className="font-semibold">Nom :</span> {user.lastName}
          </p>
          <p>
            <span className="font-semibold">Email :</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Rôle :</span> {user.role}
          </p>
          <p>
            <span className="font-semibold">Abonnement :</span>{" "}
            {user.subscriptionType ? (
              <span className="px-2 py-1 bg-green-500 text-white rounded">
                Abonné ({user.subscriptionType})
              </span>
            ) : (
              <span className="px-2 py-1 bg-red-500 text-white rounded">
                Non abonné
              </span>
            )}
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Statistiques</h3>
          <p>
            <span className="font-semibold">Progression Moyenne :</span>{" "}
            {user.progress}%
          </p>
          <p>
            <span className="font-semibold">Cours suivis :</span>{" "}
            {loadingCourses ? (
              <span>Chargement...</span>
            ) : courseNames.length > 0 ? (
              courseNames.join(", ")
            ) : (
              "Aucun"
            )}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-white mb-4">Ma Progression</h3>
        <p className="text-gray-300 mb-2">
          Vous avez complété {user.progress}% de votre formation.
        </p>
        <div className="w-full bg-gray-700 rounded-full h-6">
          <motion.div
            className="bg-blue-600 h-6 rounded-full"
            style={{ width: `${user.progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${user.progress}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handleLogout}
          className="py-2 px-6 bg-gradient-to-r from-blue-600 to-purple-800 text-white font-bold rounded hover:from-purple-800 hover:to-blue-600 transition"
        >
          Déconnexion
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="py-2 px-6 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
        >
          Supprimer le profil
        </button>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-white mb-4">Activité récente</h3>
        <p className="text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          consectetur, nisl nec bibendum tincidunt, nunc nisl aliquam nunc,
          vitae aliquam nunc nisl nec bibendum tincidunt, nunc nisl aliquam
          nunc.
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-gray-900 rounded-lg shadow-lg p-8 z-10 max-w-xl w-full">
            <div className="flex flex-col items-center">
              <span className="text-6xl mb-4">😢</span>
              <h3 className="text-xl font-bold mb-2 text-center">
                Tu vas nous manquer...
              </h3>
              <p className="text-center mb-6">
                Es-tu sûr de vouloir supprimer ton profil ? Cette action est
                irréversible.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="py-2 px-4 bg-gray-600 text-white font-bold rounded hover:bg-gray-500 transition"
                >
                  Bon ok, je reste
                </button>
                <button
                  onClick={confirmDeleteProfile}
                  className="py-2 px-4 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
                >
                  Vous allez me manquer aussi 😢
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
