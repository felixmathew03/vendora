import React, { useState,useEffect} from 'react';
import route from '../route';
import axios from 'axios';
import './Sidebar.scss'
import { FaSearch } from 'react-icons/fa';

const Sidebar = ({setProducts}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const[sideProducts,setSideProducts]=useState([])
  const [categories,setCategories] = useState([]);
  const value=localStorage.getItem("Auth");
  useEffect(()=>{
    getDetails();
  },[])
  const getDetails=async()=>{
    try {
      if(value!==null){
      const {data,status}=await axios.get(`${route()}home`,{headers:{"Authorization":`Bearer ${value}`}})
      if (status==200) {
        setSideProducts(data.products);
        setCategories(data.categories);
      }else if(res.status==403){
        setLoggedIn(!loggedIn);
      }
    }}
     catch (error) {
      console.log("error");
    }
  }
  // Handle search input change
  const handleSearchChange = async(e) => {
    setSearchTerm(e.target.value);
    try {
      setProducts([])
        sideProducts.filter((i)=>i.pname.toLowerCase().includes(e.target.value.toLowerCase())&&i.category.toLowerCase().includes(selectedCategory.toLowerCase())).map((product)=>{
          setProducts((pre)=>[...pre,product])
        })

    } catch (error) {
        console.log(error);
    }
  };

  // Handle category selection change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    try {
      setProducts([])
        sideProducts.filter((i)=>i.category.toLowerCase().includes(e.target.value.toLowerCase())&&i.pname.toLowerCase().includes(searchTerm.toLowerCase())).map((product)=>{
          setProducts((pre)=>[...pre,product])
        })

    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div className="Sidebar">
      <div className="group">
        <FaSearch className="icon" />
        <input className="input" type="search" 
          id="search"
          value={searchTerm}
          onChange={handleSearchChange} placeholder="Search" />
      </div>

      <div className="category-filter">
        <label htmlFor="categories">Category:</label>
        <select
          id="categories"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option  value="">
            All
          </option>
          {categories.map((cat,ind)=>(
            <option key={ind} value={cat}>
            {cat.category.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
