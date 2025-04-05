import React, { useContext, useState, useEffect } from "react";
import { AuthContext, IAuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

export interface Course {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  progress: number;
  userId?: number;
}

const CourseList: React.FC = () => {
  const { user, authToken, logout } = useContext(AuthContext) as IAuthContext;
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>(
          `${global.API_ENDPOINT || "http://localhost:5000"}/courses`
        );
        const sortedCourses = response.data.sort(
          (a, b) => b.progress - a.progress
        );
        setCourses(sortedCourses);
      } catch (err) {
        setError("Erreur lors du chargement des cours");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading)
    return <p className="text-center text-gray-300 mt-8">Chargement...</p>;
  if (error) return <p className="text-center text-red-400 mt-8">{error}</p>;
  if (!authToken || !user) {
    return (
      <div className="max-w-2xl mx-auto mt-12 bg-gray-800 p-8 rounded-lg shadow-2xl">
        <p className="text-center text-red-400 mb-4">
          Vous devez être connecté pour voir les cours.
        </p>
        <Link
          to="/login"
          className="block text-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Se connecter
        </Link>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-16">
      <h2 className="text-4xl font-bold text-center text-white mb-8">
        Nos Cours
      </h2>
      {courses.length === 0 ? (
        <p className="text-center text-gray-300">
          Aucun cours disponible pour le moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              className="block p-6 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {course.title}
              </h3>
              <p className="text-gray-300">{course.description}</p>
              {course.videoUrl ? (
                <video
                  className="w-full h-64 object-cover rounded mt-4"
                  controls
                >
                  <source src={course.videoUrl} type="video/mp4" />
                  Votre navigateur ne supporte pas la balise vidéo.
                </video>
              ) : (
                <p className="text-red-400 mt-4">Vidéo non disponible</p>
              )}
              <p className="text-gray-400 mt-2">
                Progression: {course.progress}%
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
