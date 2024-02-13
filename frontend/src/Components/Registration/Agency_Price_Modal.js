import { useState } from "react";
import { Modal } from "reactstrap";
import Swal from 'sweetalert2';
export function Agency_Price_Modal(){
    const [localModal, setlocalModal] = useState('local');
    const [LocalData, setLocalData] = useState({
        localonebhk1: '',
        localonebhk2: '',
        localonebhk3: '',
    
        localtwobhk1 : '',
        localtwobhk2 : '',
        localtwobhk3 : '',
    
        localthreebhk1 : '',
        localthreebhk2 : '',
        localthreebhk3 : '',
    
        localfourtofivebhk1 : '',
        localfourtofivebhk2 : '',
        localfourtofivebhk3 : '',
    
        localcmplt1 : '',
        localcmplt2 : '',
        localcmplt3 : '',
    });
    
    const [CityData, setCityData] = useState({
        cityonebhk1: '',
        cityonebhk2: '',
        cityonebhk3: '',
    
        citytwobhk1 : '',
        citytwobhk2 : '',
        citytwobhk3 : '',
    
        citythreebhk1 : '',
        citythreebhk2 : '',
        citythreebhk3 : '',
    
        cityfourtofivebhk1 : '',
        cityfourtofivebhk2 : '',
        cityfourtofivebhk3 : '',
    
        citycmplt1 : '',
        citycmplt2 : '',
        citycmplt3 : '',
    });
    
    const [StateData, setStateData] = useState({
        stateonebhk1: '',
        stateonebhk2: '',
        stateonebhk3: '',
    
        statetwobhk1 : '',
        statetwobhk2 : '',
        statetwobhk3 : '',
    
        statethreebhk1 : '',
        statethreebhk2 : '',
        statethreebhk3 : '',
    
        statefourtofivebhk1 : '',
        statefourtofivebhk2 : '',
        statefourtofivebhk3 : '',
    
        statecmplt1 : '',
        statecmplt2 : '',
        statecmplt3 : '',
    });

    const setModal = (value) => {
        if (value == 'local') {
            setlocalModal(value);

            const localbutton = document.getElementById('localbtn');
            localbutton.style.backgroundColor = 'black';
            localbutton.style.color = 'white';

            const citybutton = document.getElementById('citybtn');
            citybutton.style.backgroundColor = 'white';
            citybutton.style.color = 'black';

            const statebutton = document.getElementById('statebtn');
            statebutton.style.backgroundColor = 'white';
            statebutton.style.color = 'black';
        }
        else if (value == 'city') {
            setlocalModal(value);

            const citybutton = document.getElementById('citybtn');
            citybutton.style.backgroundColor = 'black';
            citybutton.style.color = 'white';

            const localbutton = document.getElementById('localbtn');
            localbutton.style.backgroundColor = 'white';
            localbutton.style.color = 'black';

            const statebutton = document.getElementById('statebtn');
            statebutton.style.backgroundColor = 'white';
            statebutton.style.color = 'black';
        }
        else {
            setlocalModal(value);

            const button = document.getElementById('statebtn');
            button.style.backgroundColor = 'black';
            button.style.color = 'white';

            const localbutton = document.getElementById('localbtn');
            localbutton.style.backgroundColor = 'white';
            localbutton.style.color = 'black';

            const citybutton = document.getElementById('citybtn');
            citybutton.style.backgroundColor = 'white';
            citybutton.style.color = 'black';
        }
    }

    return(<>
        <Modal isOpen={true} id='exampleModal'>
            <div className='modal1'>
                <div class="p-2 w-100">
                    <div class="w-100">
                        <div style={{ background : "white", padding: '5px', margin: '15px', minHeight: '40px',display:'flex',justifyContent:'space-around',alignItems:'center' }}>
                            <button type="button" id="localbtn" onClick={()=>setModal('local')} className="btn">Local House shifting</button>
                            <button type="button" id="citybtn" onClick={()=>setModal('city')} className="btn">City House shifting</button>
                            <button type="button" id="statebtn" onClick={()=>setModal('state')} className="btn">State House shifting</button>
                        </div>
                    <form>
                    {(localModal==='local')? 
                    <>   
                        <h5 className="ms-5 pt-4">Local House Shifting Charges</h5>
                        <div className="mt-3 mx-5" style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
                        <div className="row font-weight-bold">
                            <div className="col">Shifting Type</div>
                            <div className="col">Up to 12 km</div>
                            <div className="col">13 - 30 km</div>
                            <div className="col">31+ km</div>
                        </div>
                        {
                            console.log('input in local')
                        }
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2 ml-4">1 BHK</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localonebhk1" placeholder="Rs" value={LocalData["localonebhk1"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localonebhk2" placeholder="Rs" value={LocalData["localonebhk2"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})}  /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localonebhk3" placeholder="Rs" value={LocalData["localonebhk3"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})}  /></div>
                        </div>
                
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2 ml-4">2 BHK</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localtwobhk1" placeholder="Rs" value={LocalData["localtwobhk1"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localtwobhk2" placeholder="Rs" value={LocalData["localtwobhk2"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})}/></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localtwobhk3" placeholder="Rs" value={LocalData["localtwobhk3"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                        </div>
                
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2 ml-4">3 BHK</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localthreebhk1" placeholder="Rs" value={LocalData["localthreebhk1"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localthreebhk2" placeholder="Rs" value={LocalData["localthreebhk2"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localthreebhk3" placeholder="Rs" value={LocalData["localthreebhk3"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                        </div>
                
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2">4 - 5 BHK</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localfourtofivebhk1" placeholder="Rs" value={LocalData["localfourtofivebhk1"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localfourtofivebhk2" placeholder="Rs" value={LocalData["localfourtofivebhk2"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localfourtofivebhk3" placeholder="Rs" value={LocalData["localfourtofivebhk3"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                        </div>
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2">Complete Household</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localcmplt1" placeholder="Rs" value={LocalData["localcmplt1"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localcmplt2" placeholder="Rs" value={LocalData["localcmplt2"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="localcmplt3" placeholder="Rs" value={LocalData["localcmplt3"]} onChange={(e) =>setLocalData({...LocalData, [e.target.name]: e.target.value})} /></div>
                        </div>
                        </div>   
                        </>     
                        :(localModal==='city')?  
                        <>
                        <h5 className="ms-5 pt-4">City House Shifting Charges</h5>
                        {
                            console.log('input in city')
                        }
                        <div className="mt-3 mx-5" style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
                        <div className="row font-weight-bold">
                            <div className="col">Shifting Type</div>
                            <div className="col">Up to 100 km</div>
                            <div className="col">100 - 400 km</div>
                            <div className="col">400 - 800 km</div>
                        </div>
                
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2 ml-4">1 BHK</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="cityonebhk1" placeholder="Rs" value={CityData["cityonebhk1"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="cityonebhk2" placeholder="Rs" value={CityData["cityonebhk2"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="cityonebhk3" placeholder="Rs" value={CityData["cityonebhk3"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                        </div>
                
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2 ml-4">2 BHK</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citytwobhk1" placeholder="Rs" value={CityData["citytwobhk1"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citytwobhk2" placeholder="Rs" value={CityData["citytwobhk2"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citytwobhk3" placeholder="Rs" value={CityData["citytwobhk3"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                        </div>
                
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2 ml-4">3 BHK</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citythreebhk1" placeholder="Rs" value={CityData["citythreebhk1"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citythreebhk2" placeholder="Rs" value={CityData["citythreebhk2"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citythreebhk3" placeholder="Rs" value={CityData["citythreebhk3"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                        </div>
                
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2">4 - 5 BHK</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="cityfourtofivebhk1" placeholder="Rs" value={CityData["cityfourtofivebhk1"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="cityfourtofivebhk2" placeholder="Rs" value={CityData["cityfourtofivebhk2"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="cityfourtofivebhk3" placeholder="Rs" value={CityData["cityfourtofivebhk3"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                        </div>
                
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2">Complete Household</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citycmplt1" placeholder="Rs" value={CityData["citycmplt1"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citycmplt2" placeholder="Rs" value={CityData["citycmplt2"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="citycmplt3" placeholder="Rs" value={CityData["citycmplt3"]} onChange={(e) =>setCityData({...CityData, [e.target.name]: e.target.value})} /></div>
                        </div>
                    
                        </div>
                        </>
                        :       
                        <>
                        <h5 className="ms-5 pt-4">State House Shifting Charges</h5>
                
                        <div className="mt-3 mx-5" style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
                        <div className="row font-weight-bold">
                            <div className="col">Shifting Type</div>
                            <div className="col">Up to 900 km</div>
                            <div className="col">900 - 1300 km</div>
                            <div className="col">1300 - 1700 km</div>
                        </div>
                        {
                            console.log('input in state')
                        }
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2 ml-4">1 BHK</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="stateonebhk1" placeholder="Rs" value={StateData["stateonebhk1"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="stateonebhk2" placeholder="Rs" value={StateData["stateonebhk2"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="stateonebhk3" placeholder="Rs" value={StateData["stateonebhk3"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                        </div>
                
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2 ml-4">2 BHK</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statetwobhk1" placeholder="Rs" value={StateData["statetwobhk1"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statetwobhk2" placeholder="Rs" value={StateData["statetwobhk2"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statetwobhk3" placeholder="Rs" value={StateData["statetwobhk3"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                        </div>
                
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2 ml-4">3 BHK</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statethreebhk1" placeholder="Rs" value={StateData["statethreebhk1"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statethreebhk2" placeholder="Rs" value={StateData["statethreebhk2"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statethreebhk3" placeholder="Rs" value={StateData["statethreebhk3"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                        </div>
                
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2">4 - 5 BHK</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statefourtofivebhk1" placeholder="Rs" value={StateData["statefourtofivebhk1"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statefourtofivebhk2" placeholder="Rs" value={StateData["statefourtofivebhk2"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statefourtofivebhk3" placeholder="Rs" value={StateData["statefourtofivebhk3"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                        </div>
                
                        <div className="row mt-3" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                            <div className="col-md-3 col-sm-12 p-2">Complete Household</div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statecmplt1" placeholder="Rs" value={StateData["statecmplt1"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statecmplt2" placeholder="Rs" value={StateData["statecmplt2"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                            <div className="col-md-3 col-sm-12 p-2"><input type="text" className='p-2 rounded-1' name="statecmplt3" placeholder="Rs" value={StateData["statecmplt3"]} onChange={(e) =>setStateData({...StateData, [e.target.name]: e.target.value})} /></div>
                        </div>       
                        </div>
                        </>
                    }
                    <div className="mt-3 px-5 d-flex justify-content-end">
                            <button type="submit" className="btn text-white" style={{background:'black'}}>Submit</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </Modal>
    </>

    )
}