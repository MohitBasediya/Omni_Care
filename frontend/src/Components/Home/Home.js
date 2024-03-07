import slide1 from '../../images/slide1.jpg';
import slide2 from '../../images/slide2.jpg';
import slide3 from '../../images/slide3.jpg';
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {Modal} from 'reactstrap';
import Login from './Login';
import Swal from 'sweetalert2';
import { userData } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { requestedURL } from '../../urls';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
var role='';
function Home(){ 
    const [istoken,setIstoken]=useState(false);
    const dispatch=useDispatch();
    const [Username,setUsername]=useState(false);
    const [Email,setEmail]=useState(false);
    const [Password,setPassword]=useState(false);
    const [Phone,setPhone]=useState(false);
    const [Role,setRole]=useState(false);
    const [user,setUser]=useState({});
    const [userotp,setOtp]=useState({});
    const [isModal,setIsModal] = useState(false);
    const [isLogin,setIsLogin]=useState(false);
    var navigate = useNavigate();
    const handleInput=(e)=>{
        console.log(e.target.name ,': value : ',e.target.value,);
        setUser({...user,[e.target.name]:e.target.value});
        validateField(e.target.name,e.target.value);    
    }
    const handleInput2=(e)=>{
        console.log(e.target.value);
        setOtp({[e.target.name]:e.target.value});
    }
    const validateField=(name,value)=>{
        switch(name){
            case 'Name':{
                var reg = /^[A-Za-z\s]+$/;
                if(value.trim()==""){
                   document.getElementById('username').style.color='red';
                   document.getElementById('Username').innerHTML='Name Required';
                   setUsername(false);
                }
                else if(reg.test(value)){
                    document.getElementById('username').style.color='black';
                    document.getElementById('Username').innerHTML='';
                    setUsername(true);
                }
                else{
                    document.getElementById('username').style.color='red';
                    document.getElementById('Username').innerHTML='Invalid Name only enter alphabet';
                    setUsername(false);
                }
            }
            break;
            
            case 'Email':{
                var reg = /^\w+([\.-])?\w*@[a-z]*([\.][a-z]{2,3})+$/;
                if(value.trim()===""){
                    document.getElementById('email').style.color='red';
                    document.getElementById('Email').innerHTML='Email Required';
                    setEmail(false);
                 }
                 else if(reg.test(value)){
                    document.getElementById('email').style.color='green';
                    document.getElementById('Email').innerHTML='';
                    setEmail(true);
                 }
                 else{
                    document.getElementById('email').style.color='red';
                    document.getElementById('Email').innerHTML='Invalid Email';
                    setEmail(false);
                 }
            }
            break;
            case 'Password':{
                var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if (value.trim() === "") {
                        document.getElementById("password").style.color = "red";
                        document.getElementById("Password").innerHTML = "Password Required";
                        setPassword(false);
                    }
                    else if (reg.test(value)) {
                            document.getElementById("password").style.color = "green";
                            document.getElementById("Password").innerHTML = "";
                            setPassword(true);
                        }
                    else {
                        document.getElementById("password").style.color = "red";
                        document.getElementById("Password").innerHTML = "Invalid Password";
                        setPassword(false);
                    }
                }
                break;
                case 'Contact_No':{
                    if (value.length > 10) {
                        value = value.slice(0, 10);
                    }
                    document.getElementById("contact").value = value;
                    var reg = /^[6789][0-9]{9}$/;
                    if (value.trim() === "") {
                        document.getElementById("contact").style.color = "red";
                        document.getElementById("Contact").innerHTML = "Mobile Number Required";
                        setPhone(false);
                    }
                    else if (reg.test(value)) {
                        document.getElementById("contact").style.color = "green";
                        document.getElementById("Contact").innerHTML = "";
                        setPhone(true);                        
                    }
                    else {
                        document.getElementById("contact").style.color = "red";
                        document.getElementById("Contact").innerHTML = "Phone Number must be start from either [6,7,8,9]";
                        setPhone(false);                        
                    }
                }
                break;
                case 'User_Role':
                if (value === '') {
                    document.getElementById("role").innerHTML = "City Required";
                    setRole(false);                    
                }
                else {
                    setRole(true);
                }
                break;
            }                
    }
    const submitData=async(e)=>{
        console.log('user ',user);
        e.preventDefault();
        var Gender=(document.getElementById('male').checked)? true:(document.getElementById('female').checked)?true:false;
        console.log('username : ',Username,' email ',Email,' phone ',Phone,' Password ',Password,' Gender ',Gender,' Role ',Role);
        if(Username && Email && Phone && Gender && Role && Password){
            console.log(user);
            try{
                var result = await axios.post(requestedURL+'/verifyemail',user);
                console.log(result);                
                if(result.status===201){
                    setIsModal(true);
                }else if(result.status===208){
                    Swal.fire("Some Error when sending email");
                }else{
                    Swal.fire({
                        icon:'error',
                        text:'Email already registered',
                        timer:2000
                    })
                }   
            }catch(err){
                console.log(err);
            }             
        }
        else{
            alert('some field are empty');
        }

    }
    const submitOtp=async(e)=>{
        e.preventDefault();
        try{
            console.log('otp  ',userotp);
            var result=await axios.post(requestedURL+'/verifyotp',userotp);
            console.log('result ',result);
            if(result.status===201){
                Swal.fire("Data Added");
                setIsModal(false);
                if(result.data.userdata.User_Role==='Service Provider'){
                 navigate('/Electrician_Registration',{
                    state:{
                      id:result.data.userdata._id
                    }
                 });
                }else{
                    Cookie.set('Login_Jwt_token',result.data.token,{expires:7});
                    dispatch(userData(result.data.userdata));
                    navigate('/customer_profile');
                }
            }
            else if(result.status===500){
                Swal.fire('Error when add data');
            }
            else if(result.status===210){
                Swal.fire('You Enter Wrong Otp');   
            }
        }catch(error){
            console.log('error ',error);
            Swal.fire('Error while checking otp in catch');   
        }
    }
    useEffect(()=>{
        const authenticate=async()=>{
        var token=Cookie.get('Login_Jwt_token');
        if(token){
            var result=await axios.post(`${requestedURL}/awt_login`,{token});
            console.log('result in home ',result);
            if(result.status===201){
                console.log('isoken in Home Component ',istoken);
                setIstoken(true);
                dispatch(userData(result.data.data));
            }else{
                console.log('result in else ',result);
                setIstoken(false);
            }
        }
        else{
            setIstoken(false);
        }
      }
      authenticate();
    },[])
    return(
        <>
        <section id="home">        
        <div className="slider">
            <img src={slide1} alt="..."/>
            <img src={slide2} alt="..."/>
            <img src={slide3} alt="..."/>         
          
            <div className='hero' >
                <div className='container-fluid con-p'>
                     <div className='row'>
                        <div className='col-md-6 d-flex align-items-center' style={(istoken)?{padding:'100px',justifyContent:'center',width:'100%'}:{justifyContent:'start'}}>
                          <div className='w-100 py-3 d-flex justify-content-center flex-column align-items-start'>
                            <h1 className='px-5 mx-3 pb-3 text-warning' >At-Home Excellence: Services Beyond Your Door </h1>
                            <p className='px-5 text-light mx-3 pb-3'>Welcome to OmniCare, where your home is our priority.Experience the luxury of premium services delivered directly to your doorstep.From skilled professionals to personalized care, we're here to transform your living space into a haven of comfort and excellence.</p>
                            <div className='ps-3'>
                                {/* <button className='btn ms-5 btn-outline-warning text-light h-btn fw-bold'>Sign Up </button> */}
                            </div>
                          </div>
                        </div>
                        {
                            (!istoken)?
                            <div className='col-md-6 d-flex form-div justify-content-center px-4 align-items-center'>
                                <div className='py-3 px-3 bg-yellow w-75 border-0 rounded-3' style={{background:'#FFC36A'}}>
                                    <h3 className='fw-bold px-3 py-2'>Join with Us</h3>
                                    <form method='post' onSubmit={submitData} className='px-3'>
                                        <input type='text' name='Name' onChange={(e)=>{ handleInput(e) }} id='username' placeholder='Enter Name' className='my-3 py-2 form-control px-3 rounded-2 border-0' />
                                        <span id='Username'></span>
                                        <input type='email' onChange={(e)=>{ handleInput(e) }} name='Email' id='email' placeholder='Enter Email' className='my-3 py-2 form-control px-3 rounded-2 border-0' />
                                        <span id='Email'></span>
                                        <input type='password' onChange={(e)=>{ handleInput(e) }} name='Password' id='password' placeholder='Enter password' className='my-3 py-2 form-control px-3 rounded-2 border-0' />
                                        <span id='Password'></span>
                                        <input type='text' name='Contact_No' onChange={(e)=>{ handleInput(e) }} id='contact' placeholder='Enter Contact Number' className='my-3 py-2 form-control px-3 rounded-2 border-0' />
                                        <span id='Contact' className='d-block'></span>
                                        <input type='radio' name='Gender' id='male' value='Male' onClick={(e)=>{ handleInput(e) }} className='mb-2 form-check-input border-0' /><lable for='male' style={{color:'white',cursor:'pointer'}} className='px-2 pt-4'>Male</lable>
                                        <input type='radio' name='Gender' id='female' value='Female' onClick={(e)=>{ handleInput(e) }} className='mb-2 form-check-input border-0' /><lable for='female' style={{color:'white',cursor:'pointer'}} className='px-2 pt-4'>Female</lable>
                                        <span id='Gender' className='d-block'></span>
                                        <select name='User_Role' id='role' className=' py-2 form-control px-3 my-2' onChange={handleInput}>
                                            <option value=''>Select Role</option>
                                            <option value='Customer'>Customer</option>
                                            <option value='Service Provider'>Service Provider</option>
                                        </select>
                                        <div className='d-flex justify-content-center'>
                                        <input type='submit' value='Send Otp' className='btn px-5 rounded-2 btn btn-dark btn-block mx-auto my-2' />
                                        </div>
                                    </form>
                                    <p className='text-center '>Already have an account ?<Link  className='fw-bold px-2 text-decoration-none' style={{color:'white'}}  onClick={()=>{setIsLogin(true)}}>Login</Link> </p>
                                </div>
                            </div>
                            :
                            <div className='col-md-6' style={{height:'100vh'}}>
                                <pre>           
                                </pre>
                            </div>
                        }
                     </div>  
                </div>
           </div>
         </div>
         
        </section>  

<Modal isOpen={isModal} style={{maxWidth:'500px',background:'#FFB649',padding:'10px',borderRadius:'12px'}}>
     <div className='w-100 py-2 px-3' style={{background:'#FFB649',borderRadius:'12px'}}>
         <form method='post' onSubmit={submitOtp} className='w-100 p-4'>
            <input type='text' name='otp' placeholder='Enter Otp' onChange={handleInput2} className='form-control p-2 my-2'/>
            <input type='submit' value='Verify Otp' className='btn btn-dark rounded-2 text-light '/>
         </form>
     </div>
</Modal>
        {
            isLogin?
            <Login/>:
            ''
        }
        </>
    )
    
}
export default Home