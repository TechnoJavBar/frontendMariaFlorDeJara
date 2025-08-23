import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {Button} from './button';
import { BiSolidHomeSmile } from "react-icons/bi";
import "./welcomeDiv.css"

export function WelcomeDiv() {
  return (
    <motion.div
      className="welcome enhanced-welcome d-flex flex-column justify-content-center align-items-center text-center py-5 px-3 px-lg-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1 className="display-5 fw-bold mb-3">
        ¡Bienvenido a <span className="brand">MariaFlorDeJara</span>!
      </h1>
      <p className="lead mb-4">
        <BiSolidHomeSmile className="me-2" /> Descubre productos únicos, llenos de color y buena vibra. <BiSolidHomeSmile className="ms-2" />
      </p>
      <Link to="/products">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button text="Ver Productos" />
        </motion.div>
      </Link>

      <style jsx>{`
        .brand {
          color: #000000ff;
        }
        @media (max-width: 576px) {
          .welcome h1 {
            font-size: 1.8rem;
          }
          .welcome p {
            font-size: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
}