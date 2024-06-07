import 'bootstrap/dist/css/bootstrap.min.css';


import  { useEffect, useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import './responsive.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Home from './Pages/Home/Home.jsx';
// import About from './Pages/About/About.jsx';
import Listing from './Pages/Listing/Listing.jsx';
import NotFound from './Pages/NotFound/NotFound.jsx';
import DetailsPage from './Pages/Details/Details.jsx';
// import Checkout from './Pages/Checkout/Checkout.jsx';
import axios from 'axios';
import Cart from './Pages/Cart/Cart.jsx';
import SignIn from './Pages/SignIn/SignIn.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import Loader from './assets/loading.gif';

import data from './Data.js';

const MyContext = createContext();

function App() {

  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isopenNavigation, setIsopenNavigation] = useState(false);

  const [isLogin, setIsLogin] = useState();
  const [isOpenFilters, setIsopenFilters] = useState(false);

  // const [cartTotalAmount, setCartTotalAmount] = useState();

  useEffect(() => {
    // getData('http://localhost:3033/productData');
    //  getCartData("http://localhost:3033/cartItems");

    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);

   
      setTimeout(() => {
        setProductData(data[1]);
        setIsloading(false);
      }, 500);


  
  }, []);

 

  const getCartData = async (url) => {
    try {
        await axios.get(url).then((response) => {
            setCartItems(response.data);
        })

    } catch (error) {
        console.log(error.message);
    }
}

  const addToCart = async (item) => {
    item.quantity = 1;

    try {
      await axios.post("http://localhost:3033/cartItems", item).then((res) => {
        if (res !== undefined) {
          setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
      })
    } catch (error) {
      console.log(error)
    }

  }




  const removeItemsFromCart = async(id) => {
    const response = await axios.delete(`http://localhost:3033/cartItems/${id}`);
    if (response !== null) {
        getCartData("http://localhost:3033/cartItems");
    }
  }

  const emptyCart = () => {
    setCartItems([])
  }


  const signIn = () => {
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  }


  const signOut = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
  }


  const openFilters=()=>{
    setIsopenFilters(!isOpenFilters)
  }

  const value = {
    cartItems,
    isLogin,
    windowWidth,
    isOpenFilters,
    addToCart,
    removeItemsFromCart,
    emptyCart,
    signOut,
    signIn,
    openFilters,
    isopenNavigation,
    setIsopenNavigation,
    // setCartTotalAmount,
    // cartTotalAmount,
    setCartItems,

  }

  return (
    
    data.productData.length !== 0 &&
    <BrowserRouter> 
      <MyContext.Provider value={value}>
        {
          isLoading===true && <div className='loader'><img src={Loader}/></div>
        }

        
        <Header data={data.productData} cartItemsCount={cartItems.lengths}/>
        <Routes>
          <Route exact={true} path="/" element={<Home data={data.productData} />} />
          <Route exact={true} path="/cat/:id" element={<Listing data={data.productData} single={true} />} />
          <Route exact={true} path="/cat/:id/:id" element={<Listing data={data.productData} single={false} />} />
          <Route exact={true} path="/product/:id" element={<DetailsPage data={data.productData} />} />
          <Route exact={true} path="/cart" element={<Cart />} />
          <Route exact={true} path="/signIn" element={<SignIn />} />
          <Route exact={true} path="/signUp" element={<SignUp />} />
          {/* <Route exact={true} path="/checkout" element={<Checkout />} /> */}
          <Route exact={true} path="*" element={<NotFound />} />
        </Routes>
       <Footer/>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export { MyContext }
