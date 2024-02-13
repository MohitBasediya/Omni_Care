import React from "react";
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "datatables.net";
import "datatables.net-responsive";
import { Modal, ModalHeader } from 'reactstrap';

export default function Services() {
    const [updateModel, setUpdateModel] = useState(false);
    const [serviceData, setServiceData] = useState([]);
    const [service, setService] = useState({});
    const dataTableRef = useRef();

    useEffect(() => {
        if (serviceData.length > 0) {
            $(dataTableRef.current).DataTable();
        }
    }, [serviceData]);

    useEffect(() => {
        function data() {
            axios.get('http://localhost:3001/admin/service')
                .then((response) => {
                    setServiceData(response.data.service);
                })
                .catch((err) => console.log(err))
        }
        data();
    }, []);

    const setData = (event) => {
        const { name, value } = event.target;
        if (event.target.type === 'file') {
            const file = event.target.files[0];
            setService({
                ...service,
                [name]: file
            });
        } else {
            setService({
                ...service,
                [name]: value
            });
        }
    }

    const updateService = (e) => {
        e.preventDefault();
        console.log("service", service);
        const formData = new FormData();
        Object.entries(service).forEach(([key, value]) => {
            formData.append(key, value);
        });
        try {
            $(dataTableRef.current).DataTable().destroy();
            axios.post(`http://localhost:3001/admin/updateService`, formData).then((result) => {
                if (result.status === 201) {
                    setUpdateModel(false);
                    console.log(result.data.allService);
                    setServiceData(result.data.allService);
                } else {
                    console.log(result.data.status)
                }
            })
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const setServiceWithoutImage = (service, ServiceCategory, ServiceType) => {
        const { ServiceImage, ...serviceWithoutImage } = service;
        setService({ ...serviceWithoutImage, ServiceType, ServiceCategory });
        setUpdateModel(true);
    }

    const deleteService = (_id, ServiceCategory, ServiceType) => {
        console.log(_id, ServiceCategory, ServiceType);
        try {
            axios.post("http://localhost:3001/admin/deleteService", { _id, ServiceCategory, ServiceType }).then((result) => {
                if (result.status === 201) {
                    setUpdateModel(false);
                    console.log(result.data.allService);
                    setServiceData(result.data.allService);
                } else {
                    console.log(result.data.status)
                }
            })
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        <>
            <div className=" dataTable" >
                <h3>
                    Services
                </h3>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="main-card mb-3 card">
                        <div className='table-responsive'>
                            <table ref={dataTableRef} id="myTable" className="display nowrap">
                                <thead>
                                    <tr>
                                        {/* <th>Serial No.</th> */}
                                        <th>Service Type</th>
                                        <th>Service Category</th>
                                        <th>Service Name</th>
                                        <th>Service Price</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        serviceData.map(serviceType => {
                                            return ["Primary", "Secondary", "Tertiary"].map(serviceCategory => {
                                                if (serviceType[serviceCategory] && serviceType[serviceCategory].length > 0) {
                                                    return serviceType[serviceCategory].map((service, index) => (
                                                        <tr key={index}>
                                                            <td>{serviceType.Service_type}</td>
                                                            <td>{serviceCategory}</td>
                                                            <td>{service.ServiceName}</td>
                                                            <td>{service.ServicePrice}</td>
                                                            <td><button type="button" className="btn btn-success w-100" onClick={() => { setServiceWithoutImage(service, serviceCategory, serviceType.Service_type) }} >Update</button></td>
                                                            <td><button type="button" className="btn btn-danger w-100" onClick={() => { deleteService(service._id, serviceCategory, serviceType.Service_type) }}>Delete</button></td>
                                                        </tr>
                                                    ));
                                                } else {
                                                    return null;
                                                }
                                            });
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={updateModel} id='updatemodel'>
                <ModalHeader toggle={() => { setUpdateModel((false)) }}>
                    Update Service
                </ModalHeader>
                <div className='container p-2'>
                    <div className='row'>
                        <form method='post'>
                            <div className='w-100 p-2'>
                                <label className='text-dark py-1 px-2 fs-5'>Service Name</label>
                                <input className='form-control' onChange={setData} defaultValue={service.ServiceName} name="ServiceName" type='text' placeholder='Enter Service Name' />
                            </div>
                            <div className='w-100 p-2'>
                                <label className='text-dark py-1 px-2 fs-5'>Service Price</label>
                                <input className='form-control' onChange={setData} defaultValue={service.ServicePrice} name="ServicePrice" type='text' placeholder='Enter Service Price' />
                            </div>
                            <div className='w-100 p-2'>
                                <label className='text-dark py-1 px-2 fs-5'>Service Description</label>
                                <input className='form-control' onChange={setData} defaultValue={service.ServiceDesc} name="ServiceDesc" type='text' placeholder='Enter Service Price' />
                            </div>
                            <div className='w-100 p-2'>
                                <label className='text-dark py-1 px-2 fs-5'>Service Image</label>
                                <input type="file" onChange={setData} className="form-control" name='ServiceImage' id="image" />
                            </div>
                            <div className='w-100 py-2 px-3 d-flex justify-content-end'>
                                <button type='submit' className='btn btn-dark text-light mx-2' onClick={updateService}>Update</button>
                                <input type='reset' className='btn btn-danger text-light mx-2' onClick={() => { setUpdateModel(false) }} value='Close' />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    );
}