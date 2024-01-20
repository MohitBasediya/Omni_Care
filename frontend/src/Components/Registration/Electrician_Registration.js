import elect_img from "../../images/salon.jpg";
import './Registration.css';
import Swal from 'sweetalert2';
import { useState,useEffect } from "react";
import {useNavigate,useLocation } from "react-router-dom";
import {requestedURLForServiceProvider} from '../../urls.js'
import state_arr from './City_State_Array.js';
import s_a from './City_State_Array.js';
import axios from "axios";


function Salon_Registration() {

	const navigate = useNavigate();
	const location = useLocation();

	const [Address,setAddress] = useState(false);
	const [State,setStatee]=useState(false);
	const [City,setCity]=useState(false);
	const [providerData, setProviderData] = useState({});

	const handleInput = (e)=>{
		if(e.target.type === 'file'){
			const file  = e.target.files[0];
			const name = e.target.name;
			console.log("=>File :",file,"Name :",name);
			setProviderData({...providerData,[name]:file});
		}
		else if(e.target.type=='checkbox'){
			if(providerData[e.target.name]){
			    setProviderData({...providerData,[e.target.name]:providerData[e.target.name]+" "+e.target.value});
			}
			else{
				setProviderData({...providerData,[e.target.name]:e.target.value});	
			}
		}
		else{
			setProviderData({...providerData,[e.target.name]:e.target.value});
            validateField(e.target.name , e.target.value);
		}
		console.log('Name',e.target.name,'Value',e.target.value);
	}

	const validateField = (name,value)=>{
		switch(name){
			case 'Address' : {
				console.log("Address in validation",value);
				var reg = /^[A-Za-z0-9\s]+$/
				if(value.trim()==""){
					document.getElementById('address').style.color = 'red';
					document.getElementById('Address').innerHTML = 'Address Required';
					setAddress(false);
				}
				else if(reg.test(value)){
					document.getElementById('address').style.color = 'black';
					document.getElementById('Address').innerHTML = '';
					setAddress(true);
				}
				else{
					document.getElementById('address').style.color = 'red';
					document.getElementById('Address').innerHTML = 'Invalid Address';
					setAddress(false);
				}
			}
			break;

			case 'State' : {
				if(value==''){
					document.getElementById("state").innerHTML = 'State Required';
					setStatee(false);
				}
				else{
					setStatee(true);
				}
			}
			break;			
			case 'City' : {
				if(value==''){
					document.getElementById("city").innerHTML = 'City Required';
					setCity(false);
				}
				else{
					setCity(true);
				}
			}
			break;
		}
	}

	const submitData = async (e) => {
		e.preventDefault();
        
        console.log("After Adding Img ",providerData);
		var checkBoxes = "";
		checkBoxes += (document.getElementById('Primary').checked)?"Primary " : "";
		checkBoxes += (document.getElementById('Secondary').checked)?"Secondary " : "";
		checkBoxes += (document.getElementById('Tertiary').checked)?"Tertiary " : "";
		console.log(checkBoxes);		
		
		if (Address && State && City) {		  
		  const formData = new FormData();
		   console.log("providerData : ",providerData);
			for(const index in providerData){
				console.log("providerData[index] : ",providerData[index],' index : ====================',index);
				if(providerData[index]){
					formData.append(index, providerData[index]); 
				}			
			}
			console.log("formData : ",formData);
		  try {
			var result = await axios.post(requestedURLForServiceProvider + '/providerdata', formData);
			console.log("Result : ",result);
			if(result.status==201){
				Swal.fire("Data Added");
				console.log("provider data : ",result);
				console.log("location.state.id : ",location.state.id);

				if(result.data.providerData.User_id===location.state.id){
					navigate('/Service_provider_profile');
				}

			}
			else if(result.status==500){
				Swal.fire('Error when add data');
			}
			else if(result.status==500){
				Swal.fire('You Enter Wrong Otp');   
			}

		  } catch (err) {
			console.error('Error submitting data:', err);
		  }
		} else {
		  console.log('Some fields are empty');
		}
	};

	const print_state = () => {
        var option_str = document.getElementById("state");
		console.log('option ',option_str);
		console.log('state_array ',state_arr);
        option_str.length = 0;
        option_str.options[0] = new Option('Select State', '');
        option_str.selectedIndex = 0;
		console.log('',state_arr.state_arr);
        for (var i = 0; i < state_arr.state_arr.length; i++) {
            option_str.options[option_str.length] = new Option(state_arr.state_arr[i], state_arr.state_arr[i]);
			console.log('option_str in loop ',option_str);
        }
    }
	
    const print_city = (e, city_id) => {
        var { name, value } = e.target;
        var state_index = e.target.selectedIndex;
		console.log('event ',e.target.selectedIndex);
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

	useEffect(()=>{
		const timeoutId = setTimeout(() => {
            print_state();
			setProviderData({...providerData,['User_id']:location.state.id,['Service_type']:'Salon'});
        }, 1000);
		return () => clearTimeout(timeoutId);
	},[]);

	const handleClick = (value) => {
		if (value == "electrician")
		navigate("/Electrician_Registration",{
			state : {
				id : location.state.id
			}});
		else if (value == "cleaner")
			navigate("/Cleaner_Registration",{
				state : {
					id : location.state.id
				}}); 
		else if (value == "agency")
			navigate("/Agency_Registration");
		else if (value == "salon")
			navigate("/Salon_Registration",{
				state : {
					id : location.state.id
				}});
		else if (value == "cook")
			navigate("/Cooking_Registration",{
				state : {
					id : location.state.id
				}});
	}

	return (
		<section className='w-100' style={{ background: "#F9F5F4", padding: '60px 0' }} >
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-7 col-12" >
						<div class="image-container">
							<img class="image" src={elect_img} />
						   <div className="button_div">
							<button type="submit" style={{ background: "black", color: 'white' }} className="fxt-btn" onClick={() => handleClick("electrician")}>Electrician</button><br />
							<button type="submit" className="fxt-btn" onClick={() => handleClick("cleaner")}>Cleaner</button><br />
							<button type="submit" className="fxt-btn" onClick={() => handleClick("salon")}>Salon</button><br />
							<button type="submit" className="fxt-btn" onClick={() => handleClick("agency")}>Agency</button><br />
							<button type="submit" className="fxt-btn" onClick={() => handleClick("cook")}>Cook</button><br />
						   </div>
						</div>
						
					</div>

					<div className="col-md-5 col-12 px-5 py-3" style={{ background: "#F9F5F4" }}>
						<div className="maindiv" style={{background:'#FFB649'}}>
							<form method="post" onSubmit={submitData} encType="multipart/form-data">
								<div className="from1">
									<h1 className="h1" >Electrician Registration</h1>
										<div>
										<input type="text" className="form-control mb-3" name="Address" id='address' placeholder="Enter Address" onChange={(e)=>{handleInput(e)}}/>
										<i class="flaticon-envelope"></i>
										<span id='Address'></span>
									</div>
									<div>
										<select type="text"  className="form-control mb-3" name="State" id="state" onChange={(e) => { print_city(e, 'city') }}></select>
										<i class="flaticon-padlock"></i>
									</div>
									<div >
										<select type="text" className="form-control mb-3"  name="City" id="city" onChange={(e)=>{handleInput(e)}}></select>
										<i class="flaticon-envelope"></i>
									</div>
									<div >
										<input type="file" className="form-control mb-3" name="aadharimg" placeholder="Adhaar Image" onChange={(e)=>{handleInput(e)}}/>
										<i class="flaticon-envelope"></i>
									</div>
								</div>
								<div style={{ marginTop: "5vh" }}>
									<h1 className="fw-normal">Your Services</h1>
									<div className="p-2 my-2" style={{background:'white'}}>
									<div class="accordion" id="accordionExample">
										<div class="accordion-item">
											<h2 class="accordion-header" id="headingOne">
											<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
												Accordion Item #1
											</button>
											</h2>
											<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
											<div class="accordion-body">
												<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
											</div>
											</div>
										</div>
										<div class="accordion-item">
											<h2 class="accordion-header" id="headingTwo">
											<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
												Accordion Item #2
											</button>
											</h2>
											<div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
											<div class="accordion-body">
												<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
											</div>
											</div>
										</div>
										<div class="accordion-item">
											<h2 class="accordion-header" id="headingThree">
											<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
												Accordion Item #3
											</button>
											</h2>
											<div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
											<div class="accordion-body">
												<strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
											</div>
											</div>
										</div>
										</div>
									</div>									
								</div>
								<h1>Select Service category</h1>
                                <div className="my-2 p-2" style={{background:'white'}}>
								    <input type="checkbox" className="form-check-input mx-4" name="Servicecategory" value="Primary" id= 'Primary' onChange={(e)=>{handleInput(e)}}/>Primary
									<input type="checkbox" className="form-check-input mx-4" name="Servicecategory" value="Secondary" id= 'Secondary' onChange={(e)=>{handleInput(e)}}/>Secondary
									<input type="checkbox" className="form-check-input mx-4" name="Servicecategory" value="Tertiary" id= 'Tertiary' onChange={(e)=>{handleInput(e)}}/>Tertiary 
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
	)
}
export default Salon_Registration;