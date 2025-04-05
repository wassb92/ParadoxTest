import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

interface Course {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  progress: number;
  userId?: number;
}

interface RouteParams {
  [key: string]: string | undefined;
  id: string;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [course, setCourse] = useState<Course | null>(null);
  const [localProgress, setLocalProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get<Course>(
          `${global.API_ENDPOINT || "http://localhost:5000"}/courses/${id}`
        );
        setCourse(response.data);
        setLocalProgress(response.data.progress);
      } catch (err) {
        setError("Erreur lors du chargement du cours");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleTimeUpdate = async (
    e: SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const target = e.target as HTMLVideoElement;
    const currentTime = target.currentTime;
    const duration = target.duration;
    const progress = duration ? Math.round((currentTime / duration) * 100) : 0;
    setLocalProgress(progress);
    await axios.put(
      `${global.API_ENDPOINT || "http://localhost:5000"}/courses/${id}`,
      { progress }
    );
  };

  const handleProgressIncrease = async () => {
    const newProgress = localProgress + 10 > 100 ? 100 : localProgress + 10;
    await axios.put(
      `${global.API_ENDPOINT || "http://localhost:5000"}/courses/${id}`,
      {
        progress: newProgress,
      }
    );
    setLocalProgress(newProgress);
  };

  const handleProgressDecrease = async () => {
    const newProgress = localProgress - 10 < 0 ? 0 : localProgress - 10;
    await axios.put(
      `${global.API_ENDPOINT || "http://localhost:5000"}/courses/${id}`,
      {
        progress: newProgress,
      }
    );
    setLocalProgress(newProgress);
  };

  if (loading)
    return <p className="text-center text-gray-300 mt-8">Chargement...</p>;
  if (error) return <p className="text-center text-red-400 mt-8">{error}</p>;

  return (
    <div className="container mx-auto py-16">
      <motion.h2
        className="text-4xl font-bold text-center text-white mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {course?.title}
      </motion.h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-gray-300 mb-4">{course?.description}</p>
        <div className="mb-4">
          <video
            className="w-full h-64 object-cover rounded"
            controls
            onTimeUpdate={handleTimeUpdate}
          >
            <source src={course?.videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        </div>
        <div className="mb-4">
          <h4 className="text-white font-bold mb-2">Progression :</h4>
          <div className="w-full bg-gray-700 rounded-full h-6">
            <motion.div
              className="bg-blue-600 h-6 rounded-full"
              style={{ width: `${localProgress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${localProgress}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
          <p className="text-gray-300 mt-2">{localProgress}% complété</p>
        </div>
        <div className="flex space-x-4">
          <motion.button
            className="mt-4 bg-gradient-to-r from-purple-800 to-blue-600 text-white font-bold py-2 px-4 rounded hover:from-blue-600 hover:to-purple-800 transition"
            whileHover={{ scale: 1.05 }}
            onClick={handleProgressIncrease}
          >
            Marquer comme avancé (+10%)
          </motion.button>
          <motion.button
            className="mt-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-2 px-4 rounded hover:from-red-700 hover:to-red-900 transition"
            whileHover={{ scale: 1.05 }}
            onClick={handleProgressDecrease}
          >
            Annuler l'avancement (-10%)
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
