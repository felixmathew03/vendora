import React, { useState,useEffect} from 'react';
import route from '../route';
import axios from 'axios';
import './Sidebar.scss'
import { FaSearch } from 'react-icons/fa';

const Sidebar = ({setProducts}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sideProducts,setSideProducts]=useState([])
  const [categories,setCategories] = useState([]);
  const [maxPrice,setPrice]=useState(10000);

  const value=localStorage.getItem("Auth");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 4;

  useEffect(()=>{
    getDetails();
  },[page])


  // Pagination Numbers Logic
  const getPaginationNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) pages.push("...");

    return pages;
  };


  // Dummy fallback
  const getDummyData = async () => {
    try {

      const res = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${(page-1)*limit}`
      );

      if(res.status === 200){

        const formattedProducts = res.data.products.map(product => ({
          _id: product.id,
          pname: product.title,
          price: product.price,
          category: product.category,
          pimages: [product.thumbnail]
        }));

        setSideProducts(formattedProducts)
        setProducts(formattedProducts)

        // unique categories
        const uniqueCategories = [
          ...new Set(res.data.products.map(p => p.category))
        ].map(cat => ({category:cat}));

        setCategories(uniqueCategories)

        const max = Math.max(...formattedProducts.map(p => p.price));
        setPrice(max + 100)

        setTotalPages(Math.ceil(res.data.total / limit))

      }

    } catch (error) {
      console.log("Dummy fallback failed", error);
    }
  };


  const getDetails=async()=>{
    try {

      if(value!==null){

        const {data,status}=await axios.get(`${route()}categories`,{
          params: { page, limit }
        })

        if (status===200) {

          if(data.products?.length > 0){

            setSideProducts(data.products);
            setProducts(data.products);

            const maxPrice = Math.max(...data.products.map(product => product.price));
            setPrice(maxPrice+100)

            // unique categories
            const uniqueCategories = [
              ...new Set(data.categories.map(cat => cat.category))
            ].map(cat => ({category:cat}));

            setCategories(uniqueCategories)

            setTotalPages(data.totalPages);

          }else{
            getDummyData();
          }

        }

      }else{
        getDummyData();
      }

    } catch (error) {
      getDummyData();
    }
  }


  // Filter Function
  const applyFilters = (products, search, category, price) => {

    const filtered = products.filter(
      (i) =>
        i.pname.toLowerCase().includes(search.toLowerCase()) &&
        i.category.toLowerCase().includes(category.toLowerCase()) &&
        i.price <= price
    );

    setProducts(filtered);
  };


  // Search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(sideProducts, value, selectedCategory, maxPrice);
  };


  // Price
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value,10);
    setPrice(value);
    applyFilters(sideProducts, searchTerm, selectedCategory, value);
  };


  // Category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    applyFilters(sideProducts, searchTerm, category, maxPrice);
  };


  return (
    <div className="Sidebar" id='sidebar-container'>
    
      {/* Search */}
      <div className="group" >
        <FaSearch className="icon" />
        <input 
          className="input" 
          type="search" 
          value={searchTerm}
          onChange={handleSearchChange} 
          placeholder="Search" 
        />
      </div>


    <div className="category-filter">

        {/* Categories */}
        <div className='categories'>

          <button  
            value="" 
            className={selectedCategory=="" ? "selectedCategory" : ""} 
            onClick={()=>handleCategoryChange("")}
          >
            All
          </button>

          {categories.map((cat)=>(
            <button 
              key={cat.category}
              value={cat.category} 
              className={selectedCategory==cat.category ? "selectedCategory" : ""} 
              onClick={()=>handleCategoryChange(cat.category)}
            >
              {cat.category.toUpperCase()}
            </button>
          ))}

        </div>


      {/* Pagination */}
      <div className="pagination">

        <button 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {getPaginationNumbers().map((num, i) =>
          num === "..." ? (
            <span key={i} className="dots">...</span>
          ) : (
            <button
              key={i}
              onClick={() => setPage(num)}
              className={page === num ? "active" : ""}
            >
              {num}
            </button>
          )
        )}

        <button 
          disabled={page === totalPages} 
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>  


    {/* Price */}
    <div className="price-filter">

      <p>
        {"Price: Under $" + maxPrice}
      </p>

      <div className="range-container">
        <input
          type="range"
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