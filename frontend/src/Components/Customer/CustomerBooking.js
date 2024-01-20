import React from "react";
import profile from "../../images/profileimg.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import './Customer.css';
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "datatables.net";
import "datatables.net-responsive";
import { useEffect } from "react";

export default function CustomerBooking() {
  useEffect(() => {
    // Initialize DataTable after component mounts
    $("#myTable").DataTable();
  }, []);
  return (
    // <div>
    //   <div className="container-fluid">
    //     <div className="row">

          <div className="col-sm-12 col-md-6 col-lg-6">
            <div>
              <h3 style={{padding:"1rem",backgroundColor:"#FFC737",width:"10rem",marginTop:"2rem"}}>Bookings</h3>
            </div>
            <div className="table-responsive" style={{backgroundColor:"white", marginTop:"3rem"}}>
              <table
                id="myTable"
                className="display p-2 nowrap"
                style={{ width: "100%"}}
              >
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Contact No.</th>
                    <th>Date Of Service</th>
                    <th>Total Amoount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example rows, make sure the number of columns matches the header */}
                  <tr>
                    <td>1</td>
                    <td>System Architect</td>
                    <td>80854-34245</td>
                    <td>06/08/23</td>
                    <td>78$</td>
                    <td>
                      <button id="viewbutton">Complete</button>
                    </td>
                    <td>
                      <button id="viewbutton">View</button>
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
    //     </div>
    //   </div>
    // </div>
  );
}
