import './customer_services.css';
import axios from 'axios';
import data from './Json';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import electrician from '../../images/electrician.jpg';
import { requestedURL } from '../../urls';
import { useLocation } from 'react-router-dom';

function Customer_Services() {
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(6);
    const [services, setServices] = useState();
    const [CurrentPosts, setCurrentPost] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [initialtype, setSelectedServiceType] = useState('');
    
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const location = useLocation();
    console.log('location  ', location.state.Category);
    const backendBaseUrl = 'http://localhost:3001';

    useEffect(() => {
        async function fetchData() {
            console.log("useEffect====>");
            var result = await axios.get(requestedURL + '/Customer_services');
            console.log("wholedata ", result.data.services);

            const Initialtype = location.state.Category; // Get the selected category from the location state
            setSelectedServiceType(Initialtype);
            // Filter services based on the selected category
            const filteredServices = result.data.services.filter(service => service.Service_type === Initialtype);
            console.log("filter", filteredServices);
            console.log("category", selectedCategory);
            setServices(filteredServices);
            if (selectedCategory === "All") {
                const currentPosts = filteredServices.slice(firstPostIndex, lastPostIndex);
                console.log('current  ', currentPosts);
                setCurrentPost(currentPosts);
            } else if (selectedCategory === "Primary") {
                const primaryData = filteredServices.flatMap(service => service.Primary);
                const currentPosts = primaryData.slice(firstPostIndex, lastPostIndex);
                console.log('current primary ', currentPosts);
                setCurrentPost(currentPosts);
            } else if (selectedCategory === "Secondary") {
                const secondaryData = filteredServices.flatMap(service => service.Secondary);
                const currentPosts = secondaryData.slice(firstPostIndex, lastPostIndex);
                console.log('current secondary ', currentPosts);
                setCurrentPost(currentPosts);
            } else if (selectedCategory === "Tertiary") {
                const tertiaryData = filteredServices.flatMap(service => service.Tertiary);
                const currentPosts = tertiaryData.slice(firstPostIndex, lastPostIndex);
                console.log('current tertiary ', currentPosts);
                setCurrentPost(currentPosts);
            }
        }
        fetchData();
    }, [selectedCategory, initialtype, location.state.Category, firstPostIndex, lastPostIndex]);

    return (
        <>
            <section id='service_provider' className='flex-column text-light d-flex justify-content-center align-items-center'>
                <h2 style={{ zIndex: '1' }}>{initialtype}</h2>
                <p style={{ zIndex: '1' }}>Home <i className="fa fa-arrow-right fw-light" aria-hidden="true"></i>  {initialtype}</p>
            </section>
            <section id='services_card '>
                <div className='my-2 rounded-0 bg-yellow p-2 w-100 d-flex justify-content-center align-items-center'>
                    <h2>Our {initialtype} Services</h2>
                </div>
                <div className='container pt-2'>
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
                                                            <img src={`${backendBaseUrl}/uploads/${item.ServiceImage}`} style={{ width: '100%', height: '100%' }} alt={`ServiceImage`} />
                                                            {/* {`%PUBLIC_URL%/images/${portraitFile}` */}
                                                        </div>
                                                        <div className='card-body'>
                                                            <div className='w-100 d-flex justify-content-between align-items-center'>
                                                                <h5 className='fw-bold'>{item.ServiceName}</h5>
                                                                <h6>&#x20B9; {item.ServicePrice}</h6>
                                                            </div>
                                                            <div className='w-100 p-1'>
                                                                <p>{item.ServiceDesc}</p>
                                                            </div>
                                                            <div className='w-100 p-1 d-flex justify-content-end align-items-center'>
                                                                <button className='btn w-50 fw-bold' style={{ background: '#E99457' }}>Add</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Display details for each item in the Primary array */}
                                                {item.Primary && item.Primary.map((primaryItem, primaryIndex) => (
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
                                                                    <h6>&#x20B9; {primaryItem.ServicePrice}</h6>
                                                                </div>
                                                                <div className='w-100 p-1'>
                                                                    <p>{primaryItem.ServiceDesc}</p>
                                                                </div>
                                                                <div className='w-100 p-1 d-flex justify-content-end align-items-center'>
                                                                    <button className='btn w-50 fw-bold'  style={{ background: '#E99457' }}>Add</button>
                                                                </div>
                                                            </div>
                                                            {/* Use primaryItem for the data */}
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Display details for each item in the Secondary array */}
                                                {item.Secondary && item.Secondary.map((secondaryItem, secondaryIndex) => (
                                                    <div className='col-md-4 px-4 my-2' key={`secondary-${secondaryIndex}`}>
                                                        <div className='card border-1'>
                                                            {/* Repeat the structure similar to the main service type card */}
                                                            <div className='card-img-top'>
                                                                {/* <img src={secondaryItem.ServiceImage} style={{ width: '100%', height: '100%' }} alt={`ServiceImage`}/> */}
                                                                <img src={`${backendBaseUrl}/uploads/${secondaryItem.ServiceImage}`} style={{ width: '100%', height: '100%' }} alt={`ServiceImage`} />
                                                            </div>
                                                            <div className='card-body'>
                                                                <div className='w-100 d-flex justify-content-between align-items-center'>
                                                                    <h5 className='fw-bold'>{secondaryItem.ServiceName}</h5>
                                                                    <h6>&#x20B9; {secondaryItem.ServicePrice}</h6>
                                                                </div>
                                                                <div className='w-100 p-1'>
                                                                    <p>{secondaryItem.ServiceDesc}</p>
                                                                </div>
                                                                <div className='w-100 p-1 d-flex justify-content-end align-items-center'>
                                                                    <button className='btn w-50 fw-bold'  style={{ background: '#E99457' }}>Add</button>
                                                                </div>
                                                            </div>
                                                            {/* Use primaryItem for the data */}
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Display details for each item in the Tertiary array */}
                                                {item.Tertiary && item.Tertiary.map((tertiaryItem, tertiaryIndex) => (
                                                    <div className='col-md-4 px-4 my-2' key={`tertiary-${tertiaryIndex}`}>
                                                        <div className='card border-1'>
                                                            {/* Repeat the structure similar to the main service type card */}
                                                            <div className='card-img-top'>
                                                                {/* <img src={tertiaryItem.ServiceImage} style={{ width: '100%', height: '100%' }} alt={`ServiceImage`} /> */}
                                                                <img src={`${backendBaseUrl}/uploads/${tertiaryItem.ServiceImage}`} style={{ width: '100%', height: '100%' }} alt={`ServiceImage`} />
                                                            </div>
                                                            <div className='card-body'>
                                                                <div className='w-100 d-flex justify-content-between align-items-center'>
                                                                    <h5 className='fw-bold'>{tertiaryItem.ServiceName}</h5>
                                                                    <h6>&#x20B9; {tertiaryItem.ServicePrice}</h6>
                                                                </div>
                                                                <div className='w-100 p-1'>
                                                                    <p>{tertiaryItem.ServiceDesc}</p>
                                                                </div>
                                                                <div className='w-100 p-1 d-flex justify-content-end align-items-center'>
                                                                    <button className='btn w-50 fw-bold'  style={{ background: '#E99457' }}>Add</button>
                                                                </div>
                                                            </div>
                                                            {/* Use primaryItem for the data */}
                                                        </div>
                                                    </div>
                                                ))}
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
                                    <select
                                        className="form-control"
                                        value={initialtype}
                                        onChange={(e) => setSelectedServiceType(e.target.value)}
                                    >
                                        <option value="">Select Services</option>
                                        <option value="Electrician">Electrician</option>
                                        <option value="Cleaner">Cleaner</option>
                                        <option value="Salon">Salon</option>
                                        <option value="Shifting Agency">Shifting Agency</option>
                                        <option value="Cook">Cook</option>
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
                                    <div class="form-check my-1">
                                        <input
                                            class="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            value='All'
                                            id="flexRadioDefault1"
                                            checked={selectedCategory === 'All'}
                                            onChange={(event) => setSelectedCategory(event.target.value)}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            All
                                        </label>
                                    </div>
                                    <div class="form-check my-1">
                                        <input
                                            class="form-check-input"
                                            type="radio"
                                            value='Primary'
                                            name="flexRadioDefault"
                                            id="flexRadioDefault2"
                                            checked={selectedCategory === 'Primary'}
                                            onChange={(event) => setSelectedCategory(event.target.value)}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Primary
                                        </label>
                                    </div>
                                    <div class="form-check my-1">
                                        <input
                                            class="form-check-input"
                                            value='Secondary'
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault3"
                                            checked={selectedCategory === 'Secondary'}
                                            onChange={(event) => setSelectedCategory(event.target.value)}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault3">
                                            Secondary
                                        </label>
                                    </div>
                                    <div class="form-check my-1">
                                        <input
                                            class="form-check-input"
                                            value='Tertiary'
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault4"
                                            checked={selectedCategory === 'Tertiary'}
                                            onChange={(event) => setSelectedCategory(event.target.value)}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault4">
                                            Tertiary
                                        </label>
                                    </div>
                                </form>

                            </div>
                            <div className='w-100 mt-3 p-2' style={{ background: 'white', boxShadow: '0 0 2px rgba(0,0,0,0.3)' }}>
                                <div className='p-2 w-100 d-flex justify-content-between align-items-center'>
                                    <h5 className='fw-bold'>Add To Cart</h5>
                                    <h5 className='fw-bold'><i className='fa fa-cart-shopping'></i> </h5>
                                </div>
                                <div className='card'>

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