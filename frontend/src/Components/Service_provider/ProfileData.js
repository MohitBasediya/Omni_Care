import { useSelector } from 'react-redux';
export default function Profile(){
    const userData = useSelector(state => state.userSlice.user_Data);
    return(<>         

            <div className="col-lg-9 m-auto">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className=" text-lg mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted text-lg mb-0 text-capitalize">{userData[0].Name}</p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0 text-lg">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0 text-lg">{userData[0].Email}</p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0 text-lg">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0 text-lg">{userData[0].Contact_No}</p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0 text-lg">Services</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0 text-capitalize text-lg">{userData[1].Service_type}</p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0 text-lg">Service Category</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0 text-lg text-capitalize">{userData[1].Service_category}</p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0 text-lg">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0 text-lg text-capitalize">{userData[1].Address}, {userData[1].City} ,{userData[1].State}</p>
                    </div>
                  </div>

                </div>
              </div>
              
            </div>
            
        </>           
    )
}