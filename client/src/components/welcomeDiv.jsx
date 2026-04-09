import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BiSolidHomeSmile } from "react-icons/bi";
import "./welcomeDiv.css";

export function WelcomeDiv() {
  return (
    <motion.div
        className="glass-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="welcome-title">
          Bienvenido a <span className="brand">MariaFlorDeJara</span>
        </h1>
        
        <p className="welcome-text">
          <BiSolidHomeSmile className="icon" /> 
          Descubre productos únicos, llenos de color y buena vibra. 
          <BiSolidHomeSmile className="icon" />
        </p>

        <Link to="/products" className="welcome-link">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className='button-welcomeDiv'>Ver productos</button>
          </motion.div>
        </Link>
      </motion.div>
  );
}
