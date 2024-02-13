import axios from 'axios';
import { useState, useEffect } from 'react';
import { requestedURLForServiceProvider } from '../../urls';
import { useNavigate } from 'react-router-dom';
const backendUrl = 'http://localhost:3001';

function Shifting() {
   const navigate = useNavigate();
   const [agencyData, setAgencyData] = useState([]);
   const [agencyData1, setAgencyData1] = useState([]);
   const [search, setSearch] = useState('');

   useEffect(() => {
      const getAgencyProfileList = async () => {
         try {
            var result = await axios.get(requestedURLForServiceProvider + '/getagencylist');
            if (result.status === 201) {
               setAgencyData(result.data.agencylist);
               setAgencyData1(result.data.agencylist);
            }
         } catch (err) {
            console.error('Error fetching agency list:', err);
         }
      }
      getAgencyProfileList();
   }, []);

   const handleSearch = (e) => {
      setSearch(e.target.value);
   }


   useEffect(() => {
      const filteredAgencyData = agencyData.filter(agency =>
         agency.City.toLowerCase().includes(search.toLowerCase()) ||
         agency.State.toLowerCase().includes(search.toLowerCase())
      );
      setAgencyData1(filteredAgencyData); 
   }, [search]);

   const containerStyle = {
      display: 'flex',
   };
   const leftSideStyle1 = {
      width: '300px',
      height: '180px',
   }
   const centerContentStyle = {
      flex: 3,
      padding: '20px',
   }
   const rightSideStyle = {
      flex: 0.5,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
   }
   const buttonStyle = {
      padding: '10px 50px',
      border: 'none',
      fontWeight: 'bold',
      borderRadius: '12px',
      background: '#FFB649',
   }
   return (
      <>
         <section id='agency_list' style={{ padding: "70px 15px", background: "#F9F5F4" }}>
            <div className="container p-2 my-1">
               <div class="row">
                  <div class="col-md-10" >
                     <h3 class='text-center py-2'>Shifting Agency List</h3>
                  </div>
                  <div class="col-md-2 mr-5 ">
                     <input type="text" class="form-control my-3 rounded-1 border-0" id="search" name="search" placeholder="Search here" onChange={handleSearch} />
                     
                  </div>
               </div>
            </div>

            <div className="container p-2 my-1" style={{ background: 'white' }}>
               <div className="row">
                  {
                     agencyData1.map((agencydata, index) => (
                        <>
                           <div className='col-lg-4 col-md-6 col-sm-12 mb-3' >
                              <img src={`${backendUrl}/uploads/${agencydata.Agency_img}`} style={leftSideStyle1} />
                           </div>
                           <div className='col-lg-8 col-md-6 col-sm-12 d-flex justify-content-around align-items-center mb-3'>
                              <div style={centerContentStyle}>
                                 <h5 className='fw-bold'>{agencydata.Agency_Name}</h5>
                                 <h6 className='fw-bold'>{agencydata.Owner_Name}</h6>
                                 <h6>{agencydata.Contact_No}</h6>
                                 <p>{agencydata.AgencyDetials}</p>
                              </div>

                              <div style={rightSideStyle}>
                                 <button style={buttonStyle} onClick={() => {
                                    navigate('/Agency_profile', {
                                       state: {
                                          id: agencydata.User_id,
                                          name: agencydata.Agency_Name
                                       }
                                    })
                                 }}>Visit</button>
                              </div>
                           </div>
                        </>
                     ))
                  }
               </div>
            </div>
         </section>
      </>
   );
}
export default Shifting;