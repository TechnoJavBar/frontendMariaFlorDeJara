import { motion } from "framer-motion";
import "./emptyProducts.css";

export default function EmptyProducts() {
  return (
    <div className="lotus-container">
      {/* Flor de loto */}
      <motion.div
        className="lotus-wrapper"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        <div className="lotus">
          {/* Pétalos de abajo*/}
          <motion.div
            className="petals-back"
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: -90, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.1 }}
          />
          <motion.div
            className="petals-back"
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: 90, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.1 }}
          />
          {/* Pétalos de atras*/}
          <motion.div
            className="petals-back"
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: -30, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.1 }}
          />
          <motion.div
            className="petals-back"
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: 30, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.1 }}
          />
          {/* Pétalos de del medio */}
          <motion.div
            className="petals-middle"
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: -60, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.div
            className="petals-middle"
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: 60, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          {/* Pétalos del centro de la flor*/}
          <motion.div
            className="petals-front"
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: 0, scale: 1.1, y: 10 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          />

          {/* Centro */}
          <motion.div
            className="lotus-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1, y: 90 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </div>

        {/* Sombra */}
        <motion.div
          className="lotus-shadow"
          animate={{ scale: [1, 0.85, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <h2>¡No hay productos!</h2>
      <p>Pero esta flor de loto florece mientras exploras 🌸</p>
      <motion.button
        className="button-explore"
        whileHover={{
          scale: 1.1,
          boxShadow: "4px 4px 10px rgba(163, 55, 73, 1)",
          transition: { duration: 0.2 },
        }}
      >
        Explorar categorías
      </motion.button>
    </div>
  );
}
