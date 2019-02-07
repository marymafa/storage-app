import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";
import BusinessFrom from "./components/businessForm";
import BlockForm from "./components/blockForm";
import LocationForm from "./components/locationForm";
import UnitsFrom from "./components/unitsFrom";
import UnitTypesFrom from "./components/unitTypesForm";
import viewData from "./components/viewData";
import { Provider } from 'react-redux';
import ViewLocations from "./components/viewLocations";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllBusinesses from "./components/AllBusinesses";
import ViewBlocks from "./components/ViewBlocks";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import UserDetails from "./components/UserDetails";
import AllUnits from "./components/AllUnits";
import Allunitstypes from "./components/AllUnitTypes";
import AllBlocks from "./components/viewAllBlocks";
import AllLocations from "./components/viewAllLocations";
import LogOut from "./components/LogOut";
import ViewCustomerDetails from './components/ViewCustomerDetails';
import CustomerDetails from './components/customerUnit';
import BusinessOwnerLogin from './components/BusinessOwnerLogin';
import BusinessOwnerSignUp from './components/BusinessOwnerSignUp';
import AvailableUnits from './components/AvailableUnits';
import BusinessOwnerDetails from './components/businessOwnerDeatails';
import "./app.css";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path='/' component={Home} />
                <Route path='/businessOwnerLogin' component={BusinessOwnerLogin} />
                <Route path='/businessOwnerSignup' component={BusinessOwnerSignUp} />
                <Route path='/login' component={LogIn} />
                <Route path='/signUp' component={SignUp} />
                <Route path='logout' component={LogOut} />
                <Route path='/business' component={BusinessFrom} />
                <Route path='/blocks' component={BlockForm} />
                <Route path='/locations' component={LocationForm} />
                <Route path='/units' component={UnitsFrom} />
                <Route path='/unit_types' component={UnitTypesFrom} />
                <Route path='/view_business' component={viewData} />
                <Route path='/view_locations' component={ViewLocations} />
                <Route path="/view_all_businesses" component={AllBusinesses} />
                < Route path="/view_blocks" component={ViewBlocks} />
                <Route path="/view_units" component={AllUnits} />
                <Route path="/view_userdetails" component={UserDetails} />
                <Route path="/view_allunitTypes" component={Allunitstypes} />
                <Route path="/viewAllBlocks" component={AllBlocks} />
                <Route path="/viewAllBusinessLocations" component={AllLocations} />
                <Route path="/viewCustomerDetails" component={ViewCustomerDetails} />
                <Route path="/userdetails" component={CustomerDetails} />
                <Route path="/availableunits" component={AvailableUnits} />
                <Route path="/businessOwnerDetails" component={BusinessOwnerDetails} />
            </div>
        </Router>
    </Provider >,
    document.getElementById("root")
)