import React from 'react';
import NavBar from './Components/Navbar.js';
import Footer from './Components/Footer.js';
import Aboutus from './Components/Home/Aboutus.js';
import Home from './Components/Home/Home.js';
import ReviewSection from './Components/Home/ReviewSection.js';
import OurServices from './Components/Home/OurServices.js';
import CommunitySection from './Components/Home/CommunitySection.js';
import MostBook from './Components/Home/MostBooking.js';
import Customer_Services from './Components/Customer/Customer_services.js';
import ServiceProviderProfile from './Components/Service_provider/ServiceProviderProfile.js';
import Shifting from './Components/Service_provider/AgencyList.js';
import BookingPage from './Components/Customer/BookingPage.js';
import Cooking_Registration from './Components/Registration/Cooking_Registration.js';
import Cleaner_Registration from './Components/Registration/Cleaner_Registration.js';
import Salon_Registration from './Components/Registration/Salon_Registration.js';
import Electrician_Registration from './Components/Registration/Electrician_Registration.js';
import Agency_registration from './Components/Registration/Agency_Registration.js';
import Agency_Profile from './Components/Agency_Profile.js';
import AdminNav from './Components/Admin/AdminNav.js';
import Adminlogin from './Components/Admin/Adminlogin.js';
import CustomerProfile from './Components/Customer/CustomerProfile.js';
import ForgotPassword from './Components/Admin/ForgotPassword.js';
import About_us from './Components/Home/About_us.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from 'reactstrap';

function App() {
  return (
    <Router>      
      <Routes>
        <Route path="/" element={
          <>
            <NavBar />    
            <Home />
            <Aboutus />
            <OurServices />
            <CommunitySection />
            <ReviewSection />
            <MostBook />
            <Footer />
          </>
        } />
        <Route path='/about' element={
          <>
            <NavBar/>
            <About_us />
            <Footer/>
          </>
        } />
        <Route path='/customer_services' element={
          <>
            <NavBar />    
            <Customer_Services />
            <Footer />
          </>
        } />
        <Route path='/customer_profile' element={<>
          <CustomerProfile />
        </>}/>
        <Route path='/Service_provider_profile' element={
         <>
          <ServiceProviderProfile/>
         </>
        } 
        />
        <Route path='/agency_list' element={
        <>
          <NavBar />
          <Shifting />
          <Footer />
        </>        
        } />
        <Route path='/booking' element={
        <>
          <NavBar />
          <BookingPage />
          <Footer />
        </>        
        } />
        <Route path="/Electrician_Registration" element={<>
           <NavBar />
           <Electrician_Registration/> 
           <Footer />
        </>} />
        <Route path="/Agency_registration" element={<>
           <NavBar />
           <Agency_registration/>   
           <Footer />
        </>
        }/>
        <Route path="/Cooking_Registration" element={<>
           <NavBar />
           <Cooking_Registration/>
           <Footer />
        </>
        } />
        <Route path='/Cleaner_Registration' element={<>
           <NavBar />
           <Cleaner_Registration/>
           <Footer />
        </>}
        />
        <Route path='/Salon_Registration' element={<>
          <NavBar />
          <Salon_Registration/>
          <Footer />
        </>}/>
        <Route path='/Agency_profile' element={<>  
          <NavBar />      
          <Agency_Profile/>        
          <Footer />
        </>}/>
        <Route path='/admin' element={<>
          <Adminlogin/>
        </>} />
        <Route path="/admin/dashboard" element={
          <>
            <AdminNav />
          </>
        } />        
      </Routes>
    </Router>
  );
}

export default App;