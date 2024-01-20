import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
function UserReview() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
            <div className=" dataTable">
                <h3>
                    Customer Review
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
                                    <th> Message</th>
                                    <th> Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Electrical</td>
                                    <td>jacob</td>
                                    <td>its very ...</td>
                                    <td><button type="button" class="btn btn-success w-100" onClick={handleShow}>View Message</button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Saloon</td>
                                    <td>Larry</td>
                                    <td>nice Site for ....</td>
                                    <td><button type="button" class="btn btn-success w-100" onClick={handleShow}>View Message</button></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Larry</td>
                                    <td>Cleaning</td>
                                    <td>pankaj</td>
                                    <td>Good Services...</td>
                                    <td><button type="button" class="btn btn-success w-100" onClick={handleShow}>View Message</button></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>pankaj</td>
                                    <td>cook</td>
                                    <td>anu</td>
                                    <td>Nice platform</td>
                                    <td><button type="button" class="btn btn-success w-100" onClick={handleShow}>View Message</button></td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td >anu</td>
                                    <td>House Shifting</td>
                                    <td>mark</td>
                                    <td>Good Service provider </td>
                                    <td><button type="button" class="btn btn-success w-100" onClick={handleShow}>View Message</button></td>
                                </tr>
                            </tbody>

                        </Table>
                       </div>
                    </div>
                </div>
            </div>

       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}
export default UserReview;