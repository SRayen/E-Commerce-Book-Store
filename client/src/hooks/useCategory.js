import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory(){
       const [categories, setCategories] = useState([]);
       useEffect(() => {
    loadCategories()
       }, []);

       const loadCategories= async ()=>{
        try {
          const {data} = await axios.get('/categories')
          setCategories(data);
        } catch (error) {
            console.log(error)
        }
       }
       return categories
}
