import { useState, useEffect } from "react";
import { getAllCategory } from "../api/categories.api";
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
        <div className="category">
            <h1>Estas son nuestras categorias</h1>
            <div className='category-index'>
                {/* Category index content goes here */}
                
                {categories.map(category => (
                    <div key={category.id} className='category-item'>
                        <Button text={category.name}/>
                    </div>
                ))}
            </div>
        </div>
    );
}