import './button.css'
import {motion} from 'framer-motion'

export function Button({ text }) {
    return (
        <motion.button 
        className="btn"
        whileHover={{ 
            scale: 1.1,
            backgroundColor: "#216869",
            color: "white",
            transition: { duration: 0.5 }
        }}
        >{text}</motion.button>
    )
}