import React from 'react'
import { Context, useProductContext } from '../context/context';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout/layout'
import { SiXiaomi } from "react-icons/si";
import { AiFillApple } from "react-icons/ai";
import { SiApplemusic } from "react-icons/si";
import Sliders from '../component/slider';
import Sidebar from '../component/sidebar';
import Demoproduct from '../component/demoproduct';
import Cart from '../component/cart';
import Pagination from '../component/pagination';
import SearchModal from '../component/searchmodal';



const Home = () => {
  const [categories,setCategories]=useState([]);
  const {products,selectedCategory,setProducts,setSelectedCategory}=useProductContext(Context)

  
  

const getCategory= async ()=>{
    const response=await axios.get('https://fakestoreapi.in/api/products/category')
    const data=response.data.categories;
    setCategories(data);
}
useEffect(()=>{
  getCategory();
},[])

useEffect(() => {
  const fetchProducts = async () => {
      let url = 'https://fakestoreapi.in/api/products'; // Default URL for all products
      if (selectedCategory !== 'all') {
        try{
          url = `https://fakestoreapi.in/api/products/category?type=${selectedCategory}`;
          const response = await axios.get(url);
          const data=response.data.products
          setProducts(data)

        }catch(e){
          console.error(e);
        }
      }
      else{
        const urls = [
          'https://fakestoreapi.in/api/products',
          'https://fakestoreapi.in/api/products?page=2',
          'https://fakestoreapi.in/api/products?page=3',
        ];
    
         
          try {
            // Use Promise.all to fetch from all URLs simultaneously
            const responses = await Promise.all(urls.map((url) => axios.get(url)));
            // console.log(responses);
            // Extract data from each response and merge into one array
            const allProducts = responses.flatMap((response) => response.data.products);
            //  console.log(allProducts);
            // Set the merged array to context
            setProducts(allProducts);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        
    
      }
      // console.log(products);
      
     
  };

  fetchProducts();
}, [selectedCategory]);

// State for active filter type
const [activeFilter, setActiveFilter] = useState('all');

// Function to filter products based on the active filter
const getFilteredProducts = () => {
  switch (activeFilter) {
    case "cheap":
      return products.filter((product) => product.price < 200);
    case "expensive":
      return products.filter((product) => product.price > 500);
    case "popular":
      return products.filter((product) => product.popular);
    case "sale":
      return products.filter((product) => product.onSale);
    default:
      return products; // Show all products if no filter is selected
  }
};

// Get filtered products based on active filter
const filteredProducts = getFilteredProducts();

const totalItems =filteredProducts.length; // total number of items
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const displayedProducts = filteredProducts.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


  return (
    <Layout>
      <div id='homewrapper' draggable='false'>
      {/* <SearchModal/> */}
      {/* Navbar start here */}
        
      {/* Navbar end here */}
        {/* sidebar start here */}
        <Sidebar  categories={categories}/>
        {/* sidebar end here */}
        {/* product start here */}
        <div id='products-wrapper'>
          {/* carosol start here */}
          <div id='product-carosol-wrapper'>
            <p id='hotsale'>HOT SALE</p>
            <div id='product-carosol'>
              <Sliders />
            </div>
          </div>
          {/* carosol end here */}
          {/* demo-product start here */}
          <div id='demo-products'>
           <Demoproduct/>
           <Demoproduct/>
           <Demoproduct/>
           <Demoproduct/>
          </div>
          {/* demo-product end here */}
          <div id='seller-wrapper'>
            <div id='best-sellers'>
              <p id='p'>BESTSALERS</p>
              <div id='sellers'>
                <div>
                  <AiFillApple style={{ fontSize: '1.5rem' }} />
                  <p>Apple </p>
                </div>
                <div>
                  <SiApplemusic style={{ fontSize: '1.5rem' }} />
                  <p>Sony </p>
                </div>
                <div>
                  <SiXiaomi style={{ fontSize: '1.5rem' }} />
                  <p>Xiaomi</p>
                </div>
              </div>
            </div>


          </div>



        </div>
        {/* product end here */}
        {/*Actual  Products start here */}    
        <div id='act-product'>
          {/* product type start here */}
        {/* <div id='product-type'>
             <div id='all'>All</div>
             <div className='type'>Popular</div>
             <div className='type'>Cheap</div>
             <div className='type'>Expensive</div>
             <div className='type'>Sale</div>     
        </div>  */}
        {/* Filter buttons */}
        <div style={{display:'flex',paddingLeft:'35px',flexDirection:'column'}}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", }}>
        {["all", "cheap", "expensive", "popular", "sale"].map((filter) => (
          // <button
          //   key={filter}
          //   style={{
          //     color: activeFilter === filter ? "white" : "black",
          //     backgroundColor: activeFilter === filter ? "black" : "white",
          //     border: "1px solid black",
          //     padding: "10px",
          //     cursor: "pointer",
          //   }}
          //   onClick={() => setActiveFilter(filter)}
          // >
          //   {filter.charAt(0).toUpperCase() + filter.slice(1)}
          // </button>

          <button
      key={filter}
      style={{
        color: activeFilter === filter ? "white" : "black",
        backgroundColor: activeFilter === filter ? "black" : "white",
        border: "1px solid black",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={() => {
        setActiveFilter(filter);
        if (filter === "all") {
          setSelectedCategory("all"); // Deselects any category
        }
      }}
    >
      {filter.charAt(0).toUpperCase() + filter.slice(1)}
    </button>
        ))}
</div>
        {/* Show clear button if any filter is active */}
        {/* {activeFilter !== "all" && (
          <button onClick={() => setActiveFilter("all")} style={{backgroundColor:'red',color:'white',padding:'5px 10px'}}>Clear Filter</button>
        )} */}
         {selectedCategory !== "all" && (
    <button
      onClick={() => {
        setActiveFilter("all");
        setSelectedCategory("all"); // Ensures all products are shown
      }}
      style={{ backgroundColor: 'red', color: 'white', padding: '10px',width:'100px' }}
    >
      {selectedCategory} X
    </button>
  )}
      
      </div>
        {/* product type end here */}
         <Cart displayedProducts={displayedProducts}/>
         {/* <Cart filteredProducts={filteredProducts}/> */}
         {products.length>30 &&  <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />}
        
        </div>
         {/*Actual Products end here */}
      </div>

    </Layout>
  )
}

export default Home



 