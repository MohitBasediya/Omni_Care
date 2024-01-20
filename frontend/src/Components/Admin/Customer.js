import Table from 'react-bootstrap/Table';
function Customer() {


    return (
        <>
        
            <div className=" dataTable" >
                <h3>
                    Customer
                </h3>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="main-card mb-3 card">
                    <div className='table-responsive'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Serial No.</th>
                                    <th> Name</th>
                                    <th> Email</th>
                                    <th> Phone</th>
                                    <th> Address</th>
                                    <th> Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>   
                                    <td>mark@gmail.com</td>
                                    <td>+9822-587-495</td>
                                    <td>chiman bag indore</td>
                                    <td ><button type="button" class="btn btn-warning w-100" >Active</button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Jacob@gmmail.com</td>
                                    <td>+1111-222-333</td>
                                    <td>indore</td>
                                    <td><button type="button" class="btn btn-danger w-100">Deactive</button></td>


                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td >Larry</td>
                                    <td>Larry@gmail.com</td>
                                    <td>+1111-222-333</td>
                                    <td>burhanpur</td>
                                    <td><button type="button" class="btn btn-warning w-100">Active</button></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td >pankaj</td>
                                    <td>pankaj@gmail.com</td>
                                    <td>+1111-222-333</td>
                                    <td>khandwa</td>
                                    <td><button type="button" class="btn btn-danger w-100">Deactive</button></td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td >anu</td>
                                    <td>anu@gmail.com</td>
                                    <td>+1111-222-333</td>
                                    <td>khargon</td>
                                    <td><button type="button" class="btn btn-warning w-100">Active</button></td>
                                </tr>
                            </tbody>
                        </Table>
                        </div>
                    </div>
                </div>
            </div>
           

        </>
    );
}
export default Customer;