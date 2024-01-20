import ang_img from '../../images/shifting.jpg';
import { Modal } from 'reactstrap';
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { requestedURLForServiceProvider } from '../../urls.js'
import state_arr from './City_State_Array.js';
import s_a from './City_State_Array.js';
import axios from "axios";

var OId = '';

function Agency_registration() {

    const navigate = useNavigate();
    const location = useLocation();

    const [Address, setAddress] = useState(false);
    const [State, setStatee] = useState(false);
    const [City, setCity] = useState(false);
    const [AgencyName, setAgencyName] = useState(false);
    const [OwnerName, setOwnerName] = useState(false);
    const [AgencyContact, setAgencyContact] = useState(false);
    const [GSTNumber, setGSTNumber] = useState(false);
    const [AgencyDetails, setAgencyDetails] = useState(false);
    const [providerData, setProviderData] = useState({});
    const [localModal, setlocalModal] = useState('local');
    const [isModal, setIsModal] = useState(false);
    const [AgencyId,setAgencyId] = useState(); 
    const [LocalData, setLocalData] = useState({
    localonebhk1: '',
    localonebhk2: '',
    localonebhk3: '',

    localtwobhk1 : '',
    localtwobhk2 : '',
    localtwobhk3 : '',

    localthreebhk1 : '',
    localthreebhk2 : '',
    localthreebhk3 : '',

    localfourtofivebhk1 : '',
    localfourtofivebhk2 : '',
    localfourtofivebhk3 : '',

    localcmplt1 : '',
    localcmplt2 : '',
    localcmplt3 : '',
});

const [CityData, setCityData] = useState({
    cityonebhk1: '',
    cityonebhk2: '',
    cityonebhk3: '',

    citytwobhk1 : '',
    citytwobhk2 : '',
    citytwobhk3 : '',

    citythreebhk1 : '',
    citythreebhk2 : '',
    citythreebhk3 : '',

    cityfourtofivebhk1 : '',
    cityfourtofivebhk2 : '',
    cityfourtofivebhk3 : '',

    citycmplt1 : '',
    citycmplt2 : '',
    citycmplt3 : '',
});

const [StateData, setStateData] = useState({
    stateonebhk1: '',
    stateonebhk2: '',
    stateonebhk3: '',

    statetwobhk1 : '',
    statetwobhk2 : '',
    statetwobhk3 : '',

    statethreebhk1 : '',
    statethreebhk2 : '',
    statethreebhk3 : '',

    statefourtofivebhk1 : '',
    statefourtofivebhk2 : '',
    statefourtofivebhk3 : '',

    statecmplt1 : '',
    statecmplt2 : '',
    statecmplt3 : '',
});

    const setModal = (value) => {
        if (value == 'local') {
            setlocalModal(value);

            const localbutton = document.getElementById('localbtn');
            localbutton.style.backgroundColor = 'black';
            localbutton.style.color = 'white';

            const citybutton = document.getElementById('citybtn');
            citybutton.style.backgroundColor = 'white';
            citybutton.style.color = 'black';

            const statebutton = document.getElementById('statebtn');
            statebutton.style.backgroundColor = 'white';
            statebutton.style.color = 'black';
        }
        else if (value == 'city') {
            setlocalModal(value);

            const citybutton = document.getElementById('citybtn');
            citybutton.style.backgroundColor = 'black';
            citybutton.style.color = 'white';

            const localbutton = document.getElementById('localbtn');
            localbutton.style.backgroundColor = 'white';
            localbutton.style.color = 'black';

            const statebutton = document.getElementById('statebtn');
            statebutton.style.backgroundColor = 'white';
            statebutton.style.color = 'black';
        }
        else {
            setlocalModal(value);

            const button = document.getElementById('statebtn');
            button.style.backgroundColor = 'black';
            button.style.color = 'white';

            const localbutton = document.getElementById('localbtn');
            localbutton.style.backgroundColor = 'white';
            localbutton.style.color = 'black';

            const citybutton = document.getElementById('citybtn');
            citybutton.style.backgroundColor = 'white';
            citybutton.style.color = 'black';
        }
    }

    const handleClick = (value) => {
        if (value == "electrician")
            navigate("/Electrician_Registration", {
                state: {
                    id: location.state.id
                }
            });
        else if (value == "cleaner")
            navigate("/Cleaner_Registration", {
                state: {
                    id: location.state.id
                }
            });
        else if (value == "agency")
            navigate("/Agency_Registration");
        else if (value == "salon")
            navigate("/Salon_Registration", {
                state: {
                    id: location.state.id
                }
            });
        else if (value == "cook")
            navigate("/Cooking_Registration", {
                state: {
                    id: location.state.id
                }
            });
    }

    const handleInput = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            const name = e.target.name;
            console.log("=>File :", file, "Name :", name);
            setProviderData({ ...providerData, [name]: file });
        } else {
            setProviderData({ ...providerData, [e.target.name]: e.target.value });
            validateField(e.target.name, e.target.value);
        }
        console.log('Name', e.target.name, 'Value', e.target.value);
    }


    const validateField = (name, value) => {
        switch (name) {
            case 'Address': {
                console.log("Address in validation", value);
                var reg = /^[A-Za-z0-9\s]+$/
                if (value.trim() == "") {
                    document.getElementById('address').style.color = 'red';
                    document.getElementById('Address').innerHTML = 'Address Required';
                    setAddress(false);
                }
                else if (reg.test(value)) {
                    document.getElementById('address').style.color = 'black';
                    document.getElementById('Address').innerHTML = '';
                    setAddress(true);
                }
                else {
                    document.getElementById('address').style.color = 'red';
                    document.getElementById('Address').innerHTML = 'Invalid Address';
                    setAddress(false);
                }
            }
                break;

            case 'State': {
                if (value == '') {
                    document.getElementById("state").innerHTML = 'State Required';
                    setStatee(false);
                }
                else {
                    setStatee(true);
                }
            }
                break;

            case 'City': {
                if (value == '') {
                    document.getElementById("city").innerHTML = 'City Required';
                    setCity(false);
                }
                else {
                    setCity(true);
                }
            }
                break;

            case 'AgencyName': {
                console.log("Agency Name", value);
                var reg = /^[A-Za-z\s]+$/
                if (value.trim() == "") {
                    document.getElementById('agencyname').style.color = 'red';
                    document.getElementById('agencyName').innerHTML = 'Agency Name is Required';
                    setAgencyName(false);
                }
                else if (reg.test(value)) {
                    document.getElementById('agencyname').style.color = 'black';
                    document.getElementById('agencyName').innerHTML = '';
                    setAgencyName(true);
                }
                else {
                    document.getElementById('agencyname').style.color = 'red';
                    document.getElementById('agencyName').innerHTML = 'Invalid Name';
                    setAgencyName(false);
                }
            }
                break;

            case 'OwnerName': {
                console.log("Owner Name", value);
                var reg = /^[A-Za-z\s]+$/
                if (value.trim() == "") {
                    document.getElementById('ownername').style.color = 'red';
                    document.getElementById('ownerName').innerHTML = 'Owner Name is Required';
                    setOwnerName(false);
                }
                else if (reg.test(value)) {
                    document.getElementById('ownername').style.color = 'black';
                    document.getElementById('ownerName').innerHTML = '';
                    setOwnerName(true);
                }
                else {
                    document.getElementById('ownername').style.color = 'red';
                    document.getElementById('ownerName').innerHTML = 'Invalid Name';
                    setOwnerName(false);
                }
            }
                break;

            case 'AgencyContact': {
                console.log("Agency Contact", value);
                if (value.length > 10) {
                    value = value.slice(0, 10);
                }
                document.getElementById("contactno").value = value;
                var reg = /^[6789][0-9]{9}$/;
                if (value.trim() == "") {
                    document.getElementById("contactno").style.color = "red";
                    document.getElementById("agencyContact").innerHTML = "Contact Number Required";
                    setAgencyContact(false);
                }
                else if (reg.test(value)) {
                    document.getElementById("contactno").style.color = "green";
                    document.getElementById("agencyContact").innerHTML = "";
                    setAgencyContact(true);
                }
                else {
                    document.getElementById("contactno").style.color = "red";
                    document.getElementById("agencyContact").innerHTML = "Contact Number must be start from either [6,7,8,9]";
                    setAgencyContact(false);
                }
            }
                break;

            case 'GSTNumber': {
                console.log("GST Number", value);
                var reg = /^[A-Za-z0-9]{15}$/;
                if (value.trim() == "") {
                    document.getElementById('gstno').style.color = 'red';
                    document.getElementById('gstNo').innerHTML = 'GST Number is Required';
                    setGSTNumber(false);
                }
                else if (reg.test(value)) {
                    document.getElementById('gstno').style.color = 'black';
                    document.getElementById('gstNo').innerHTML = '';
                    setGSTNumber(true);
                }
                else {
                    document.getElementById('gstno').style.color = 'red';
                    document.getElementById('gstNo').innerHTML = 'Invalid GST Number';
                    setGSTNumber(false);
                }
            }
                break;

            case 'AgencyDetails': {
                console.log("Agency Details", value);
                var reg = /^[A-Za-z0-9\s]+$/
                if (value.trim() == "") {
                    document.getElementById('agencydetails').style.color = 'red';
                    document.getElementById('agencyDetails').innerHTML = 'Agency Details is Required';
                    setAgencyDetails(false);
                }
                else if (reg.test(value)) {
                    document.getElementById('agencydetails').style.color = 'black';
                    document.getElementById('agencyDetails').innerHTML = '';
                    setAgencyDetails(true);
                }
                else {
                    document.getElementById('agencydetails').style.color = 'red';
                    document.getElementById('agencyDetails').innerHTML = 'Invalid';
                    setAgencyDetails(false);
                }
            }
                break;
        }
    }

    
    const submitData = async (e) => {
        e.preventDefault();
        console.log("==>", Address, " ", State, " ", City, " ", AgencyName, " ", OwnerName, " ", AgencyContact, " ", GSTNumber, " ", AgencyDetails);
        if (Address && State && City && AgencyName && OwnerName && AgencyContact && GSTNumber && AgencyDetails) {
            const formData = new FormData();
            console.log("providerData : ", providerData);
            for (const index in providerData) {
                console.log("providerData[index] : ", providerData[index], ' index : ======>', index);
                if (providerData[index]) {
                    console.log("in if condition ");
                    formData.append(index, providerData[index]);
                }
            }
            console.log("formData : ", formData);
            try {
                var result = await axios.post(requestedURLForServiceProvider + '/providerdata', formData);
                console.log("Result : ", result);
                if (result.status == 201) {
                    Swal.fire("Data Added");
                    setIsModal(true);
                    console.log("provider data : ", result);
                    console.log("Agency Orignal_Id : ",result.data.providerData._id);
                    setAgencyId(result.data.providerData._id);
                    console.log("location.state.id : ", location.state.id);
                    
                }
                else if (result.status == 500) {
                    Swal.fire('Error when add data');
                }
            } catch (err) {
                console.error('Error submitting data:', err);
            }
        } else {
            console.log('Some fields are empty');
        }
    };

    const submitModalData = async (e)=>{
        e.preventDefault();
        console.log("AgencyId : ",AgencyId);

        console.log("LocalData : ",LocalData);
        console.log("CityData : ",CityData);
        console.log("StateData : ",StateData);
        
        var result = await axios.post(requestedURLForServiceProvider + '/agencydata', {LocalData,CityData,StateData,AgencyId});
        console.log("Agency Result : ",result);
        
        if(result.status == 201){
            Swal.fire("Data Added");
            console.log("In If Condition Result : ",result);
            if(result.data.agencydata.service_provider_id == AgencyId){
                navigate('/Service_provider_profile');
            }
        }
        else if (result.status == 500) {
            Swal.fire('Error when add data');
        }
    }

    const print_state = () => {
        var option_str = document.getElementById("state");
        console.log('option ', option_str);
        console.log('state_array ', state_arr);
        option_str.length = 0;
        option_str.options[0] = new Option('Select State', '');
        option_str.selectedIndex = 0;
        console.log('', state_arr.state_arr);
        for (var i = 0; i < state_arr.state_arr.length; i++) {
            option_str.options[option_str.length] = new Option(state_arr.state_arr[i], state_arr.state_arr[i]);
            console.log('option_str in loop ', option_str);
        }
    }

    const print_city = (e, city_id) => {
        var { name, value } = e.target;
        var state_index = e.target.selectedIndex;
        console.log('event ', e.target.selectedIndex);
        var option_str = document.getElementById(city_id);
        option_str.length = 0;
        option_str.options[0] = new Option('Select City', '');
        option_str.selectedIndex = 0;
        var city_arr = s_a.s_a[state_index].split("|");
        for (var i = 0; i < city_arr.length; i++) {
            option_str.options[option_str.length] = new Option(city_arr[i], city_arr[i]);
        }
        handleInput(e);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            print_state();
            setProviderData({ ...providerData, ['User_id']: location.state.id, ['Service_type']: 'Shifting Service' });
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, []);


    return (<>
        <section className="" style={{ background: "#F9F5F4", padding: '72px 0 0 0' }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-7 col-12" >
                        <div class="image-container">
                            <img class="image" src={ang_img} />
                            <div className="button_div">
                                <button type="submit" className="fxt-btn" onClick={() => handleClick("electrician")}>Electrician</button><br />
                                <button type="submit" className="fxt-btn" onClick={() => handleClick("cleaner")}>Cleaner</button><br />
                                <button type="submit" className="fxt-btn" onClick={() => handleClick("salon")}>Salon</button><br />
                                <button type="submit" style={{ background: "black", color: 'white' }} className="fxt-btn" onClick={() => handleClick("agency")}>Agency</button><br />
                                <button type="submit" className="fxt-btn" onClick={() => handleClick("cook")}>Cook</button><br />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5 col-12 px-5 py-3" style={{ background: "#F9F5F4" }}>
                        <div className="maindiv w-100" style={{ background: '#FFB649' }}>
                            <form method="post" onSubmit={submitData} encType="multipart/form-data">
                                <div className="from1" >
                                    <h1 className="h1" >Agency Registration</h1>
                                    <div>
                                        <input type="text" className="form-control mb-3" name="Address" id='address' placeholder="Enter Address" onChange={(e) => { handleInput(e) }} />
                                        <i class="flaticon-envelope"></i>
                                        <span id='Address'></span>
                                    </div>
                                    <div>
                                        <select type="text" className="form-control mb-3" name="State" id="state" onChange={(e) => { print_city(e, 'city') }}></select>
                                        <i class="flaticon-padlock"></i>
                                    </div>
                                    <div >
                                        <select type="text" className="form-control mb-3" name="City" id="city" onChange={(e) => { handleInput(e) }}></select>
                                        <i class="flaticon-envelope"></i>
                                    </div>
                                    <div >
                                        <input type="file" className="form-control mb-3" name="aadharimg" placeholder="Adhaar Image" onChange={(e) => { handleInput(e) }} />
                                        <i class="flaticon-envelope"></i>
                                    </div>
                                </div>
                                <div style={{ marginTop: "5vh" }}>
                                    <h1 className="fw-bold">Agency Detail</h1>
                                    <div >
                                        <input type="text" className="form-control mb-3" name="AgencyName" id='agencyname' placeholder="Agency Name" onChange={(e) => { handleInput(e) }} />
                                        <i class="flaticon-envelope"></i>
                                        <span id='agencyName'></span>
                                    </div>
                                    <div >
                                        <input type="text" className="form-control mb-3" name="OwnerName" id='ownername' placeholder="Owner Name" onChange={(e) => { handleInput(e) }} />
                                        <i class="flaticon-envelope"></i>
                                        <span id='ownerName'></span>
                                    </div>
                                    <div >
                                        <input type="text" className="form-control mb-3" name="AgencyContact" id='contactno' placeholder="Agency Contact Number" onChange={(e) => { handleInput(e) }} />
                                        <i class="flaticon-envelope"></i>
                                        <span id='agencyContact'></span>
                                    </div>
                                    <div>
                                        <input type="text" className="form-control mb-3" name="GSTNumber" id='gstno' placeholder="GST Number" onChange={(e) => { handleInput(e) }} />
                                        <i class="flaticon-envelope"></i>
                                        <span id='gstNo'></span>
                                    </div>
                                    <div >
                                        <input type="file" className="form-control mb-3" name="AgencyImg" id='agencyimg' placeholder="Upload Image" onChange={(e) => { handleInput(e) }} />
                                        <i class="flaticon-envelope"></i>
                                    </div>
                                    <div>
                                        <textarea type="text" row='3' col='10' className="form-control mb-3" name="AgencyDetails" id='agencydetails' placeholder="Enter Your Agency Details" onChange={(e) => { handleInput(e) }}></textarea>
                                        <i class="flaticon-envelope"></i>
                                        <span id='agencyDetails'></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="fxt-content-between d-flex justify-content-end">
                                        <button type="submit" className="fxt-btn-fill">Click for add services</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

       {/* Modal code write here */}
        <Modal isOpen={isModal} id='exampleModal'>
        <div className='modal1'>
        <div class="p-2 w-100">
        <div class="w-100">
            <div style={{ background : "white", padding: '5px', margin: '15px', minHeight: '40px',display:'flex',justifyContent:'space-around',alignItems:'center' }}>
                <button type="button" id="localbtn" onClick={()=>setModal('local')} className="btn">Local House shifting</button>
                <button type="button" id="citybtn" onClick={()=>setModal('city')} className="btn">City House shifting</button>
                <button type="button" id="statebtn" onClick={()=>setModal('state')} className="btn">State House shifting</button>
            </div>
        <form onSubmit={submitModalData}>
         {(localModal==='local') ? 
         <>   
            <h5 className="ms-5 pt-4">Local House Shifting Charges</h5>
            <div className="mt-3 mx-5" style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <div className="row font-weight-bold">
                <div className="col">Shifting Type</div>
                <div className="col">Up to 12 km</div>
                <div className="col">13 - 30 km</div>
                <div className="col">31+ km</div>
            </div>
              {
                console.log('input in local')
              }
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2 ml-4">1 BHK</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localonebhk1" placeholder="Rs" value={LocalData["localonebhk1"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localonebhk2" placeholder="Rs" value={LocalData["localonebhk2"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})}  /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localonebhk3" placeholder="Rs" value={LocalData["localonebhk3"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})}  /></div>
            </div>
    
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2 ml-4">2 BHK</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localtwobhk1" placeholder="Rs" value={LocalData["localtwobhk1"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localtwobhk2" placeholder="Rs" value={LocalData["localtwobhk2"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})}/></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localtwobhk3" placeholder="Rs" value={LocalData["localtwobhk3"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
            </div>
    
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2 ml-4">3 BHK</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localthreebhk1" placeholder="Rs" value={LocalData["localthreebhk1"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localthreebhk2" placeholder="Rs" value={LocalData["localthreebhk2"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localthreebhk3" placeholder="Rs" value={LocalData["localthreebhk3"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
            </div>
    
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2">4 - 5 BHK</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localfourtofivebhk1" placeholder="Rs" value={LocalData["localfourtofivebhk1"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localfourtofivebhk2" placeholder="Rs" value={LocalData["localfourtofivebhk2"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localfourtofivebhk3" placeholder="Rs" value={LocalData["localfourtofivebhk3"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
            </div>
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2">Complete Household</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localcmplt1" placeholder="Rs" value={LocalData["localcmplt1"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localcmplt2" placeholder="Rs" value={LocalData["localcmplt2"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localcmplt3" placeholder="Rs" value={LocalData["localcmplt3"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
            </div>
            </div>   
            </>     
            :(localModal==='city')?  
            <>
            <h5 className="ms-5 pt-4">City House Shifting Charges</h5>
              {
                console.log('input in city')
              }
            <div className="mt-3 mx-5" style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <div className="row font-weight-bold">
                <div className="col">Shifting Type</div>
                <div className="col">Up to 100 km</div>
                <div className="col">100 - 400 km</div>
                <div className="col">400 - 800 km</div>
            </div>
    
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2 ml-4">1 BHK</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="cityonebhk1" placeholder="Rs" value={CityData["cityonebhk1"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="cityonebhk2" placeholder="Rs" value={CityData["cityonebhk2"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="cityonebhk3" placeholder="Rs" value={CityData["cityonebhk3"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
            </div>
    
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2 ml-4">2 BHK</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citytwobhk1" placeholder="Rs" value={CityData["citytwobhk1"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citytwobhk2" placeholder="Rs" value={CityData["citytwobhk2"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citytwobhk3" placeholder="Rs" value={CityData["citytwobhk3"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
            </div>
    
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2 ml-4">3 BHK</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citythreebhk1" placeholder="Rs" value={CityData["citythreebhk1"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citythreebhk2" placeholder="Rs" value={CityData["citythreebhk2"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citythreebhk3" placeholder="Rs" value={CityData["citythreebhk3"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
            </div>
    
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2">4 - 5 BHK</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="cityfourtofivebhk1" placeholder="Rs" value={CityData["cityfourtofivebhk1"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="cityfourtofivebhk2" placeholder="Rs" value={CityData["cityfourtofivebhk2"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="cityfourtofivebhk3" placeholder="Rs" value={CityData["cityfourtofivebhk3"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
            </div>
    
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2">Complete Household</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citycmplt1" placeholder="Rs" value={CityData["citycmplt1"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citycmplt2" placeholder="Rs" value={CityData["citycmplt2"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citycmplt3" placeholder="Rs" value={CityData["citycmplt3"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
            </div>
         
            </div>
            </>
            :       
            <>
            <h5 className="ms-5 pt-4">State House Shifting Charges</h5>
    
            <div className="mt-3 mx-5" style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <div className="row font-weight-bold">
                <div className="col">Shifting Type</div>
                <div className="col">Up to 900 km</div>
                <div className="col">900 - 1300 km</div>
                <div className="col">1300 - 1700 km</div>
            </div>
            {
                console.log('input in state')
              }
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2 ml-4">1 BHK</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="stateonebhk1" placeholder="Rs" value={StateData["stateonebhk1"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="stateonebhk2" placeholder="Rs" value={StateData["stateonebhk2"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="stateonebhk3" placeholder="Rs" value={StateData["stateonebhk3"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
            </div>
    
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2 ml-4">2 BHK</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statetwobhk1" placeholder="Rs" value={StateData["statetwobhk1"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statetwobhk2" placeholder="Rs" value={StateData["statetwobhk2"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statetwobhk3" placeholder="Rs" value={StateData["statetwobhk3"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
            </div>
    
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2 ml-4">3 BHK</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statethreebhk1" placeholder="Rs" value={StateData["statethreebhk1"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statethreebhk2" placeholder="Rs" value={StateData["statethreebhk2"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statethreebhk3" placeholder="Rs" value={StateData["statethreebhk3"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
            </div>
    
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2">4 - 5 BHK</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statefourtofivebhk1" placeholder="Rs" value={StateData["statefourtofivebhk1"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statefourtofivebhk2" placeholder="Rs" value={StateData["statefourtofivebhk2"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statefourtofivebhk3" placeholder="Rs" value={StateData["statefourtofivebhk3"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
            </div>
    
            <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                <div className="col-md-3 col-sm-12 p-2">Complete Household</div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statecmplt1" placeholder="Rs" value={StateData["statecmplt1"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statecmplt2" placeholder="Rs" value={StateData["statecmplt2"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statecmplt3" placeholder="Rs" value={StateData["statecmplt3"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
            </div>       
            </div>
            </>
        }
           <div className="mt-3 px-5 d-flex justify-content-end">
                <button type="submit" className="btn text-white" style={{background:'black'}}>Submit</button>
            </div>
        </form>
        </div>
        </div>
        </div>
        </Modal>
    </>);
}
export default Agency_registration;
