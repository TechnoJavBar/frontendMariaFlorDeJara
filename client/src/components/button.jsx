import './button.css'
import {motion} from 'framer-motion'

export function Button({ text }) {
    return (
        <motion.button 
        className="btn"
        whileHover={{ 
            scale: 1.1,
            backgroundColor: '#0056b3', 
        }}
        >{text}</motion.button>
    )
}