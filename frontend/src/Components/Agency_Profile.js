import axios from "axios";
import { requestedURL } from "../urls";
import { useState,useEffect } from "react";
import {useLocation} from "react-router-dom";
import { requestedURLForServiceProvider } from "../urls";
import Cookie from 'js-cookie';
import React from 'react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const backendUrl = 'http://localhost:3001';

function Agency_Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;
    const name = location.state.name;
    const img = location.state.img;
    const [areaType,setAreaType] = useState(false);
    const [serviceType,setServiceType] = useState(false);
    const [fromLocation,setFromLocation] = useState(false);
    const [toLocation,setToLocation] = useState(false);
    const [date,setDate] = useState(false);
    const [agencyData, setAgencyData] = useState([]);
    const [userRole, setUserRole] = useState(); 
    const [agencyFormData,setAgencyFormData] = useState({});

    useEffect(()=>{
        console.log('first');
        const getAgencyData = async(e)=>{
            const result = await axios.get(`${requestedURLForServiceProvider}/getagencydata/${id}`);
            console.log("Resultttttttttttt =>",result); 
            setAgencyData(result.data.AgencyData);
            console.log("setAgencyData=>",agencyData);
        }
        getAgencyData();
    },[]);

    useEffect(()=>{
        window.scrollTo(0,0);
        const getLogInUserData = async()=>{
            var cookie_token = Cookie.get('Login_Jwt_token');
            if(cookie_token){
                try{
                    var result = await axios.post(requestedURL + '/awt_login',{token : cookie_token});
                    if(result.status==201){
                        if(result.data.payload.user.role==='Service Provider'){
                            setUserRole(result.data.data[0]._id);
                        }
                        else{
                            setAgencyFormData({...agencyFormData,['customer_id']:result.data.data._id})
                        }
                    }else{
                        console.log("Status is not 201");
                    }

                }catch(err){
                    console.log("Error While Finding Authorized User",err);
                    Swal.fire({
                        icon:'error',
                        text:'Error while dealing with backend'
                    })
                }          

            }else{
                Swal.fire("Login for see Agency Profile");
                navigate('/');
            }
        }
        getLogInUserData();
    },[]);
    
    const handleInput = (e)=>{
        console.log("==> Name",e.target.name, ': value',e.target.value);
        setAgencyFormData({...agencyFormData,[e.target.name] : e.target.value});
        validateField(e.target.name,e.target.value);
    }

    const validateField  = (name,value)=>{
        switch(name){
            case 'houseType' :{
                if(value === ''){
                    document.getElementById("houseType").style.color = "red";
                    document.getElementById("spanService").innerHTML = "Service Area Type is Required"
                    setAreaType(false);
                }else{
                    document.getElementById("houseType").style.color = "green";
                    setAreaType(true);
                }
            }
            break;
            case 'shiftingType' :{
                if(value === ''){
                    document.getElementById("shiftingType").style.color = "red";
                    document.getElementById("spanServicee").innerHTML = "Service Type is Required";
                    setServiceType(false);
                }else{
                    document.getElementById("shiftingType").style.color = "green";
                    setServiceType(true);
                }
            }
            break;
            case 'fromlocation' :{
                if(value.trim() === ''){
                    document.getElementById("fromlocation").style.color = "red";
                    document.getElementById("spanFromlocation").innerHTML = "fromlocation is Required";
                    setFromLocation(false);
                }else{
                    document.getElementById("fromlocation").style.color = "green";
                    setFromLocation(true);
                }
            }
            break;
            case 'tolocation' :{
                if(value.trim() === ''){
                    document.getElementById("tolocation").style.color = "red";
                    document.getElementById("spanTolocation").innerHTML = "tolocation is Required";
                    setToLocation(false);
                }else{
                    document.getElementById("tolocation").style.color = "green";
                    setToLocation(true);
                }
            }
            break;
            case 'date' :{
                if(value === ''){
                    document.getElementById("date").style.color = "red";
                    document.getElementById("spanDate").innerHTML = "date is Required";
                    setDate(false);
                }else{
                    document.getElementById("date").style.color = "green";
                    setDate(true);
                }
            }
            break;
        }
    }

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if(areaType && serviceType && fromLocation && toLocation && date)
        {
        try {
            const response = await axios.post(requestedURLForServiceProvider + '/submitBookingRequest', {id,agencyFormData});
            if(response.status === 201){
                Swal.fire("Data Added");
                e.target.reset();
            }else{
                Swal.fire({
                    icon : "error",
                    text : "Something when Wrong"
                });
            }

        } catch (error) {
            console.error('Error submitting booking request:', error);
        }
     }else{
        Swal.fire("Some fieds are empty")
     }
    };

    return (<>
        <section className="pt-5">           
            <div className="container" style={{ background: '#F9F5F4'}}>
                <div className="row">
                    {/* div for form start */}

                    {userRole !== id ? 
                        (<>
                        <div className='col-md-4 d-flex py-5 px-3 justify-content-center align-items-center'>
                            <div className='w-100 px-3 py-2 bg-yellow border-0 rounded-3' style={{ background: '#FFC36A' }}>
                                <h4>Booking Form</h4>
                                <form method='post' className="w-100 px-2" onSubmit={handleBookingSubmit}>
                                        <select className="form-control form-select my-3 rounded-1 border-0" id="shiftingType" onChange={handleInput} name="shiftingType" placeholder="Select Service">
                                            <option value="">Select...</option>
                                            <option value="Local">Local Area</option>
                                            <option value="City">City Area</option>
                                            <option value="State">State Area</option>
                                        </select>
                                        <span id='spanService'></span>
                                        <select className="form-control form-select my-3 rounded-1 border-0" id="houseType" onChange={handleInput} name="houseType" placeholder="Household Shifting Type">
                                            <option value="">Select...</option>
                                            <option value="1BHK">1 BHK</option>
                                            <option value="2BHK">2 BHK</option>
                                            <option value="3BHK">3 BHK</option>
                                            <option value="4-5BHK">4 - 5 BHK</option>
                                            <option value="Complete">Complete Household </option>
                                        </select>
                                        <span id='spanServicee'></span>
                                        <input type="text" className="form-control my-3 rounded-1 border-0" id="fromlocation" onChange={handleInput} name="fromlocation" placeholder="From Location" />
                                        <span id='spanFromlocation'></span>
                                        <input type="text" className="form-control my-3 rounded-1 border-0" id="tolocation" onChange={handleInput} name="tolocation" placeholder="To Location" />
                                        <span id='spanTolocation'></span>
                                        <input type="text" className="form-control my-3 rounded-1 border-0" id="fromcity" onChange={handleInput} name="fromcity" placeholder="fromCity" />
                                        <span id='spanfromcity'></span>                                        
                                        <input type="date" className="form-control my-3 rounded-1 border-0" id="date" name="date" onChange={handleInput} placeholder="Select Date" />
                                        <span id='spanDate'></span>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn rounded-1 border-0" style={{ background: 'black', color: 'white' }}>Submit</button>
                                        </div>
                                    </form>
                            </div>
                        </div>
                        </>) : 
                        (<>
                        <div className='col-md-4 d-flex py-5 px-3  mt-5 justify-content-center align-items-center'>
                            <div className='w-100 h-100 px-5 py-5 mt-5 bg-yellow border-0 rounded-3' style={{ background: '#FFC36A' }}>
                            <img  src={`${backendUrl}/uploads/${img}`} />
                            </div>
                        </div>
                        </>
                        )
                    }
                    {/* div for form end */}

                    {/* div for content start */}
                    <div id="divforfrom" className="col-md-8">
                        <center className="mt-5">
                            <h3>{name}<br />Pakers and Movers House Shifting Services</h3>
                        </center>
                        <div className='p-1' style={{ background: '#F9F5F4' }}>      
                            <p>
                                House shifting services can be recruited for household products shifting from one place/city to another. Assuming you are searching for top notch and financially savvy home shifting services close to you then Agarwal Packers and Movers can help you altogether.
                            </p>
                            <p>
                                With us you will actually want to design your move with a solid and experienced packers and movers house shifting organization. You will encounter totally protected and bother free execution of whole home shifting interaction. Every one of your households things will be pressed accurately and moved to your objective securely. By choosing Agarwal packers and movers shifting services you will actually want to save your valuable investment too.
                            </p>
                            <p>
                                Moving to a new home can be an additional difficult experience for youngsters to adapt to. The actual distance moved is not so important. Either across state/Cities or across the country, the transition is very stressful because it needs children to disconnect the attachments they have formed with their most intimate physical environments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* End of hero Section  */}

        <section className="container">
            <center>
                <h2>House Shifting Services Charges</h2>
                <p className='p-3 '>If you are searching for the best "house shifting near me" then you are in the right place. Agarwal Packers and Movers offers the best household shifting charges near your preferred local location and across India.</p>
            </center>

            <div className='col-12 mt-4 p-2 table-responsive'>
                <h4>Local Shifting Services Charges</h4>
                {/* <div className='col-12 p-2 w-80 table-responsive'> */}
                <table className="table w-100 ">
                    <thead style={{ background: '#6B6565' }}>
                        <tr>
                            <th className="text-white text-center" style={{ fontSize: "18px" }} >Shifting Type</th>
                            <th className="text-white text-center" style={{ fontSize: "18px" }} >Up to 12 km</th>
                            <th className="text-white text-center" style={{ fontSize: "18px" }}>13 - 30 km</th>
                            <th className="text-white text-center" style={{ fontSize: "18px" }}>31+ km</th>
                        </tr>
                    </thead>
                    <tbody style={{ background: '#D9D9D9', margin: "auto" }}>
                    <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                    <th scope="row">1 BHK</th>
                    {   
                        agencyData.map((agency) => (
                            agency.Local_House_Shifting.map((entry, index) => (
                                <React.Fragment key={index}>
                                    {entry.BHK1 && (
                                        <>
                                            {userRole === id ? (
                                                <>
                                                    <td>Rs {entry.BHK1.upto12Km}</td>
                                                    <td>Rs {entry.BHK1.km13to30}</td>
                                                    <td>Rs {entry.BHK1.above31km}</td>
                                                </>
                                            ) : (
                                            
                                                <>
                                                    <td>Rs {entry.BHK1.upto12Km + entry.BHK1.upto12Km * 0.1}</td>
                                                    <td>Rs {entry.BHK1.km13to30 + entry.BHK1.km13to30 * 0.1}</td>
                                                    <td>Rs {entry.BHK1.above31km + entry.BHK1.above31km * 0.1}</td>
                                                </>
                                            )}
                                        </>
                                    )}
                                </React.Fragment>
                             ))
                        ))
                    }         
                    </tr>

                    <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                    <th scope="row">2 BHK</th>
                    {   
                        agencyData.map((agency) => (
                            agency.Local_House_Shifting.map((entry, index) => (
                                <React.Fragment key={index}>
                                    {entry.BHK2 && (
                                        <>
                                            {userRole === id ? (
                                                <>
                                                    <td>Rs {entry.BHK2.upto12Km}</td>
                                                    <td>Rs {entry.BHK2.km13to30}</td>
                                                    <td>Rs {entry.BHK2.above31km}</td>
                                                </>
                                            ) : (
                                            
                                                <>
                                                    <td>Rs {entry.BHK2.upto12Km + entry.BHK2.upto12Km * 0.1}</td>
                                                    <td>Rs {entry.BHK2.km13to30 + entry.BHK2.km13to30 * 0.1}</td>
                                                    <td>Rs {entry.BHK2.above31km + entry.BHK2.above31km * 0.1}</td>
                                                </>
                                            )}
                                        </>
                                    )}
                                </React.Fragment>
                             ))
                        ))
                    }
                    </tr>

                    <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                    <th scope="row">3 BHK</th>
                    {   
                        agencyData.map((agency) => (
                            agency.Local_House_Shifting.map((entry, index) => (
                                <React.Fragment key={index}>
                                    {entry.BHK3 && (
                                        <>
                                            {userRole === id ? (
                                                <>
                                                    <td>Rs {entry.BHK3.upto12Km}</td>
                                                    <td>Rs {entry.BHK3.km13to30}</td>
                                                    <td>Rs {entry.BHK3.above31km}</td>
                                                </>
                                            ) : (
                                            
                                                <>
                                                    <td>Rs {entry.BHK3.upto12Km + entry.BHK3.upto12Km * 0.1}</td>
                                                    <td>Rs {entry.BHK3.km13to30 + entry.BHK3.km13to30 * 0.1}</td>
                                                    <td>Rs {entry.BHK3.above31km + entry.BHK3.above31km * 0.1}</td>
                                                </>
                                            ) }
                                        </>
                                    )}
                                </React.Fragment>
                             ))
                        ))
                    }
                    </tr>

                    <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                    <th scope="row">4 - 5 BHK</th>
                    {   
                        agencyData.map((agency) => (
                            agency.Local_House_Shifting.map((entry, index) => (
                                <React.Fragment key={index}>
                                    {entry.BHK4to5 && (
                                        <>
                                            {userRole === id ? (
                                                <>
                                                    <td>Rs {entry.BHK4to5.upto12Km}</td>
                                                    <td>Rs {entry.BHK4to5.km13to30}</td>
                                                    <td>Rs {entry.BHK4to5.above31km}</td>
                                                </>
                                            ) :  (
                                            
                                                <>
                                                    <td>Rs {entry.BHK4to5.upto12Km + entry.BHK4to5.upto12Km * 0.1}</td>
                                                    <td>Rs {entry.BHK4to5.km13to30 + entry.BHK4to5.km13to30 * 0.1}</td>
                                                    <td>Rs {entry.BHK4to5.above31km + entry.BHK4to5.above31km * 0.1}</td>
                                                </>
                                            )}
                                        </>
                                    )}
                                </React.Fragment>
                             ))
                        ))
                    }
                    </tr>

                    <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                    <th scope="row">Complete Household</th>
                    {   
                        agencyData.map((agency) => (
                            agency.Local_House_Shifting.map((entry, index) => (
                                <React.Fragment key={index}>
                                    {entry.CompleteHousehold && (
                                        <>
                                            {userRole === id? (
                                                <>
                                                    <td>Rs {entry.CompleteHousehold.upto12Km}</td>
                                                    <td>Rs {entry.CompleteHousehold.km13to30}</td>
                                                    <td>Rs {entry.CompleteHousehold.above31km}</td>
                                                </>
                                            ) : (
                                            
                                                <>
                                                    <td>Rs {entry.CompleteHousehold.upto12Km + entry.CompleteHousehold.upto12Km * 0.1}</td>
                                                    <td>Rs {entry.CompleteHousehold.km13to30 + entry.CompleteHousehold.km13to30 * 0.1}</td>
                                                    <td>Rs {entry.CompleteHousehold.above31km + entry.CompleteHousehold.above31km * 0.1}</td>
                                                </>
                                            )}
                                        </>
                                    )}
                                </React.Fragment>
                             ))
                        ))
                    }
                    </tr>
                    </tbody>
                </table>
            </div>
            {/* </div> */}
        </section>

        <section className="container">
            <center>
                <h2>Domestic House Shifting Services Charges</h2>
            </center>
            <div className='col-12 mt-4 p-2 table-responsive'>
                <h4>City Shifting Services Charges</h4>
                {/* <div className='col-12 p-2 w-80 table-responsive'> */}
                <table className="table w-100 ">
                    <thead style={{ background: '#6B6565' }}>
                        <tr>
                            <th className="text-white text-center" style={{ fontSize: "18px" }} >Shifting Type</th>
                            <th className="text-white text-center" style={{ fontSize: "18px" }} >Up to 100 km</th>
                            <th className="text-white text-center" style={{ fontSize: "18px" }} >100 - 400 km</th>
                            <th className="text-white text-center" style={{ fontSize: "18px" }} >400 - 800 km</th>
                        </tr>
                    </thead>
                    <tbody style={{ background: '#D9D9D9', margin: "auto" }}>
                        <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                        <th scope="row">1 BHK</th>
                        {   
                            agencyData.map((agency) => (
                                agency.City_House_Shifting.map((entry, index) => (
                                    <React.Fragment key={index}>
                                        {entry.BHK1 && (
                                            <>
                                                {userRole === id ? (
                                                    <>
                                                        <td>Rs {entry.BHK1.upto100Km}</td>
                                                        <td>Rs {entry.BHK1.km100to400}</td>
                                                        <td>Rs {entry.BHK1.km400to800}</td>
                                                    </>
                                                ) : (
                                                
                                                    <>
                                                        <td>Rs {entry.BHK1.upto100Km  + entry.BHK1.upto100Km  * 0.1}</td>
                                                        <td>Rs {entry.BHK1.km100to400 + entry.BHK1.km100to400 * 0.1}</td>
                                                        <td>Rs {entry.BHK1.km400to800 + entry.BHK1.km400to800 * 0.1}</td>
                                                    </>
                                                ) }
                                            </>
                                        )}
                                    </React.Fragment>
                                ))
                            ))
                        }
                        </tr>
                        <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                            <th scope="row">2 BHK</th>
                            {   
                                agencyData.map((agency) => (
                                    agency.City_House_Shifting.map((entry, index) => (
                                        <React.Fragment key={index}>
                                            {entry.BHK2 && (
                                                <>
                                                    {userRole === id ? (
                                                        <>
                                                            <td>Rs {entry.BHK2.upto100Km}</td>
                                                            <td>Rs {entry.BHK2.km100to400}</td>
                                                            <td>Rs {entry.BHK2.km400to800}</td>
                                                        </>
                                                    ) : (
                                                    
                                                        <>
                                                            <td>Rs {entry.BHK2.upto100Km  + entry.BHK2.upto100Km  * 0.1}</td>
                                                            <td>Rs {entry.BHK2.km100to400 + entry.BHK2.km100to400 * 0.1}</td>
                                                            <td>Rs {entry.BHK2.km400to800 + entry.BHK2.km400to800 * 0.1}</td>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </React.Fragment>
                                    ))
                                ))
                            }
                        </tr>
                        <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                        <th scope="row">3 BHK</th>
                        {   
                            agencyData.map((agency) => (
                                agency.City_House_Shifting.map((entry, index) => (
                                    <React.Fragment key={index}>
                                        {entry.BHK3 && (
                                            <>
                                                {userRole === id ? (
                                                    <>
                                                        <td>Rs {entry.BHK3.upto100Km}</td>
                                                        <td>Rs {entry.BHK3.km100to400}</td>
                                                        <td>Rs {entry.BHK3.km400to800}</td>
                                                    </>
                                                ) : (
                                                
                                                    <>
                                                        <td>Rs {entry.BHK3.upto100Km + entry.BHK3.upto100Km * 0.1}</td>
                                                        <td>Rs {entry.BHK3.km100to400 + entry.BHK3.km100to400 * 0.1}</td>
                                                        <td>Rs {entry.BHK3.km400to800 + entry.BHK3.km400to800 * 0.1}</td>
                                                    </>
                                                ) }
                                            </>
                                        )}
                                    </React.Fragment>
                                ))
                            ))
                        }
                        </tr>
                        <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                        <th scope="row">4 - 5 BHK</th>
                        {   
                            agencyData.map((agency) => (
                                agency.City_House_Shifting.map((entry, index) => (
                                    <React.Fragment key={index}>
                                        {entry.BHK4to5 && (
                                            <>
                                                {userRole === id ? (
                                                    <>
                                                        <td>Rs {entry.BHK4to5.upto100Km}</td>
                                                        <td>Rs {entry.BHK4to5.km100to400}</td>
                                                        <td>Rs {entry.BHK4to5.km400to800}</td>
                                                    </>
                                                ) : (
                                                
                                                    <>
                                                        <td>Rs {entry.BHK4to5.upto100Km  + entry.BHK4to5.upto100Km  * 0.1}</td>
                                                        <td>Rs {entry.BHK4to5.km100to400 + entry.BHK4to5.km100to400 * 0.1}</td>
                                                        <td>Rs {entry.BHK4to5.km400to800 + entry.BHK4to5.km400to800 * 0.1}</td>
                                                    </>
                                                ) }
                                            </>
                                        )}
                                    </React.Fragment>
                                ))
                            ))
                        }
                        </tr>

                        <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                        <th scope="row">Complete Household</th>
                        {   
                            agencyData.map((agency) => (
                                agency.City_House_Shifting.map((entry, index) => (
                                    <React.Fragment key={index}>
                                        {entry.CompleteHousehold && (
                                            <>
                                                {userRole === id? (
                                                    <>
                                                        <td>Rs {entry.CompleteHousehold.upto100Km}</td>
                                                        <td>Rs {entry.CompleteHousehold.km100to400}</td>
                                                        <td>Rs {entry.CompleteHousehold.km400to800}</td>
                                                    </>
                                                ) :  (
                                                
                                                    <>
                                                        <td>Rs {entry.CompleteHousehold.upto100Km  + entry.CompleteHousehold.upto100Km  * 0.1}</td>
                                                        <td>Rs {entry.CompleteHousehold.km100to400 + entry.CompleteHousehold.km100to400 * 0.1}</td>
                                                        <td>Rs {entry.CompleteHousehold.km400to800 + entry.CompleteHousehold.km400to800 * 0.1}</td>
                                                    </>
                                                ) }
                                            </>
                                        )}
                                    </React.Fragment>
                                ))
                            ))
                        }                                
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        {/* <section className="container">
            <center>
                <h2>State House Shifting Services Charges</h2>
            </center>
            <div className='col-12 mt-4 p-2 table-responsive'>
                <h4>State Shifting Services Charges</h4>
                {/* <div className='col-12 p-2 w-80 table-responsive'> 
                <table className="table w-100 ">
                    <thead style={{ background: '#6B6565' }}>
                        <tr>
                            <th className="text-white text-center" style={{ fontSize: "18px" }}>Shifting Type</th>
                            <th className="text-white text-center" style={{ fontSize: "18px" }}>Up to 900 km</th>
                            <th className="text-white text-center" style={{ fontSize: "18px" }}>900 - 1300 km</th>
                            <th className="text-white text-center" style={{ fontSize: "18px" }}>1300 - 1700 km</th>
                        </tr>
                    </thead>
                    <tbody style={{ background: '#D9D9D9', margin: "auto" }}>
                        <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                        <th scope="row">1 BHK</th>
                        {   
                            agencyData.map((agency) => (
                                agency.State_House_Shifting.map((entry, index) => (
                                    <React.Fragment key={index}>
                                        {entry.BHK1 && (
                                            <>
                                                {userRole === id ? (
                                                    <>
                                                        <td>Rs {entry.BHK1.upto900Km}</td>
                                                        <td>Rs {entry.BHK1.km900to1300}</td>
                                                        <td>Rs {entry.BHK1.km1300to1700}</td>
                                                    </>
                                                ) : (
                                                
                                                    <>
                                                        <td>Rs {entry.BHK1.upto900Km    + entry.BHK1.upto900Km    * 0.1}</td>
                                                        <td>Rs {entry.BHK1.km900to1300  + entry.BHK1.km900to1300  * 0.1}</td>
                                                        <td>Rs {entry.BHK1.km1300to1700 + entry.BHK1.km1300to1700 * 0.1}</td>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </React.Fragment>
                                ))
                            ))
                        }   
                        </tr>

                        <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                        <th scope="row">2 BHK</th>
                        {   
                            agencyData.map((agency) => (
                                agency.State_House_Shifting.map((entry, index) => (
                                    <React.Fragment key={index}>
                                        {entry.BHK2 && (
                                            <>
                                                {userRole === id ? (
                                                    <>
                                                        <td>Rs {entry.BHK2.upto900Km}</td>
                                                        <td>Rs {entry.BHK2.km900to1300}</td>
                                                        <td>Rs {entry.BHK2.km1300to1700}</td>
                                                    </>
                                                ) :  (
                                                
                                                    <>
                                                        <td>Rs {entry.BHK2.upto900Km    + entry.BHK2.upto900Km    * 0.1}</td>
                                                        <td>Rs {entry.BHK2.km900to1300  + entry.BHK2.km900to1300  * 0.1}</td>
                                                        <td>Rs {entry.BHK2.km1300to1700 + entry.BHK2.km1300to1700 * 0.1}</td>
                                                    </>
                                                ) }
                                            </>
                                        )}
                                    </React.Fragment>
                                ))
                            ))
                        }             
                        </tr>


                        <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                        <th scope="row">3 BHK</th>
                        {   
                            agencyData.map((agency) => (
                                agency.State_House_Shifting.map((entry, index) => (
                                    <React.Fragment key={index}>
                                        {entry.BHK3 && (
                                            <>
                                                {userRole === id? (
                                                    <>
                                                        <td>Rs {entry.BHK3.upto900Km}</td>
                                                        <td>Rs {entry.BHK3.km900to1300}</td>
                                                        <td>Rs {entry.BHK3.km1300to1700}</td>
                                                    </>
                                                ) : (
                                                
                                                    <>
                                                        <td>Rs {entry.BHK3.upto900Km    + entry.BHK3.upto900Km    * 0.1}</td>
                                                        <td>Rs {entry.BHK3.km900to1300  + entry.BHK3.km900to1300  * 0.1}</td>
                                                        <td>Rs {entry.BHK3.km1300to1700 + entry.BHK3.km1300to1700 * 0.1}</td>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </React.Fragment>
                                ))
                            ))
                        }
                        </tr>

                        <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                        <th scope="row">4 - 5 BHK</th>
                        {   
                            agencyData.map((agency) => (
                                agency.State_House_Shifting.map((entry, index) => (
                                    <React.Fragment key={index}>
                                        {entry.BHK4to5 && (
                                            <>
                                                {userRole === id ? (
                                                    <>
                                                        <td>Rs {entry.BHK4to5.upto900Km}</td>
                                                        <td>Rs {entry.BHK4to5.km900to1300}</td>
                                                        <td>Rs {entry.BHK4to5.km1300to1700}</td>
                                                    </>
                                                ) :(
                                                
                                                    <>
                                                        <td>Rs {entry.BHK4to5.upto900Km    + entry.BHK4to5.upto900Km    * 0.1}</td>
                                                        <td>Rs {entry.BHK4to5.km900to1300  + entry.BHK4to5.km900to1300  * 0.1}</td>
                                                        <td>Rs {entry.BHK4to5.km1300to1700 + entry.BHK4to5.km1300to1700 * 0.1}</td>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </React.Fragment>
                                ))
                            ))
                        }     
                        </tr>

                        <tr style={{ borderBottom: '2px solid #6B6565', textAlign: "center" }}>
                        <th scope="row">Complete Household</th>
                        {   
                            agencyData.map((agency) => (
                                agency.State_House_Shifting.map((entry, index) => (
                                    <React.Fragment key={index}>
                                        {entry.CompleteHousehold && (
                                            <>
                                                {userRole === id ? (
                                                    <>
                                                        <td>Rs {entry.CompleteHousehold.upto900Km}</td>
                                                        <td>Rs {entry.CompleteHousehold.km900to1300}</td>
                                                        <td>Rs {entry.CompleteHousehold.km1300to1700}</td>
                                                    </>
                                                ) : (
                                                
                                                    <>
                                                        <td>Rs {entry.CompleteHousehold.upto900Km    + entry.CompleteHousehold.upto900Km    * 0.1}</td>
                                                        <td>Rs {entry.CompleteHousehold.km900to1300  + entry.CompleteHousehold.km900to1300  * 0.1}</td>
                                                        <td>Rs {entry.CompleteHousehold.km1300to1700 + entry.CompleteHousehold.km1300to1700 * 0.1}</td>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </React.Fragment>
                                ))
                            ))
                        }                                
                        </tr>
                    </tbody>
                </table>
            </div>
        </section> */}
    </>);
}

export default Agency_Profile;