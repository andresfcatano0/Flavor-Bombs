import { BrowserRouter, Route,  Switch } from 'react-router-dom';
import "./App.css";
import AuthNavBar from './components/navbar/AuthNavBar';
import AdminNavBar from './components/navbar/AdminNavBar';
import NavBar from './components/navbar/NavBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { useContext, useState, useEffect } from 'react';
import UserContext from './context/AuthContext';

import jwtDecode from "jwt-decode";
import RestaurantPage from './pages/RestaurantPage';
import RestaurantInfoPage from './pages/RestaurantInfoPage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import AdminDashboard from './pages/AdminDashboard';
import UserProfilePage from './pages/UserProfilePage';
import OrdersCartPage from './pages/OrdersCartPage';
import CartContext from './context/cart/CartContext';
import NotFoundPage from './pages/NotFoundPage';
import Map from './components/Map';
import AdminViewAllRestaurants from './pages/adminTables/AdminViewAllRestaurants';
import AdminViewAllUsers from './pages/adminTables/AdminViewAllUsers';
import AdminViewAllOrders from './pages/adminTables/AdminViewAllOrders';

function App() {
  // USER DATA
  let currentUserData = localStorage.getItem("userData");

  if (currentUserData) {
    currentUserData = JSON.parse(currentUserData);
  }

  const [authUser, setAuthUser] = useState(currentUserData);

  const user = useContext(UserContext);

  // ALL RESTAURANTS
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

  // ALL MENUS
  const [menus, setMenus] = useState([]);
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
        setMenus(data);
      })
      .catch((err) => console.log(err));
  };
  

  // ALL USERS
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
   await fetch("http://localhost:8080/api/user/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authUser.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllUsers(data)
      });
  };

  // ALL ORDERS
  const [allOrders, setAllOrders] = useState([]);

  const getAllOrders = async () => {
    await fetch("http://localhost:8080/api/order/all", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authUser.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllOrders(data);
      });
  };

  useEffect(() => {
    getRestaurants();
    getAllMenus();
    getAllUsers();
    getAllOrders();
  }, []);



  // const [specificUser, setSpecificUser] = useState({});
  // const handleSpecificReviewOrder = (userId) => {
  //   fetch("http://localhost:8080/api/user/" + userId, {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer " + user.token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setSpecificUser(data);
  //     });
  // };

  //  LOAD CART if in storage
  let orderFromLocal = localStorage.getItem("savedCart");

  let savedItems = orderFromLocal ? JSON.parse(orderFromLocal) : [];

  //  CART DATA + METHODS to manipulate data
  const [orderCartItems, setOrderCartItems] = useState(savedItems);

  const saveOrderCartItems = (saveItems) => {
    localStorage.setItem("savedCart", JSON.stringify(saveItems));
    setOrderCartItems(saveItems);
  };

  const addItemToCart = (menuItem) => {
    const newOrder = [...orderCartItems, { ...menuItem, quantity: 1 }];

    // setOrderCartItems(newOrder);
    saveOrderCartItems(newOrder);
  };

  const removeItemFromCart = (menuItem) => {
    let itemIndex = orderCartItems.findIndex(
      (m) => m.menuId === menuItem.menuId
    );
    // setOrderCartItems(
    //   [...orderCartItems.slice(0, itemIndex),
    //     ...orderCartItems.slice(itemIndex + 1)]
    //     );
    saveOrderCartItems([
      ...orderCartItems.slice(0, itemIndex),
      ...orderCartItems.slice(itemIndex + 1),
    ]);
  };

  const increaseQuantity = (menuItem) => {
    let copy = [...orderCartItems];

    let itemIndex = copy.findIndex((m) => m.menuId === menuItem.menuId);

    copy[itemIndex].quantity++;

    // setOrderCartItems(copy)
    saveOrderCartItems(copy);
  };

  const decreaseQuantity = (menuItem) => {
    let copy = [...orderCartItems];

    let itemIndex = copy.findIndex((m) => m.menuId === menuItem.menuId);

    copy[itemIndex].quantity--;

    //  setOrderCartItems(copy);
    saveOrderCartItems(copy);
  };

  const clearCart = () => {
    // setOrderCartItems([]);
    saveOrderCartItems([]);
  };
  return (
    <UserContext.Provider value={authUser}>
      <CartContext.Provider
        value={{
          orderCartItems: orderCartItems,
          addItemToCart,
          increaseQuantity,
          decreaseQuantity,
          removeItemFromCart,
          clearCart,
        }}
      >
        <BrowserRouter>
          <NavBar setAuthUser={setAuthUser} />
          <Switch>
            <Route exact path="/">
              <HomePage />
              <Map />
            </Route>
            <Route exact path="/login">
              <LoginPage setAuthUser={setAuthUser} />
            </Route>
            <Route exact path="/restaurants">
              <RestaurantPage
                restaurants={restaurants}
                getRestaurants={getRestaurants}
                isLoading={isLoading}
              />
            </Route>
            <Route exact path="/restaurant/:id">
              <RestaurantInfoPage
                getRestaurants={getRestaurants}
                restaurants={restaurants}
                menus={menus}
                getAllMenus={getAllMenus}
              />
            </Route>
            <Route exact path="/orders">
              <OrdersPage setAuthUser={setAuthUser} restaurants={restaurants} />
            </Route>
            <Route exact path="/admin/dashboard-menu">
              <AdminDashboard
                restaurants={restaurants}
                menus={menus}
                allUsers={allUsers}
                getRestaurants={getRestaurants}
                authUser={authUser}
                setAuthUser={setAuthUser}
              />
            </Route>
            <Route exact path="/admin/view-all-restaurants">
              <AdminViewAllRestaurants
                restaurants={restaurants}
                menus={menus}
                allUsers={allUsers}
                getRestaurants={getRestaurants}
                authUser={authUser}
                setAuthUser={setAuthUser}
              />
            </Route>
            <Route exact path="/admin/view-all-orders">
              <AdminViewAllOrders
                restaurants={restaurants}
                menus={menus}
                allUsers={allUsers}
                getRestaurants={getRestaurants}
                authUser={authUser}
                setAuthUser={setAuthUser}
                allOrders={allOrders}
                // specificUser={specificUser}
                // handleSpecificReviewOrder={handleSpecificReviewOrder}
              />
            </Route>
            <Route exact path="/admin/view-all-users">
              <AdminViewAllUsers
                restaurants={restaurants}
                menus={menus}
                allUsers={allUsers}
                getAllUsers={getAllUsers}
                getRestaurants={getRestaurants}
                authUser={authUser}
                setAuthUser={setAuthUser}
                // specificUser={specificUser}
                // handleSpecificReviewOrder={handleSpecificReviewOrder}
              />
            </Route>
            <Route exact path="/admin/table-view">
              <AdminPage
                setAuthUser={setAuthUser}
                restaurants={restaurants}
                menus={menus}
                allUsers={allUsers}
                getRestaurants={getRestaurants}
              />
            </Route>
            <Route exact path="/about-us">
              <AboutPage />
            </Route>
            <Route path="/user/:username">
              <UserProfilePage setAuthUser={setAuthUser} />
            </Route>

            <Route exact path="/shopping-cart">
              <OrdersCartPage
                setAuthUser={setAuthUser}
                restaurants={restaurants}
              />
            </Route>
            <Route
              path="*"
              render={() => {
                return <NotFoundPage />;
              }}
            />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
