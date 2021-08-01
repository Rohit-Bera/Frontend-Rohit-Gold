// there is only routingfile
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Forms from "./Profile";
import Wishlist from "./Wishlist";
import Cart from "./Cart";

import Marketplace from "./Marketplace";
import Footer from "./Mainfooter";
//forms
import Login from "./LoginForm";
import Signup from "./SignupForm";

//Profile
import ProfileHeader from "./Myprofile.header";
import Editform from "./Mypofile.profile.edit";
import Overview from "./Myprofile.overview";
import Myprofile from "./Myprofile.profile";
import Myorders from "./Myprofile.myorders";

//toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPannel from "../components.admin/AdminNav";
import Adminprofile from "../components.admin/AdminProfile";
import Adminusers from "../components.admin/AdminUsers";
import Adminhero from "../components.admin/AdminHero";

import AdminFeedback from "../components.admin/AdminFeedback";

import Productcollection from "../components.admin/Product.collection";
import Productnav from "../components.admin/Product.nav";
import Productaddproduct from "../components.admin/Product.addproduct";
import Productallproduct from "../components.admin/Product.allproduct";
import Updateproduct from "../components.admin/Updateproduct";
import OrdersAllOrders from "../components.admin/Order.orders";
import OrderDelievered from "../components.admin/Order.delievered";
import OrderUndelievered from "../components.admin/Order.undelievered";
import Marketproduct from "./Marketproduct";
import ViewProduct from "./viewProduct";
import Searchproduct from "./Searchproduct";
import Chat from "./chat";
import AdminMessenger from "../components.admin/AdminMessenger";
import Allproducts from "./Allproducts";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          {/* admin part */}
          <Route
            path="/adminpannel"
            exact
            component={(AdminPannel, Adminhero)}
          />

          <Route path="/adminpannel/profile" exact component={Adminprofile} />
          <Route path="/adminpannel/users" exact component={Adminusers} />

          <Route
            path="/adminpannel/products/collection"
            exact
            component={Productcollection}
          />
          <Route
            path="/adminpannel/products/addProduct"
            exact
            component={Productaddproduct}
          />
          <Route
            path="/adminpannel/products/allProduct"
            exact
            component={Productallproduct}
          />
          <Route
            path="/adminpannel/products/updateProduct"
            exact
            component={Updateproduct}
          />
          <Route path="/adminpannel/feedback" exact component={AdminFeedback} />

          <Route
            path="/adminpannel/orders/allorders"
            exact
            component={OrdersAllOrders}
          />
          <Route
            path="/adminpannel/orders/dispacth"
            exact
            component={OrderDelievered}
          />
          <Route
            path="/adminpannel/orders/notdispatch"
            exact
            component={OrderUndelievered}
          />
          <Route
            path="/adminpannel/UserChats"
            exact
            component={AdminMessenger}
          />

          {/* market path */}
          <Route path="/" exact component={Marketplace} />
          <Route path="/home" exact component={Marketplace} />

          <Route path="/home/rose-gold" exact component={Marketproduct} />
          <Route
            path="/home/wedding-jwellery"
            exact
            component={Marketproduct}
          />
          <Route
            path="/home/platinum-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="/home/mangalsutra-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="/home/love-alphabet-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="/home/mangalsutra-ring-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="/home/men-platinum-collection"
            exact
            component={Marketproduct}
          />
          <Route path="/home/zoul-collection" exact component={Marketproduct} />
          <Route path="/home/envy-collection" exact component={Marketproduct} />

          <Route
            path="/home/birthday-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="/home/engagement-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="/home/festive-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="/home/mothers-day-collection"
            exact
            component={Marketproduct}
          />
          <Route path="/home/allproducts" exact component={Allproducts} />

          <Route path="/home/searchproduct" exact component={Searchproduct} />

          {/* users path */}
          <Route path="/LoginSignup" exact component={Forms} />
          <Route path="/Wishlist" exact component={Wishlist} />
          <Route path="/Cart" exact component={Cart} />
          {/* forms */}
          <Route path="/Login" exact component={Login} />
          <Route path="/Signup" exact component={Signup} />
          {/* myprofile */}
          <Route
            path="/Myprofile"
            exact
            component={(ProfileHeader, Overview)}
          />
          <Route path="/Myprofile/Overview" exact component={Overview} />
          <Route path="/Myprofile/Profile" exact component={Myprofile} />
          <Route path="/Myprofile/Edit" exact component={Editform} />
          <Route path="/Myprofile/Wishlist" exact component={Wishlist} />
          <Route path="/Myprofile/Myorders" exact component={Myorders} />
          <Route path="/Myprofile/Toorder" exact component={Cart} />

          <Route
            path="/home/productcollection/viewproduct"
            exact
            component={ViewProduct}
          />

          {/* user chat */}
          <Route path="/help/chat-with-helpCenter" exact component={Chat} />

          {/* extra back log*/}

          <Route
            path="https://rohits-goldapp.netlify.app/adminpannel"
            exact
            component={(AdminPannel, Adminhero)}
          />

          <Route
            path="https://rohits-goldapp.netlify.app/adminpannel/profile"
            exact
            component={Adminprofile}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/adminpannel/users"
            exact
            component={Adminusers}
          />

          <Route
            path="https://rohits-goldapp.netlify.app/adminpannel/products/collection"
            exact
            component={Productcollection}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/adminpannel/products/addProduct"
            exact
            component={Productaddproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/adminpannel/products/allProduct"
            exact
            component={Productallproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/adminpannel/products/updateProduct"
            exact
            component={Updateproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/adminpannel/feedback"
            exact
            component={AdminFeedback}
          />

          <Route
            path="https://rohits-goldapp.netlify.app/adminpannel/orders/allorders"
            exact
            component={OrdersAllOrders}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/adminpannel/orders/dispacth"
            exact
            component={OrderDelievered}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/adminpannel/orders/notdispatch"
            exact
            component={OrderUndelievered}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/adminpannel/UserChats"
            exact
            component={AdminMessenger}
          />

          {/* market path */}
          <Route
            path="https://rohits-goldapp.netlify.app/"
            exact
            component={Marketplace}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home"
            exact
            component={Marketplace}
          />

          <Route
            path="https://rohits-goldapp.netlify.app/home/rose-gold"
            exact
            component={Marketproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home/wedding-jwellery"
            exact
            component={Marketproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home/platinum-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home/mangalsutra-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home/love-alphabet-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home/mangalsutra-ring-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home/men-platinum-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home/zoul-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home/envy-collection"
            exact
            component={Marketproduct}
          />

          <Route
            path="https://rohits-goldapp.netlify.app/home/birthday-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home/engagement-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home/festive-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home/mothers-day-collection"
            exact
            component={Marketproduct}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/home/allproducts"
            exact
            component={Allproducts}
          />

          <Route
            path="https://rohits-goldapp.netlify.app/home/searchproduct"
            exact
            component={Searchproduct}
          />

          {/* users path */}
          <Route
            path="https://rohits-goldapp.netlify.app/LoginSignup"
            exact
            component={Forms}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/Wishlist"
            exact
            component={Wishlist}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/Cart"
            exact
            component={Cart}
          />
          {/* forms */}
          <Route
            path="https://rohits-goldapp.netlify.app/Login"
            exact
            component={Login}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/Signup"
            exact
            component={Signup}
          />
          {/* myprofile */}
          <Route
            path="https://rohits-goldapp.netlify.app/Myprofile"
            exact
            component={(ProfileHeader, Overview)}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/Myprofile/Overview"
            exact
            component={Overview}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/Myprofile/Profile"
            exact
            component={Myprofile}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/Myprofile/Edit"
            exact
            component={Editform}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/Myprofile/Wishlist"
            exact
            component={Wishlist}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/Myprofile/Myorders"
            exact
            component={Myorders}
          />
          <Route
            path="https://rohits-goldapp.netlify.app/Myprofile/Toorder"
            exact
            component={Cart}
          />

          <Route
            path="https://rohits-goldapp.netlify.app/home/productcollection/viewproduct"
            exact
            component={ViewProduct}
          />

          {/* user chat */}
          <Route
            path="https://rohits-goldapp.netlify.app/help/chat-with-helpCenter"
            exact
            component={Chat}
          />

          {/* admin */}
          {/* <Routr path="" exact component={} />
          <Route path="" exact component={} /> */}
        </Switch>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;
