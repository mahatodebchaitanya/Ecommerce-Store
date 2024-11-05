import { useEffect} from 'react';
import {useProductContext} from './context/context'
import axios from 'axios';
import Home from './pages/home';
import './App.css';
import { BrowserRouter,Routes ,Route} from 'react-router-dom'
import Cart from './component/cart';
import DisplayedProduct from './component/displayedproduct';
import ShopingCart from './pages/shopingCart';
import Payment from './pages/payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ContextPage from './context/context';
const stripePromise = loadStripe("your-publishable-key-here");


function App() {
 
  return (
   <>
   <ContextPage>
   <BrowserRouter>
   <ProductLoader/>{/* component to fetch products data */}
   <Routes>
    <Route path='/' element={<Home/>}></Route>
     <Route path='/register' element={<Registerpage/>}></Route> *
      <Route path='/login' element={<Login/>}></Route> *
     <Route path='/product' element={<Cart/>}></Route>
     <Route path='/displayedproduct/:productId' element={<DisplayedProduct/>}></Route>
     <Route path='/shopingcart' element={<ShopingCart/>}></Route>
     <Route path='/payment' element={<Elements stripe={stripePromise}><Payment/></Elements>}></Route>
   </Routes>
   </BrowserRouter>
   </ContextPage>
   </>
  );
}



const ProductLoader = () => {
  const { setProducts } = useProductContext();

  useEffect(() => {
    const urls = [
      'https://fakestoreapi.in/api/products',
      'https://fakestoreapi.in/api/products?page=2',
      'https://fakestoreapi.in/api/products?page=3',
    ];

    const fetchAllProducts = async () => {
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
    };

    fetchAllProducts();
  }, [setProducts]);

  return null;
};




export default App;
