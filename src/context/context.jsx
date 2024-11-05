import React, { createContext, useContext, useState } from 'react'
export const Context = createContext()
export const useProductContext = () => useContext(Context);


const ContextPage = ({ children }) => {
  const [products, setProducts] = useState([])
  const [cart ,setCart]=useState([])
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItem, setCartItem] = useState(0);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [subtotal,setSubtotal]=useState(0)


  return (
    <>
      <Context.Provider value={{ products, setProducts, selectedCategory, setSelectedCategory, cartItem, setCartItem,isSearchModalOpen,setIsSearchModalOpen,searchInput,setSearchInput,searchResults,setSearchResults,cart,setCart,subtotal,setSubtotal}}>
        {children}
      </Context.Provider>
    </>
  )
}

export default ContextPage