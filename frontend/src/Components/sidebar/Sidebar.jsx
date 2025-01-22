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
  const [maxPrice,setPrice]=useState(10000);
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
        sideProducts.filter((i)=>i.pname.toLowerCase().includes(e.target.value.toLowerCase())&&i.category.toLowerCase().includes(selectedCategory.toLowerCase())&&i.price<=maxPrice).map((product)=>{
          setProducts((pre)=>[...pre,product])
        })

    } catch (error) {
        console.log(error);
    }
  };
  const handlePriceChange = async(e) => {
    setPrice(parseInt(e.target.value,10));
    try {
      setProducts([])
        sideProducts.filter((i)=>i.price<=maxPrice&&i.category.toLowerCase().includes(selectedCategory.toLowerCase())&&i.pname.toLowerCase().includes(searchTerm.toLowerCase())).map((product)=>{
          setProducts((pre)=>[...pre,product])
        })

    } catch (error) {
        console.log(error);
    }
  };
  
  // Handle category selection change
  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    
    setSelectedCategory(e.target.value);
    try {
      setProducts([])
        sideProducts.filter((i)=>i.category.toLowerCase().includes(e.target.value.toLowerCase())&&i.pname.toLowerCase().includes(searchTerm.toLowerCase())&&i.price<=maxPrice).map((product)=>{
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
            <option key={ind} value={cat.category}>
            {cat.category.toUpperCase()}
          </option>
          ))}
        </select>
        
      </div>
      <div className="price-filter">
      <label for="rangeInput">Price Filter:</label>
      <p id="rangeValue">Under:- ${maxPrice}</p>
      <input type="range" id="rangeInput" name="range" min="0" max="10000" step="5"  onChange={handlePriceChange} />
      </div>
    </div>
  );
};

export default Sidebar;
