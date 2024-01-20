import Table from 'react-bootstrap/Table';
function CancelOrder() {


    return (
        <>
            <div className=" dataTable">
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
                                    <th> Cancelation Date</th>
                                    <th> Cancelation Time</th>
                                    <th> Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>   
                                    <td>Electrical</td>
                                    <td>jacob</td>
                                    <td>10/10/23</td>
                                    <td>12:12 pm</td>
                                    <td ><button type="button" class="btn btn-success w-100" >Refund</button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Saloon</td>
                                    <td>Larry</td>
                                    <td>14/08/2023</td>
                                    <td>1:12 pm</td>
                                    <td><button type="button" class="btn btn-danger w-100"> Not Refundable</button></td>


                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td >Larry</td>
                                    <td>Cleaning</td>
                                    <td>pankaj</td>
                                    <td>15/9/2023</td>
                                    <td>2:10 pm</td>
                                    <td><button type="button" class="btn btn-success w-100">Refund</button></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td >pankaj</td>
                                    <td>cook</td>
                                    <td>anu</td>
                                    <td>17/12/2023</td> 
                                    <td>3:30 pm</td>
                                    <td><button type="button" class="btn btn-danger w-100"> Not Refundable</button></td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td >anu</td>
                                    <td>House Shifting</td>
                                    <td>mark</td>
                                    <td>20/11/2023</td>
                                    <td>5:10</td>
                                    <td><button type="button" class="btn btn-success w-100">Refund</button></td>
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
export default CancelOrder;