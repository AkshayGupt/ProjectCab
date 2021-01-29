import React,{lazy,Suspense} from 'react';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import Navigation from './components/Navigation/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/Auth/PrivateRoute';
import GuestRoute from './components/Auth/GuestRoute';
import Loading from './Loading';
import Dashboard from './components/Dashboard/Dashboard';
const Landing = lazy(()=>import("./components/Landing/Landing"));
const Register = lazy(()=>import('./components/Register/Register'));
const Profile = lazy(()=>import('./components/Profile/Profile'));
const About = lazy(()=>import('./components/Dashboard/About'));
function App() {
  return (
    <>
    <Suspense fallback={<Loading/>}>
        {/* To-do: Navigation Bar */}
        <Router>
          <Switch>
              <GuestRoute exact  path="/" component={Landing} />
              <PrivateRoute path="/register" exact component={Register} />
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute path="/about" exact component={About} />
          </Switch>
      </Router>
    </Suspense>
    </>
  );
}

export default App;
