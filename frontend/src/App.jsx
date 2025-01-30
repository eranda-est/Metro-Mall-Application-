import { Routes, Route,useLocation } from "react-router-dom";
import './App.css';
import DashboardLayout from "./pages/AdminDashboard/DashboardLayout";
import SDashboardLayout from "./pages/ShopOwnerDashboard/SDashboardLayout";
import About from "./pages/about/About";
import Customer from "./pages/Dashboard/Customer/Customer";
import ShopOwner from "./pages/Dashboard/ShopOwner/ShopOwner";
import ShopOwnerUpdate from "./pages/Dashboard/ShopOwner/ShopOwnerUpdate";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import UserProfile from "./pages/UserProfile/UserProfile";
import Preorder from "./pages/Preorder/preorderPage/Preorder";
import NotFound from "./pages/notFound/NotFound"
import Items from "./pages/ItemsPage/Items/Items"
import SOhome from "./pages/ShopOwnerDashboard/SODashboardHome/SOhome";
import SOItems from "./pages/ShopOwnerDashboard/ItemsPage/Items/SOItems"
import SOPreorders from "./pages/ShopOwnerDashboard/SOPreorders/sopreorders/SOPreorders";
import SOCompleteOrders from "./pages/ShopOwnerDashboard/SOCompleteorders/SOCompleteOrders";
import SOAddItem from "./pages/ShopOwnerDashboard/ItemsPage/SOAddItem/SOAddItem";
import SOUpdate from "./pages/ShopOwnerDashboard/ItemsPage/SOUpdateItem/SOUpdate";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import AdminFooter from "./components/AdminFooter/AdminFooter";
import ClientHeader from "./components/ClientHeader/ClientHeader";
import ClientFooter from "./components/ClientFooter/ClientFooter";

import DashboardHome from "./pages/AdminDashboard/DashboardHome/DashboardHome";
import Stores from "./pages/AdminDashboard/AdminStores/AdminStores";
import AddStores from "./pages/AdminDashboard/AdminStores/AddStores";
import UpdateStores from "./pages/AdminDashboard/AdminStores/UpdateStores";
import FoodBeverages from "./pages/FoodBeveragesPage/FoodBeverages";
import FoodDescription from "./pages/FoodBeveragesPage/FoodDescription";

import Parkingpage from "./pages/Parkingpage/Parkingpage";
import ContactUs from "./pages/ContactUs/ContactUs";
import HomePage from "./pages/HomePage/HomePage";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith('/admindashboard');
  const isClientDashboard = !isAdminDashboard;

  return (
    <div>

      {isAdminDashboard ? <AdminHeader /> : <ClientHeader />}

      <ToastContainer/>
     
      <Routes>
        <Route path="/about" element={<About /> }/>
        <Route path="/admindashboard/customer" element={<DashboardLayout component={<Customer />} />} /> 
        <Route path="/admindashboard/shopowner" element={<DashboardLayout component={<ShopOwner />} />} /> 
        <Route path="/shopownerupdate/:id" element={<DashboardLayout component={<ShopOwnerUpdate />} />} /> 
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/signin" element={<SignIn />} /> 
        <Route path="/userprofile" element={<UserProfile />} />
        
        <Route path="/admindashboard/shopowner-dashboard" element={<SDashboardLayout component={<SOhome />} />} />
        <Route path="/admindashboard/shopowner-dashboard/items" element={<SDashboardLayout component={<SOItems />} />} />
        <Route path="/admindashboard/shopowner-dashboard/preorders" element={<SDashboardLayout component={<SOPreorders />} />} />
        <Route path="/admindashboard/shopowner-dashboard/complete-orders" element={<SDashboardLayout component={<SOCompleteOrders />} />} />
        <Route path="/admindashboard/shopowner-dashboard/add-items" element={<SDashboardLayout component={<SOAddItem />} />} />
        <Route path="/admindashboard/shopowner-dashboard/update-items/:id" element={<SDashboardLayout component={<SOUpdate />} />} />
        <Route path="/my-preorders" element={<Preorder/>} />
        <Route path="/items-page" element={<Items/>} />
        
        <Route path="/admindashboard" element={<DashboardLayout component={<DashboardHome  />} />} />
        <Route path="/admindashboard/stores" element={<DashboardLayout component={<Stores />} />} />
        <Route path="/admindashboard/stores/add" element={<DashboardLayout component={<AddStores />} />} />
        <Route path="/admindashboard/stores/update/:id" element={<DashboardLayout component={<UpdateStores />} />} />
        <Route path="/foodbeverages" element={<FoodBeverages/>} />
        <Route path="/fooddescription/:id" element={<FoodDescription/>} />
        <Route path="/parking" element={<Parkingpage/>} />
        <Route path="/contactus" element={<ContactUs/>} />
        <Route path="/home" element={<HomePage/>} />
       
      </Routes>

      {isAdminDashboard && <AdminFooter />}
      {isClientDashboard && <ClientFooter />}
     
    </div>
  );
}

export default App;
