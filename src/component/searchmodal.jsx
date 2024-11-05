import React from 'react'
import Smodal from './smodal'
import { Context, useProductContext } from '../context/context'
import { useNavigate } from 'react-router-dom'

const SearchModal = () => {
  const navigate=useNavigate();
  const { isSearchModalOpen, setIsSearchModalOpen, searchResults } = useProductContext(Context)
  function shortenTitle(title){
    return title.length >= 80 ? title.slice(0, 80) + '...' : title
  }

  const handleClick=(productId)=>{
    navigate(`/displayedproduct/${productId}`)
    setIsSearchModalOpen(false)
  }
  return (
    <>

      {isSearchModalOpen && (
        <Smodal onClose={() => setIsSearchModalOpen(false)} style={{}} show={isSearchModalOpen}>
          {searchResults.length ? (
            <ul style={{ listStyleType: "none", display: 'flex', gap: '10px', flexDirection: 'column', overflowY: 'auto', padding: "10px", maxHeight: "450px" }}>
              {searchResults.map((item) => (
                <li key={item.id} style={{ backgroundColor: 'white', color: "black", border: '2px solid black', display: "flex", gap: '10px',cursor:"pointer" }} onClick={()=>handleClick(item.id)}>
                  <img style={{ height: "80px", width: "80px" }} src={item.image}></img>
                  <div>
                    <p>{shortenTitle(item.title)}</p>
                    <p style={{fontSize:"30px"}}><span style={{color:"green"}}>$</span>{item.price}</p>
                    </div>
                    
                </li> // Display desired item details
              ))}
            </ul>
          ) : (
            <p>No matching items found.</p>
          )}
        </Smodal>
      )}
    </>

  )
}



export default SearchModal