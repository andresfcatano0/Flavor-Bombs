import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthNavBar from './components/navbar/AuthNavBar';
import AdminNavBar from './components/navbar/AdminNavBar';
import NavBar from './components/navbar/NavBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { useContext, useState, useEffect } from 'react';
import UserContext from './context/AuthContext';
import jwtDecode from 'jwt-decode';
import RestaurantPage from './pages/RestaurantPage';
import RestaurantInfoPage from './pages/RestaurantInfoPage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import AdminDashboard from './pages/AdminDashboard';
import UserProfilePage from './pages/UserProfilePage';
import OrdersCartPage from './pages/OrdersCartPage';
import CartContext from './context/cart/CartContext';

function App() {

  
  let currentUserData = localStorage.getItem("userData");
  
  if(currentUserData){
    currentUserData = JSON.parse(currentUserData);
  }
  
  const [authUser, setAuthUser] = useState(currentUserData);

  const [orderInCart, setOrdersInCart] = useState();

  
  const user = useContext(UserContext);


  // const login = (token) => {
  //   //decode token
  //   const decodedJwt = jwtDecode(token);

  //   //create user obj 

  // }

  // const logout = () => {
  // }

  // const auth ={

  // }

  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRestaurants = async () => {
    await fetch("http://localhost:8080/api/restaurant", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setRestaurants(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const [menus,setMenus] = useState([])
  const getAllMenus = async () => {
    await fetch("http://localhost:8080/api/menu", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // let specificMenu = data.filter((d) => {
        //   return d.restaurantId.toString() == params.id.toString();
        // });
        // // console.log(data);
        setMenus(data);
      })
      .catch((err) => console.log(err));
  };

   useEffect(() => {
     getRestaurants();
     getAllMenus();
   }, []);

   let orderFromLocal = localStorage.getItem("savedCart");
   

   let savedItems = orderFromLocal ? JSON.parse(orderFromLocal) : [];

  const [orderCartItems, setOrderCartItems] = useState(savedItems);

  const saveOrderCartItems = (saveItems) => {
    localStorage.setItem("savedCart", JSON.stringify(saveItems))
    setOrderCartItems(saveItems)
  }

  const addItemToCart = (menuItem) => {
    const newOrder = [...orderCartItems, {...menuItem, quantity: 1}]
    
    // setOrderCartItems(newOrder);
    saveOrderCartItems(newOrder);
  }

  const removeItemFromCart = (menuItem) => {
    let itemIndex = orderCartItems.findIndex((m)=> m.menuId === menuItem.menuId)
    // setOrderCartItems(
    //   [...orderCartItems.slice(0, itemIndex), 
    //     ...orderCartItems.slice(itemIndex + 1)]
    //     );
    saveOrderCartItems(
      [...orderCartItems.slice(0, itemIndex), 
        ...orderCartItems.slice(itemIndex + 1)]
        );
  }

  const increaseQuantity = (menuItem)=>{
    let copy = [...orderCartItems];

    let itemIndex = copy.findIndex((m)=> m.menuId === menuItem.menuId);

    copy[itemIndex].quantity++;

    // setOrderCartItems(copy)
    saveOrderCartItems(copy)
  }

  const decreaseQuantity = (menuItem)=>{
     let copy = [...orderCartItems];

     let itemIndex = copy.findIndex((m) => m.menuId === menuItem.menuId);

     copy[itemIndex].quantity--;

    //  setOrderCartItems(copy);
     saveOrderCartItems(copy);
  }

  const clearCart = () => { 
    // setOrderCartItems([]);
    saveOrderCartItems([]);
  }

  return (
    <UserContext.Provider value={authUser}>
      <CartContext.Provider
        value={{
          orderCartItems: orderCartItems,
          addItemToCart,
          increaseQuantity,
          decreaseQuantity,
          removeItemFromCart,
          clearCart
        }}
      >
        <BrowserRouter>
          <NavBar setAuthUser={setAuthUser} />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage setAuthUser={setAuthUser} />
            </Route>
            <Route exact path="/restaurants">
              <RestaurantPage
                restaurants={restaurants}
                getRestaurants={getRestaurants}
                isLoading={isLoading}
              />
            </Route>
            <Route path="/restaurant/:id">
              <RestaurantInfoPage
                getRestaurants={getRestaurants}
                restaurants={restaurants}
                menus={menus}
                getAllMenus={getAllMenus}
              />
            </Route>
            <Route path="/orders">
              <OrdersPage setAuthUser={setAuthUser} restaurants={restaurants} />
            </Route>
            <Route path="/admin/dashboard-menu">
              <AdminDashboard
                restaurants={restaurants}
                getRestaurants={getRestaurants}
                setAuthUser={setAuthUser}
              />
            </Route>
            <Route path="/admin/table-view">
              <AdminPage
                setAuthUser={setAuthUser}
                restaurants={restaurants}
                getRestaurants={getRestaurants}
              />
            </Route>
            <Route path="/about-us">
              <AboutPage />
            </Route>
            <Route path="/user/:username">
              <UserProfilePage setAuthUser={setAuthUser} />
            </Route>

            <Route path="/shopping-cart">
              <OrdersCartPage setAuthUser={setAuthUser} />
            </Route>
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
