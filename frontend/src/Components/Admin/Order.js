import Table from 'react-bootstrap/Table';
function Order() {


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
                                    <th> Service</th>
                                    <th> Provider</th>
                                    <th> Address</th>
                                    <th> Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>   
                                    <td>Electrical</td>
                                    <td>jacob</td>
                                    <td>chiman bag indore</td>
                                    <td ><button type="button" class="btn btn-warning w-100" >Dispatch</button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Saloon</td>
                                    <td>Larry</td>
                                    <td>indore</td>
                                    <td><button type="button" class="btn btn-danger w-100">Panding</button></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td >Larry</td>
                                    <td>Cleaning</td>
                                    <td>pankaj</td>
                                    <td>burhanpur</td>
                                    <td><button type="button" class="btn btn-warning w-100">Dispatch</button></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td >pankaj</td>
                                    <td>cook</td>
                                    <td>anu</td>
                                    <td>khandwa</td>
                                    <td><button type="button" class="btn btn-danger w-100">Panding</button></td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td >anu</td>
                                    <td>House Shifting</td>
                                    <td>mark</td>
                                    <td>khargon</td>
                                    <td><button type="button" class="btn btn-warning w-100">Dispatch</button></td>
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
export default Order;