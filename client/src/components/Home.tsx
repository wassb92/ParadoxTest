// client/src/components/Home.tsx
import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const videoIds: string[] = [
  "6yjNy_V3Yn0",
  "nqFwn4_pZSU",
  "2i6fxPbdyVE",
  "fF3E8tnlvOk",
  "_CM6JvY_aQ0",
  "ORbwb0Y-KKg",
  "zaYqHyuJ_0w",
  "cNzls4rrkrs",
];

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 4000,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  pauseOnHover: true,
  pauseOnFocus: false,
  pauseOnTouch: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const heroVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <motion.section
        className="pt-16 text-center"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <motion.h1
          className="text-5xl font-extrabold text-white mb-4"
          variants={heroVariants}
        >
          Bienvenue sur Paradox Coaching
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 mb-8"
          variants={heroVariants}
          transition={{ delay: 0.2 }}
        >
          Découvrez des formations inspirantes pour transformer votre vie.
        </motion.p>
      </motion.section>

      {/* Video Carousel Section */}
      <motion.section
        className="py-16"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <motion.h2
          className="text-4xl text-center font-bold text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Les vidéos de David
        </motion.h2>
        <div className="container mx-auto">
          <Slider {...sliderSettings}>
            {videoIds.map((id, index) => (
              <div key={index} className="px-4">
                <motion.div
                  className="rounded-lg shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <iframe
                    className="w-full h-64"
                    src={`https://www.youtube.com/embed/${id}`}
                    title={`Vidéo ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.section>

      {/* Additional Content Section */}
      <motion.section
        className="py-8 bg-gray-900 bg-opacity-75"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto text-center">
          <motion.h3
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Pourquoi Paradox Coaching ?
          </motion.h3>
          <motion.p
            className="text-lg text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Nous combinons l'expertise en développement personnel et la
            technologie pour vous offrir des formations de qualité, adaptées à
            vos besoins.
          </motion.p>
          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Découvrez un parcours personnalisé qui vous aidera à atteindre vos
            objectifs et à transformer votre vie.
          </motion.p>
          <motion.button
            className="mt-16 bg-gradient-to-r from-purple-800 to-blue-600 text-white font-bold py-3 px-6 rounded-full"
            variants={buttonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            Rejoignez-nous
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
