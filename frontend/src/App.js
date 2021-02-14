import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookies from "js-cookie";
import Navigation from "./components/Navigation/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/Auth/PrivateRoute";
import GuestRoute from "./components/Auth/GuestRoute";
import Loading from "./Loading/Loading";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import EmailActivation from "./components/Auth/EmailActivation";
import ResetPassword from "./components/Auth/ResetPassword";

/* CONTEXT API */
import {PastTripProvider} from './components/Context/PastTripProvider';


const Landing = lazy(() => import("./components/Landing/Landing"));
const Register = lazy(() => import("./components/Register/Register"));
const About = lazy(() => import("./components/About/About"));
const Profile = lazy(() => import("./components/Profile/Profile"));

// const Footer = lazy(()=>import('./components/Footer/Footer'));
function App() {
  return (   
    <>  
      <Suspense fallback={<Loading />}>
        <Router>
          <Switch>
            <Route exact path="/contact" component={Contact} />
            <Route
              exact
              path="/authentication/activate/:token"
              component={EmailActivation}
            />
            <Route
              exact
              path="/reset/password/:resetLink"
              component={ResetPassword}
            />
            <GuestRoute exact path="/" component={Landing} />
            <PastTripProvider>
            <PrivateRoute path="/register" exact component={Register} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <PrivateRoute path="/about" exact component={About} />
            </PastTripProvider>
          </Switch>
        </Router>
      </Suspense>
      <Footer />
      </>
  );
}

export default App;
