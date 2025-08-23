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
      className="category container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="category-title text-center mb-4 fw-bold">
        Estas son nuestras categorías
      </h2>

      <div className="row g-3 justify-content-center">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            className="col-6 col-sm-4 col-md-3 text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Button text={category.name} className="w-100" />
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .category-title {
          color: #333;
        }
        .category-item button {
          transition: all 0.3s;
        }
        .category-item button:hover {
          background-color: #06d7a0;
          color: #fff;
        }
      `}</style>
    </motion.div>
  );
}