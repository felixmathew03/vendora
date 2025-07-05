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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;
  useEffect(()=>{
    console.log("sdfsd");
    
    getDetails();
  },[page])
  const getDetails=async()=>{
    try {
      if(value!==null){
      const {data,status}=await axios.get(`${route()}categories`,{ params: { page, limit } })
      if (status==200) {
        setSideProducts(data.products);
        const maxPrice = Math.max(...data.products.map(product => product.price));
        setPrice(maxPrice+100)
        setCategories(data.categories)
        setTotalPages(data.totalPages);
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
    setSelectedCategory(e);
    try {
      setProducts([])
        sideProducts.filter((i)=>i.category.includes(e)&&i.pname.toLowerCase().includes(searchTerm.toLowerCase())&&i.price<=maxPrice).map((product)=>{
          setProducts((pre)=>[...pre,product])
        })

    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div className="Sidebar" id='sidebar-container'>
    
      <div className="group" >
        <FaSearch className="icon" />
        <input className="input" type="search" 
          id="search"
          value={searchTerm}
          onChange={handleSearchChange} placeholder="Search" />
      </div>
    <div className="category-filter">
        <div className='categories'>
            {page==1&&<button  value="" className={selectedCategory==""&&"selectedCategory"} onClick={()=>{handleCategoryChange("")}}>
            All
          </button>}
          {categories.map((cat,ind)=>(
            <button key={ind} value={cat.category} className={selectedCategory==cat.category&&"selectedCategory"} title={cat.category}  onClick={()=>{handleCategoryChange(cat.category)}}>
            {cat.category.toUpperCase()}
          </button>
          ))}
        </div>
      {/* Category Pagination Controls */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>  
      <div className="price-filter">
        <p id="rangeValue">{"Price: Under $"+maxPrice}</p>
        <div className="range-container">
  <input
    type="range"
    id="rangeInput"
    name="range"
    min="0"
    max="10000"
    value={maxPrice}
    step="5"
    onChange={handlePriceChange}
  />
</div>
      </div>
    </div>
  );
};

export default Sidebar;
