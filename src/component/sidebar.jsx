import React from 'react'
import '../App.css'
import { Context, useProductContext } from '../context/context'
const Sidebar = ({ categories }) => {
  const { setSelectedCategory,selectedCategory } = useProductContext(Context);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  return (
    <> <div id='sidebar'>
      <div id='category'>Categories</div>
      <div id='categories' style={{width:'100%'}}>
        {categories.map((category) => (
          <div key={category} id='cate'
          onClick={()=>handleCategoryClick(category)}
          style={{
            color: selectedCategory === category ? 'white' : 'black',  // Text color
            backgroundColor: selectedCategory === category ? 'transparent' : 'transparent',  // Background color
            width:'100%',
            paddingBlock:'10px',
            // margin: '5px',
            // border: '1px solid black',
            cursor: 'pointer',
            textAlign:'center',
            // borderRadius: '5px',
        }}>{category}</div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Sidebar