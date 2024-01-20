import { useSelector } from 'react-redux';
export default function Profile(){
    const userData = useSelector(state => state.userSlice.user_Data);
    return(<>
            <div class="col-lg-9 col-sm-12">                       
                <section className="userDetails card">
                    <div className="userName">
                        <h1 className="name">{userData.Name}</h1>
                        <div className="map">
                            <i className="ri-map-pin-fill ri"></i>
                            <span>Indore</span>
                        </div>
                        <p>Service provider</p>
                    </div>                    
                </section>
                <section className="timeline_about card">
                    <div className="tabs">
                        <ul>
                            <li className="about active">
                                <i className="ri-user-3-fill ri i"></i>
                                <span><i className="fa-solid fa-user i"></i> &nbsp; About You</span>
                            </li>
                        </ul>
                    </div>

                    <div className=''>
                        <div className='row'>
                            <div class="col-3">
                                <p class="servicehtag">Id : </p>
                            </div>
                            <div class="col-9">
                                <p class="servicepara">{userData._id}</p>
                            </div>
                            <div class="col-3">
                                <p class="servicehtag">Email : </p>
                            </div>
                            <div class="col-9">
                                <p class="servicepara">{userData.Email}</p>
                            </div>
                            <div class="col-3">
                                <p class="servicehtag">Contact Number </p>
                            </div>
                            <div class="col-9">
                                <p class="servicepara">{userData.Contact_No}</p>
                            </div>
                            <div class="col-3">
                                <p class="servicehtag">Service Type : </p>
                            </div>
                            <div class="col-9">
                                <p class="servicepara">Electrical</p>
                            </div>
                            <div class="col-3">
                                <p class="servicehtag">Address : </p>
                            </div>
                            <div class="col-9">
                                <p class="servicepara">SGSITS , Indore (M.P.)</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>           
    )
}