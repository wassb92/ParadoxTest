import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext, IAuthContext } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import AdminCourses from "./components/AdminCourses";
import AdminRoute from "./components/AdminRoute";
import Subscribe from "./components/Subscribe";
import SubscriptionSuccess from "./components/SubscriptionSuccess";

const Navigation: React.FC = () => {
  const { user } = useContext(AuthContext) as IAuthContext;

  return (
    <div className="space-x-4">
      <a href="/" className="hover:text-gray-300 transition">
        Accueil
      </a>
      <a href="/courses" className="hover:text-gray-300 transition">
        Cours
      </a>
      {!user ? (
        <>
          <a href="/login" className="hover:text-gray-300 transition">
            Connexion
          </a>
          <a href="/register" className="hover:text-gray-300 transition">
            Inscription
          </a>
        </>
      ) : (
        <>
          <a href="/subscribe" className="hover:text-gray-300 transition">
            Abonnement
          </a>
          <a href="/profile" className="hover:text-gray-300 transition">
            Profil
          </a>
        </>
      )}
      {user && user.role === "admin" && (
        <Link to="/admin/courses" className="hover:text-gray-300 transition">
          Admin Cours
        </Link>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <AuthProvider>
        <Router>
          <nav className="bg-gradient-to-r from-purple-800 to-blue-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="text-3xl font-extrabold tracking-wide animate-pulse">
                Paradox
              </div>
              <Navigation />
            </div>
          </nav>
          <div className="flex-grow max-w-7xl mx-auto p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/admin/courses"
                element={
                  <AdminRoute>
                    <AdminCourses />
                  </AdminRoute>
                }
              />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route
                path="/subscription/success"
                element={<SubscriptionSuccess />}
              />
            </Routes>
          </div>
          <footer className="bg-gray-800 text-center py-4">
            <span>
              &copy; 2025 Fake Plateforme Paradox. Tous droits réservés.
            </span>
          </footer>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
