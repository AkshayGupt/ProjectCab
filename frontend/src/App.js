import React,{lazy,Suspense} from 'react';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import Navigation from './components/Navigation/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/Auth/PrivateRoute';
import GuestRoute from './components/Auth/GuestRoute';
import Loading from './Loading/Loading';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import Contact from './components/Dashboard/ContactUs/ContactUs';
const Landing = lazy(()=>import("./components/Landing/Landing"));
const Register = lazy(()=>import('./components/Register/Register'));
const About = lazy(()=>import('./components/Dashboard/AboutUs/AboutUs'));
const Profile = lazy(()=>import('./components/Profile/Profile'));
// const Footer = lazy(()=>import('./components/Footer/Footer'));
function App() {
  return (
    <>
      {/* <Loading/> */}
      <Suspense fallback={<Loading />}>
        <Router>
          <Switch>
              <Route exact path="/contact" component={Contact} />
              <GuestRoute exact  path="/" component={Landing} />
              <PrivateRoute path="/register" exact component={Register} />
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute path="/about" exact component={About} />
          </Switch>
        </Router>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
