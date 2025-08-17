import { useState, useEffect } from "react";
import { getAllCategory } from "../api/categories.api";
import { motion } from 'framer-motion';
import {Button} from "./button";
import "./categoryIndex.css";

export function CategoryIndex() {

    const [categories, setCategories] = useState([]);

    useEffect(() =>{

         async function getCategories(){
            const res = await getAllCategory();
            setCategories(res.data);
        }

        getCategories();
    },[]);
    return (
        <motion.div
      className="category"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 1 }}
    >
      <h1 className="category-title">Estas son nuestras categorías</h1>
      <div className="category-index">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            className="category-item"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Button text={category.name} />
          </motion.div>
        ))}
      </div>
    </motion.div>
    );
}