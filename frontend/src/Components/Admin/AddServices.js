import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { adminURl } from "../../urls";
function AddServices() {
    const [inputList, setinputList] = useState([{}]);
    const [Gender, setGender] = useState('');

    const handleinputchange = (e, index) => {
        if(e.target.type==="file"){
            console.log('e : ',e.target);
            const  file = e.target.files[0];
            const  name = e.target.name;
            const list = [...inputList];
            console.log('file : ',file.name);
            list[index][name] = file;
            setinputList(list);
        }else{
            const { name, value } = e.target;
            const list = [...inputList];
            list[index][name] = value;
            setinputList(list);
        }
    }

    const handleaddclick = () => {
        setinputList([...inputList, {}]);
    }
    
    useEffect(() => {
        setTimeout(fetchServiceType, 1000);
    }, []);

    const fetchServiceType = async () => {
        try {
            var service_type = document.getElementById('Service_type');
            var result = await axios.get(adminURl + '/getServiceType');
            if (result.status === 201) {
                service_type.length = 0;
                service_type.options[0] = new Option('Select Service Type', '');
                for (var i = 0; i < result.data.servicetype.length; i++) {
                    service_type.options[service_type.length] = new Option(result.data.servicetype[i].Service_type, result.data.servicetype[i].Service_type);
                }
                service_type.options[service_type.length] = new Option('Cooking','Cooking');
            }
        } catch (err) {
            console.log('error : ', err);
        }
    }

    const addService = async (e) => {
        if (inputList[0].Service_type === 'Salon') {
            for (let i of inputList) {
                i["Gender"] = Gender;
            }
            console.log('service : ', inputList);
        }
        console.log("inputList ==== ",inputList);
        const formData= new FormData();
        for (const obj of inputList) {
            for (const key in obj) {
                formData.append(key, obj[key]);
            }
        }
        console.log('form data : ------------>> ',formData);
        console.log('InputList ============= >>> : ',inputList);
        e.preventDefault();
        try {            
            var result = await axios.post(adminURl + '/addservice',  formData );
            if (result.status === 201) {
                Swal.fire("ServiceData Addedd Successfully");
            }
            setinputList([{}]);
            
        } catch (error) {
            console.log('error : ', error);
        }
        e.target.reset();
        window.location.reload();
    }

    return (
        <div className="dataTable">
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-4 mb-3">
                            <select id='Service_type' onChange={(e) => {handleinputchange(e,0)}} name='Service_type' className="btn text-dark" style={{ background: '#FFB649' }}>

                            </select>
                        </div>
                        <div className="col-md-4 col-sm-4 col-4 mb-3">
                            {
                                (inputList[0].Service_type === 'Cooking') ?
                                    <select id="foodregion" name='serviceCategory' className="btn text-dark" style={{ background: '#FFB649' }} onChange={(e) => { handleinputchange(e,0) }}>
                                        <option value=''>Food Region</option>
                                        <option value='Rajasthani'>Rajasthani</option>
                                        <option value='South_Indian'>South Indian</option>
                                        <option value='Gujarati'>Gujarati</option>
                                        <option value='Chinese'>Chinese</option>
                                    </select>
                                    :
                                    <select name="serviceCategory" className="btn text-dark" style={{ background: '#FFB649' }} onChange={(e) => { handleinputchange(e,0) }}>
                                        <option value=''>Select Service Category</option>
                                        <option value='Primary'>Primary</option>
                                        <option value='Secondary'>Secondary</option>
                                        <option value='Tertiary'>Tertiary</option>
                                    </select>
                            }
                        </div>
                        {
                            (inputList[0].Service_type === 'Salon') ?
                                <div className="col-md-4 col-sm-4 col-4 mb-3">
                                    <select className="btn text-dark" style={{ background: '#FFB649' }} onChange={(e) => { setGender(e.target.value) }}>
                                        <option value=''>Gender</option>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                    </select>
                                </div>
                                : ''
                        }
                    </div>
                    <div style={{ width: '100%', padding: '0.5px', background: 'gray', marginBottom: '10px' }}></div>
                    <form method="post" onSubmit={addService} encType="multipart/form-data">
                        {
                            inputList.map((x, i) => {
                                return (
                                    <div key={i} className="row mb-3">
                                        <div className="form-group col-md-3 my-1">
                                            <label>Service Name</label>
                                            <input type="text" name="ServiceName" className="form-control" placeholder="Enter Service Name" onChange={e => handleinputchange(e, i)} />
                                        </div>
                                        <div className="form-group col-md-2  my-1">
                                            <label>Service Image</label>
                                            <input type="file" name="ServiceImage" className="form-control" placeholder="Choose image" onChange={e => handleinputchange(e, i)} />
                                        </div>
                                        <div className="form-group col-md-2 my-1">
                                            <label>Service Price</label>
                                            <input type="text" name="ServicePrice" className="form-control" placeholder="Enter Price" onChange={e => handleinputchange(e, i)} />
                                        </div>
                                        <div className="form-group col-md-2 my-1">
                                            <label>Service Description</label>
                                            <input type="text" name="ServiceDesc" className="form-control" placeholder="Enter Description" onChange={e => handleinputchange(e, i)} />
                                        </div>
                                        <div className="form-group col-md-3 my-4">
                                            {inputList.length - 1 === i &&
                                                <button className="btn btn-success" style={{ cursor: 'pointer' }} onClick={handleaddclick}>Add More</button>
                                            }
                                        </div>
                                    </div>
                                );
                            })}
                        <div className="d-flex justify-content-center align-item-center">
                            <input type="submit" value='Submit' className="btn p-2 text-dark" style={{ background: '#FFB649' }} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddServices;








