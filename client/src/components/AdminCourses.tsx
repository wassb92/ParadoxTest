import React, {
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  FormEvent,
} from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export interface Course {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  progress: number;
  userId?: number;
}

interface NewCourse {
  title: string;
  description: string;
  videoUrl: string;
}

const AdminCourses: React.FC = () => {
  const { authToken, user } = useContext(AuthContext);
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<NewCourse>({
    title: "",
    description: "",
    videoUrl: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get<Course[]>(
        "http://localhost:5000/courses"
      );
      setCourses(data);
    } catch (err) {
      setError("Erreur lors du chargement des cours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setNewCourse({ ...newCourse, videoUrl: fileUrl });
    }
  };

  const handleCreateCourse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        ...newCourse,
        userId: user?.id,
      };
      const { data } = await axios.post<Course>(
        "http://localhost:5000/courses",
        payload,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setCourses([...courses, data]);
      setNewCourse({ title: "", description: "", videoUrl: "" });
    } catch (err) {
      setError("Erreur lors de la création du cours");
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    try {
      await axios.delete(`http://localhost:5000/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (err) {
      setError("Erreur lors de la suppression du cours");
    }
  };

  if (!authToken || user?.role !== "admin") {
    return (
      <div className="max-w-4xl mx-auto mt-12">
        <p className="text-center text-red-400">
          Accès réservé aux administrateurs.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        Gestion des Cours (Admin)
      </h2>

      {error && <p className="text-center text-red-400 mb-4">{error}</p>}

      <motion.form
        onSubmit={handleCreateCourse}
        className="bg-gray-800 p-6 rounded-lg shadow mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-white">
          Ajouter un nouveau cours
        </h3>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Titre</label>
          <input
            type="text"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 transition"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Description</label>
          <textarea
            name="description"
            value={newCourse.description}
            onChange={handleInputChange}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 transition"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">
            URL de la vidéo (ou sélectionnez un fichier local)
          </label>
          <input
            type="url"
            name="videoUrl"
            value={newCourse.videoUrl}
            onChange={handleInputChange}
            placeholder="https://exemple.com/video.mp4"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 transition mb-2"
          />
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="text-gray-300"
          />
          {newCourse.videoUrl && (
            <p className="text-gray-400 text-sm mt-1">
              Aperçu de l'URL de la vidéo : {newCourse.videoUrl}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-800 to-blue-600 text-white font-bold rounded hover:from-blue-600 hover:to-purple-800 transition"
        >
          Créer le cours
        </button>
      </motion.form>

      <h3 className="text-2xl font-bold mb-4 text-white">Liste des cours</h3>
      {loading ? (
        <p className="text-center text-gray-300">Chargement...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-300">Aucun cours disponible.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li
              key={course.id}
              className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h4 className="text-xl font-bold text-white">{course.title}</h4>
                <p className="text-gray-400">{course.description}</p>
              </div>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="ml-4 bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminCourses;
