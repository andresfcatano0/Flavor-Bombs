import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthNavBar from './components/navbar/AuthNavBar';
import AdminNavBar from './components/navbar/AdminNavBar';
import NavBar from './components/navbar/NavBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { useContext, useState } from 'react';
import UserContext from './context/AuthContext';
import jwtDecode from 'jwt-decode';

function App() {
  const [menu, setMenu] = useState([]);

  const [authUser, setAuthUser] = useState(null);


  
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
  
  

  return (
    <UserContext.Provider value={authUser}>
      <BrowserRouter>
        
        <NavBar setAuthUser={setAuthUser}/>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage setAuthUser={setAuthUser}/>
          </Route>
        </Switch>
        {/* <AdminNavBar/> */}
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
