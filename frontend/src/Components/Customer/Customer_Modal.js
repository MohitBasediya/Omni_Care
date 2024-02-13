import { useState } from "react";
import { Modal } from "reactstrap";
import {loadStripe} from '@stripe/stripe-js';
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {requestedURL} from "../../urls";
import { useLocation } from "react-router-dom";
    const innershadow  = {
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.7) inset"
    }    
function Customer_Modal(props){
    const location = useLocation();
    const pathname = location.pathname;
    const [checked,setChecked]=useState(false);
    const Booking = props.booking;
    const userData=props.userData;
    const handlePayment = async()=>{
        try{
            const stripe=await loadStripe('pk_test_51O7qF0SJUnxcOIoS0sB7ANA2hIetDRhpRNTB4adPmYuOBzByrlhxBJaD9v5FFrUAlh9btXzUBeju1uuUHqZmbGgG00rLZ3hiG2');
             axios.post(`${requestedURL}/payment`,{Booking,userData,pathname}).then((response)=>{
                console.log('response',response);
                const result= stripe.redirectToCheckout({
                    sessionId:response.data.id
                });
                console.log('result : ',result);
                if(result.error){
                    Swal.fire("Error while payment");                    
                }
             });

        }catch(error){
            console.log('error',error);
        }
    }
    return(<>
        <Modal isOpen={true} size="lg"  id='spModal'>
            <div className='w-100 p-2 rounded-2' style={{background: "#F9F5F4"}}>
              <h3 className='p-2'>Terms and Conditions</h3>
                <div className='innershadow py-4 px-2  bg-white rounded-2  justify-content-center mx-auto' style={{maxWidth:'730px',innershadow}}>
                    <p>Welcome to OmniCare [Diverse Services,One Platform]. These terms and conditions govern your use of our website and the services offered herein. By accessing or using our website, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you may not use our website or services.</p><br/>
                    <h4>The use of this website is subject to the following terms of use:</h4><br/>
                    <ol>
                        <li className="p-1">OmniCare provides a platform for users to access a variety of household services including electrician services, salon services, agency household services, cooking services, and more. We strive to connect users with skilled professionals to fulfill their household needs.</li>
                        <li className="p-1">The service provider is solely responsible for executing the services booked through our platform in a professional and timely manner. In the event of any accidents, damages, or errors occurring during the provision of services, the service provider is responsible for addressing and resolving the issue promptly and effectively.</li>
                        <li className="p-1">Any disputes or issues arising between the service provider and the customer regarding the provision of services are to be resolved directly between the two parties, and our company shall not be held responsible for mediating or arbitrating such disputes.</li>
                        <li className="p-1">Pricing for our services is displayed on our website and may vary based on the specific service requested. By using our services, you agree to pay the fees associated with your selected services. </li>
                        <li className="p-1">Service providers are required to pay the specified registration fee upon completing the registration process on our platform. The registration fee is non-refundable and non-transferable, regardless of whether the service provider's application is approved or rejected.</li>
                    </ol>                   
                </div>
                <div className="w-100 p-2 d-flex justify-content-between">
                    <div>
                        <input type="checkbox" id="checkbox" name="checkbox" onClick={()=>{setChecked(!checked)}}/>
                        <label for="checkbox" className="px-2 bg text-dark bold">Terms & Condition Accept </label>
                    </div>
                    {
                        (checked)?
                            <button className="btn btn-dark text-light" onClick={()=>{handlePayment()}}>Pay Now</button>
                        :''
                    }     
                </div>
            </div>
        </Modal>
    </>);
}
export default Customer_Modal;