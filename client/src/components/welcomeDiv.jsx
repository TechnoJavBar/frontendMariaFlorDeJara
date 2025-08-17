import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {Button} from './button';
import { BiSolidHomeSmile } from "react-icons/bi";
import "./welcomeDiv.css"

export function WelcomeDiv() {
    return (
        <motion.div
      className="welcome enhanced-welcome"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <h1>
        ¡Bienvenido a <span className="brand">MariaFlorDeJara</span>!
      </h1>
      <p><BiSolidHomeSmile/> Descubre productos únicos, llenos de color y buena vibra. <BiSolidHomeSmile/></p>
      <Link to="/products">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button text="Ver Productos" />
        </motion.div>
      </Link>
    </motion.div>
    )
}