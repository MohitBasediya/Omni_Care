import './customer_services.css';
import axios from 'axios';
import data from './Json';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { requestedURL } from '../../urls';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userData } from '../../store/userSlice.js';
import Swal from 'sweetalert2';
import Cookie from 'js-cookie';

function Customer_Services() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(6);
    const [services, setServices] = useState();
    const [CurrentPosts, setCurrentPost] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [initialtype, setSelectedServiceType] = useState('');
    const [status, setState] = useState(false);
    const [bookcategory,setBookCategory] = useState('');
    const [cartItems, setCartItems] = useState([]);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const location = useLocation();
    
    const backendBaseUrl = 'http://localhost:3001';
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    useEffect(() => {
        
        async function fetchData() {
            var result = await axios.get(requestedURL + '/Customer_services');

            var initialtypeFromLocation = location.state.Category;
            var initialtypeUse = initialtype || initialtypeFromLocation;

            let filteredServices;
            if(initialtypeUse==='Shifting Agency') 
                navigate('/agency_list');
            const newStatus = initialtypeUse === 'Cooking' || initialtype === 'Cooking';
            setState(newStatus);
            setSelectedServiceType(initialtypeUse);
            if (newStatus) {
                // If the condition is true, set the current posts to Cookdata
                filteredServices = result.data.Cookdata;
                setState(true);
            } else {
                // Otherwise, filter services based on the selected category
                filteredServices = result.data.services.filter(service => service.Service_type === initialtypeUse);
            }
            setServices(filteredServices);
            if (selectedCategory === "All") {
                const currentPosts = filteredServices.slice(firstPostIndex, lastPostIndex);
                setCurrentPost(currentPosts);
            } else if (selectedCategory === "Primary") {
                const primaryData = filteredServices.flatMap(service => service.Primary);
                const currentPosts = primaryData.slice(firstPostIndex, lastPostIndex);
                setCurrentPost(currentPosts);
            } else if (selectedCategory === "Secondary") {
                const secondaryData = filteredServices.flatMap(service => service.Secondary);
                const currentPosts = secondaryData.slice(firstPostIndex, lastPostIndex);
                setCurrentPost(currentPosts);
            } else if (selectedCategory === "Tertiary") {
                const tertiaryData = filteredServices.flatMap(service => service.Tertiary);
                const currentPosts = tertiaryData.slice(firstPostIndex, lastPostIndex);
                setCurrentPost(currentPosts);
            } else if (selectedCategory === "Rajasthani" && newStatus) {
                const rajasthaniData = filteredServices.flatMap(service => service.Rajasthani);
                const currentPosts = rajasthaniData.slice(firstPostIndex, lastPostIndex);
                setCurrentPost(currentPosts);
            } else if (selectedCategory === "South_Indian" && newStatus) {
                const southIndianData = filteredServices.flatMap(service => service.South_Indian);
                const currentPosts = southIndianData.slice(firstPostIndex, lastPostIndex);
                setCurrentPost(currentPosts);
            } else if (selectedCategory === "Gujarati" && newStatus) {
                const gujaratiData = filteredServices.flatMap(service => service.Gujarati);
                const currentPosts = gujaratiData.slice(firstPostIndex, lastPostIndex);
                setCurrentPost(currentPosts);
            } else if (selectedCategory === "Normal" && newStatus) {
                const normalData = filteredServices.flatMap(service => service.Normal);
                const currentPosts = normalData.slice(firstPostIndex, lastPostIndex);
                setCurrentPost(currentPosts);
            } else if (selectedCategory === "Chineses" && newStatus) {
                const Chineses = filteredServices.flatMap(service => service.Normal);
                const currentPosts = Chineses.slice(firstPostIndex, lastPostIndex);
                setCurrentPost(currentPosts);
            }
        }
        fetchData();
    }, [selectedCategory,initialtype,location.state.Category,firstPostIndex,lastPostIndex]);
    const addCart = (selectedService) => {
        var category = bookcategory;
        if (!category.includes(selectedCategory)) {
            category += selectedCategory + ' ';
            setBookCategory(category);
        }

        const updatedService = { ...selectedService, ServicePrice: selectedService.ServicePrice + ((selectedService.ServicePrice / 100) * 10) };    
        const isServiceInCart = cartItems.find(item => item.ServiceName === updatedService.ServiceName);    
        if (isServiceInCart) {
            Swal.fire({ icon: 'error', text: 'This service is already added in the cart' })
        } else {
            // Add the updated service to the cart
            setCartItems(prevCart => [...prevCart, { ...updatedService, Quantity: 1 }]);
        }
    };    
    
    const removecartitem=(index)=>{
        var cart=[...cartItems];
        cart.splice(index,1);
        setCartItems([...cart]);
    }

    const booking=async(e)=>{
     e.preventDefault();
      var cookie_token= Cookie.get('Login_Jwt_token');
       if(cookie_token){
         try{
            var result = await axios.post(requestedURL+'/awt_login',{token:cookie_token});                                     
             if(result.status==201){
                dispatch(userData(result.data.data));
                if(result.data.role === 'Service Provider'){
                  navigate('/booking',{state:{serviceData:cartItems,serviceType:initialtype,serviceCategory:bookcategory}});
                }
                else{
                  navigate('/booking',{state:{serviceData:cartItems,serviceType:initialtype,serviceCategory:bookcategory}});
                }
             }
             else{ 
                Swal.fire({icon:'error',text:'First login yourself'})                       
                navigate('/')
             }
         }catch(err){
             console.log("Error while dealing with login in login component",err);
             Swal.fire("Error while dealing with backend");
         }                
       }
       else{
          Swal.fire({icon:'error',text:'First login yourself'})
          navigate("/");
       }
    }
    return (
        <>
            <section id='service_provider' className='flex-column text-light d-flex justify-content-center align-items-center'>
                <h2 style={{ zIndex: '1' }}>{initialtype}</h2>
                <p style={{ zIndex: '1' }}>Home <i className="fa fa-arrow-right fw-light" aria-hidden="true"></i>{initialtype}</p>
            </section>
            <section id='services_card '>               
                <div className='container pt-2'>
                    <div className='w-100 py-2 bg-yellow'>
                     <h3 className='text-center'>{initialtype} Services</h3>
                    </div>
                    <div className='row'>
                        <div className='col-md-9'>                            
                            <div className='container py-2 '>
                                <div className='row'>
                                    {
                                        CurrentPosts.map((item, index) => (
                                            <>
                                                <div className='col-md-4 px-4 my-2' key={`primary-${index}`}>
                                                    <div className='card border-1'>
                                                        <div className='card-img-top'>
                                                            <img src={`${backendBaseUrl}/uploads/${item.ServiceImage}`} style={{ width: '100%', height: '180px' }} alt={`ServiceImage`} />
                                                        </div>
                                                        <div className='card-body'>
                                                            <div className='w-100 d-flex justify-content-between align-items-center'>
                                                                <h5 className='fw-bold'>{item.ServiceName}</h5>
                                                                <h6>&#x20B9; {item.ServicePrice+ ((item.ServicePrice/100) * 10)}</h6>
                                                            </div>
                                                            <div className='w-100 p-1'>
                                                                <p>{item.ServiceDesc}</p>
                                                            </div>
                                                            <div className='w-100 p-1 d-flex justify-content-end align-items-center'>
                                                                <button className='btn py-2 px-1 mt-2 w-50 fw-bold' onClick={() => addCart(item)} style={{ background: '#E99457',color:'white' }}>Add</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Display details for each item in the Primary array */}
                                                {(item.Primary || item.Secondary || item.Tertiary || item.Rajasthani || item.Gujarati || item.South_Indian || item.Chinese || item.Normal) && (
                                                    [].concat(item.Primary || [], item.Secondary || [], item.Tertiary || [], item.Rajasthani || [], item.Gujarati || [], item.South_Indian || [], item.Chinese || [], item.Normal || []).map((primaryItem, primaryIndex) => (
                                                        <div className='col-md-4 px-4 my-2' key={`primary-${primaryIndex}`}>
                                                            <div className='card border-1'>
                                                                {/* Repeat the structure similar to the main service type card */}
                                                                <div className='card-img-top'>
                                                                    {/* <img src={primaryItem.ServiceImage} style={{ width: '100%', height: '100%' }} alt={`ServiceImage`} /> */}
                                                                    <img src={`${backendBaseUrl}/uploads/${primaryItem.ServiceImage}`} style={{ width: '100%', height: '100%' }} alt={`ServiceImage`} />
                                                                </div>
                                                                <div className='card-body'>
                                                                    <div className='w-100 d-flex justify-content-between align-items-center'>
                                                                        <h5 className='fw-bold'>{primaryItem.ServiceName}</h5>
                                                                        <h6>&#x20B9; {primaryItem.ServicePrice + ((primaryItem.ServicePrice/100) * 10)}</h6>
                                                                    </div>
                                                                    <div className='w-100 p-1'>
                                                                        <p>{primaryItem.ServiceDesc}</p>
                                                                    </div>
                                                                    <div className='w-100 p-1 d-flex justify-content-end align-items-center'>
                                                                        <button className='btn py-2 px-1 mt-3 w-50 fw-bold' onClick={() => addCart(primaryItem)} style={{ background: '#E99457',color:'white' }}>Add</button>
                                                                    </div>
                                                                </div>
                                                                {/* Use primaryItem for the data */}
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='container py-2 d-flex justify-content-center'>
                                <Pagination totalPosts={data.length} setCurrentPage={setCurrentPage} postPerPage={postPerPage} currentPage={currentPage} />
                            </div>
                        </div>
                        <div className='col-md-3 py-3 d-flex flex-column justify-content-start'>
                            <h5 className='fw-bold'>Search</h5>
                            <form>
                                <div className="input-group mb-3">
                                    <select className="form-control" value={initialtype} onChange={(e) => setSelectedServiceType(e.target.value)}>
                                        <option value="">Select Services</option>
                                        <option value="Electrician">Electrician</option>
                                        <option value="Cleaner">Cleaner</option>
                                        <option value="Salon">Salon</option>
                                        <option value="Shifting Agency">Shifting Agency</option>
                                        <option value="Cooking">Cook</option>
                                    </select>
                                    <button
                                        className="input-group-text bg-dark"
                                        type="submit"
                                        id="basic-addon1"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fa fa-search text-light"></i>
                                    </button>
                                </div>
                            </form>
                            <div className='w-100 my-2 p-2 d-flex justify-content-center flex-column' style={{ background: 'white', boxShadow: '0 0 3px rgba(0,0,0,0.3)' }}>
                                <h5 className='fw-bold'>Category</h5>
                                <form className='p-2'>

                                    {status ? (<>
                                        <div className="form-check my-1">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" value="All" id="flexRadioDefault1" checked={selectedCategory === 'All'} onChange={(event) => setSelectedCategory(event.target.value)} />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                All
                                            </label>
                                        </div>

                                        {/* Rajasthani */}
                                        <div className="form-check my-1">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" value="Rajasthani" id="flexRadioDefaultRajasthani" checked={selectedCategory === 'Rajasthani'} onChange={(event) => setSelectedCategory(event.target.value)} />
                                            <label className="form-check-label" htmlFor="flexRadioDefaultRajasthani">
                                                Rajasthani
                                            </label>
                                        </div>

                                        {/* South Indian */}
                                        <div className="form-check my-1">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" value="South_Indian" id="flexRadioDefaultSouthIndian" checked={selectedCategory === 'South_Indian'} onChange={(event) => setSelectedCategory(event.target.value)}/>
                                            <label className="form-check-label" htmlFor="flexRadioDefaultSouthIndian">
                                                South Indian
                                            </label>
                                        </div>

                                        {/* Gujarati */}
                                        <div className="form-check my-1">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" value="Gujarati" id="flexRadioDefaultGujarati" checked={selectedCategory === 'Gujarati'} onChange={(event) => setSelectedCategory(event.target.value)}/>
                                            <label className="form-check-label" htmlFor="flexRadioDefaultGujarati">
                                                Gujarati
                                            </label>
                                        </div>
                                        <div className="form-check my-1">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" value="Chineses" id="flexRadioDefaultGujarati" checked={selectedCategory === 'Chineses'} onChange={(event) => setSelectedCategory(event.target.value)}/>
                                            <label className="form-check-label" htmlFor="flexRadioDefaultGujarati">
                                                Chinese
                                            </label>
                                        </div>

                                        {/* Normal */}
                                        <div className="form-check my-1">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" value="Normal" id="flexRadioDefaultNormal" checked={selectedCategory === 'Normal'} onChange={(event) => setSelectedCategory(event.target.value)}/>
                                            <label className="form-check-label" htmlFor="flexRadioDefaultNormal">
                                                Normal
                                            </label>
                                        </div>
                                    </>) : (
                                        <> 
                                            <div className="form-check my-1">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" value="All" id="flexRadioDefault1" checked={selectedCategory === 'All'} onChange={(event) => setSelectedCategory(event.target.value)}/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    All
                                                </label>
                                            </div>

                                            {/* Primary */}
                                            <div className="form-check my-1">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" value="Primary" id="flexRadioDefault2" checked={selectedCategory === 'Primary'} onChange={(event) => setSelectedCategory(event.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    Primary
                                                </label>
                                            </div>

                                            {/* Secondary */}
                                            <div className="form-check my-1">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" value="Secondary" id="flexRadioDefault3" checked={selectedCategory === 'Secondary'} onChange={(event) => setSelectedCategory(event.target.value)}/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                    Secondary
                                                </label>
                                            </div>

                                            {/* Tertiary */}
                                            <div className="form-check my-1">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" value="Tertiary" id="flexRadioDefault4" checked={selectedCategory === 'Tertiary'} onChange={(event) => setSelectedCategory(event.target.value)} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault4">
                                                    Tertiary
                                                </label>
                                            </div>
                                        </>
                                    )}
                                </form>

                            </div>
                            <div className='w-100 mt-3 p-2' style={{ background: 'white', boxShadow: '0 0 2px rgba(0,0,0,0.3)' }}>
                                <div className='p-2 w-100 d-flex justify-content-between align-items-center'>
                                    <h5 className='fw-bold'> Cart Items</h5>
                                    <h5 className='fw-bold'><i className='fa fa-cart-shopping'></i> {cartItems.length}</h5>
                                </div>
                                <div className='card'>
                                    {/* Map through cartItems and display each item */}
                                    {cartItems.map((cartItem, index) => (
                                        <div key={`cart-item-${index}`} className=' position-relative d-flex justify-content-between align-items-center p-2'>
                                            <div className='w-50 p-2'>
                                                <h6>{cartItem.ServiceName}</h6>
                                                <p>&#x20B9; {cartItem.ServicePrice}</p>
                                            </div>
                                            <div className='w-25 p-2 position-absolute d-flex justify-content-end' style={{right:'0',top:'10px'}}>
                                                <p><i className='fa fa-trash text-dark ' style={{cursor:'pointer'}} onClick={()=>{removecartitem(index)}}></i></p>
                                            </div>                                            
                                        </div>                                        
                                    ))}
                                    <div className='d-flex justify-content-center py-2 w-100 bg-light'>
                                        <button className='btn bg-yellow text-dark' onClick={(e)=>{
                                            booking(e)
                                        }}>Book Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Customer_Services;