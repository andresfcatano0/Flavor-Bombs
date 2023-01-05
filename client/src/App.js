import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthNavBar from './components/navbar/AuthNavBar';
import AdminNavBar from './components/navbar/AdminNavBar';
import NavBar from './components/navbar/NavBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/login">
          <LoginPage/>
        </Route>  

      </Switch>
      {/* <AdminNavBar/> */}
    </BrowserRouter>
  );
}

export default App;
