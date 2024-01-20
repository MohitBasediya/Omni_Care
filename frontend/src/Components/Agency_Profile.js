function Agency_Profile() {
    return (<>
    <section style={{padding:'73px 0 0 0'}}>
        <div className="container-fluid" style={{ background: '#F9F5F4' }}>
            <div className="row">
                {/* div for form start */}
                <div className='col-md-4 d-flex py-5 px-3 justify-content-center align-items-center'>
                    <div className='w-100 px-3 py-2 bg-yellow border-0 rounded-3' style={{ background: '#FFC36A' }}>
                        <h4>Booking Form</h4>
                        <form method='post' className="w-100 px-2">
                            <select class=" form-control form-select my-3 rounded-1 border-0" id="service" name="service" placeholder="Select Service">
                                <option value="">Select...</option>
                                <option value="service1">Local Area</option>
                                <option value="service2">City Area</option>
                                <option value="service3">State Area</option>
                            </select>
                            <select class=" form-control form-select my-3 rounded-1 border-0" id="service" name="service" placeholder="Household Shifting Type">
                                <option value="">Select...</option>
                                <option value="service1">1 BHK</option>
                                <option value="service2">2 BHK</option>
                                <option value="service3">3 BHK</option>
                                <option value="service4">4 - 5 BHK</option>
                                <option value="service5">Complete Household </option>
                            </select>
                            <input type="text" class="form-control my-3 rounded-1 border-0" id="fromlocation" name="fromlocation" placeholder="From Location" />
                            <input type="text" class="form-control my-3 rounded-1 border-0" id="tolocation" name="tolocation" placeholder="To Location" />
                            <input type="date" className="form-control my-3 rounded-1 border-0" id="date" name="date" placeholder="Select Date" />
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn rounded-1 border-0" style={{ background: 'black', color: 'white' }}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* div for form end */}

                {/* div for content start */}
                <div id="divforfrom" className="col-md-8">
                    <div className='m-4 p-5' style={{ background: '#F9F5F4' }}>
                        <center>
                            <h3>Agarwal Pakers and Movers House<br />
                                Shifting Services</h3>
                        </center><br /><br />
                        <p>
                            House shifting services can be recruited for household products shifting from one place/city to another. Assuming you are searching for top notch and financially savvy home shifting services close to you then Agarwal Packers and Movers can help you altogether.
                        </p>
                        <p>
                            With us you will actually want to design your move with a solid and experienced packers and movers house shifting organization. You will encounter totally protected and bother free execution of whole home shifting interaction. Every one of your households things will be pressed accurately and moved to your objective securely. By choosing Agarwal packers and movers shifting services you will actually want to save your valuable investment too.
                        </p>
                        <p>
                            Moving to a new home can be an additional difficult experience for youngsters to adapt to. The actual distance moved is not so important. Either across state/Cities or across the country, the transition is very stressful because it needs children to disconnect the attachments they have formed with their most intimate physical environments.
                        </p>
                    </div>
                </div>
                {/* div for content end */}
            </div>
            {/* Row Close */}

            <div className='col-12 p-2 d-flex justify-content-center align-items-center'>
                <center>
                    <h2>House Shifting Services Charges</h2>
                    <p className='p-3'>If you are searching for the best "house shifting near me" then you are in the right place. Agarwal Packers and Movers offers the best household shifting charges near your preferred local location and across India.</p>
                </center>
            </div>

            <div className='col-12 mt-4 p-2'>
                <h4>House Shifting Services Charges</h4>
                <div className='col-12 p-2 w-80 table-responsive'>
                    <table className="table">
                        <thead style={{ background: '#6B6565' }}>
                            <tr>
                                <th scope="col">Shifting Type</th>
                                <th scope="col">Up to 12 km</th>
                                <th scope="col">13 - 30 km</th>
                                <th scope="col">31+ km</th>
                            </tr>
                        </thead>
                        <tbody style={{ background: '#D9D9D9' }}>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">1 BHK</th>
                                <td>Rs 3000 - 7000</td>
                                <td>Rs 4000 - 8000</td>
                                <td>Rs 6000 - 9000</td>
                            </tr>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">2 BHK</th>
                                <td>Rs 4000 - 8000</td>
                                <td>Rs 5000 - 10000</td>
                                <td>Rs 8000 - 13000</td>
                            </tr>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">3 BHK</th>
                                <td>Rs 5000 - 14000</td>
                                <td>Rs 6000 - 16000</td>
                                <td>Rs 8000 - 18000</td>
                            </tr>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">4 - 5 BHK</th>
                                <td>Rs 8000 - 16000</td>
                                <td>Rs 10000 - 20000</td>
                                <td>Rs 13000 - 25000</td>
                            </tr>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">Complete Household</th>
                                <td>Rs 6500 - 21000</td>
                                <td>Rs 9000 - 28000</td>
                                <td>Rs 9500 - 30000</td>
                            </tr>
                        </tbody>
                        <tfoot style={{ background: '#6B6565' }}>
                            <tr>
                                <th></th>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <center>
                <h2>Domestic House Shifting Services Charges</h2>
            </center>

            <div className='col-12 mt-4 p-2'>
                <h4>City Shifting Services Charges</h4>
                <div className='col-12 p-2 w-80 table-responsive'>
                    <table className="table">
                        <thead style={{ background: '#6B6565' }}>
                            <tr>
                                <th scope="col">Shifting Type</th>
                                <th scope="col">Up to 100 km</th>
                                <th scope="col">100 - 400 km</th>
                                <th scope="col">400 - 800 km</th>
                            </tr>
                        </thead>
                        <tbody style={{ background: '#D9D9D9' }}>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">1 BHK</th>
                                <td>Rs 3000 - 7000</td>
                                <td>Rs 4000 - 8000</td>
                                <td>Rs 6000 - 9000</td>
                            </tr>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">2 BHK</th>
                                <td>Rs 4000 - 8000</td>
                                <td>Rs 5000 - 10000</td>
                                <td>Rs 8000 - 13000</td>
                            </tr>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">3 BHK</th>
                                <td>Rs 5000 - 14000</td>
                                <td>Rs 6000 - 16000</td>
                                <td>Rs 8000 - 18000</td>
                            </tr>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">4 - 5 BHK</th>
                                <td>Rs 8000 - 16000</td>
                                <td>Rs 10000 - 20000</td>
                                <td>Rs 13000 - 25000</td>
                            </tr>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">Complete Household</th>
                                <td>Rs 6500 - 21000</td>
                                <td>Rs 9000 - 28000</td>
                                <td>Rs 9500 - 30000</td>
                            </tr>
                        </tbody>
                        <tfoot style={{ background: '#6B6565' }}>
                            <tr>
                                <th></th>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className='col-12 mt-4 p-2'>
                <h4>State Shifting Services Charges</h4>
                <div className='col-12 p-2 w-80 table-responsive'>
                    <table className="table">
                        <thead style={{ background: '#6B6565' }}>
                            <tr>
                                <th scope="col">Shifting Type</th>
                                <th scope="col">Up to 900 km</th>
                                <th scope="col">900 - 1300 km</th>
                                <th scope="col">1300 - 1700 km</th>
                            </tr>
                        </thead>
                        <tbody style={{ background: '#D9D9D9' }}>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">1 BHK</th>
                                <td>Rs 3000 - 7000</td>
                                <td>Rs 4000 - 8000</td>
                                <td>Rs 6000 - 9000</td>
                            </tr>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">2 BHK</th>
                                <td>Rs 4000 - 8000</td>
                                <td>Rs 5000 - 10000</td>
                                <td>Rs 8000 - 13000</td>
                            </tr>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">3 BHK</th>
                                <td>Rs 5000 - 14000</td>
                                <td>Rs 6000 - 16000</td>
                                <td>Rs 8000 - 18000</td>
                            </tr>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">4 - 5 BHK</th>
                                <td>Rs 8000 - 16000</td>
                                <td>Rs 10000 - 20000</td>
                                <td>Rs 13000 - 25000</td>
                            </tr>
                            <tr style={{ borderBottom: '2px solid #6B6565' }}>
                                <th scope="row">Complete Household</th>
                                <td>Rs 6500 - 21000</td>
                                <td>Rs 9000 - 28000</td>
                                <td>Rs 9500 - 30000</td>
                            </tr>
                        </tbody>
                        <tfoot style={{ background: '#6B6565' }}>
                            <tr>
                                <th></th>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </section>
    </>);
}

export default Agency_Profile;