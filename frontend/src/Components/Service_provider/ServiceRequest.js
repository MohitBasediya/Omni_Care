import profile from "../../images/profileimg.jpg";
import request1 from "../../images/request1.jpg";
import request2 from "../../images/request2.jpg";
import './Servicprovider.css';
import { Link } from "react-router-dom";
export default function ServiceRequest(){
    const rightSideStyle = {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    };
    const buttonStyle1 = {
        padding: '10px 30px',
        border: 'none',
        fontWeight: 'bold',
        borderRadius: '14px',
        background: '#FFB649',
    };
    const buttonStyle2 = {
        padding: '10px 30px',
        marginLeft: '4px',
        border: 'none',
        fontWeight: 'bold',
        borderRadius: '14px',
        background: '#FFB649',
    };
    return(  

        <div className="col-md-9">
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Description</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Request by</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>When customer wants service</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Time of Booking</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Location</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Distance from you</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Amount you get</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Electrical home services there freeze repairing of gas lickege.</td>
                        <td>Andrew</td>
                        <td>23/12/2023</td>
                        <td>2:45pm</td>
                        <td>207 ,colony nagar ,indore (m.p.)</td>
                        <td>5.24</td>
                        <td>345rs.</td>
                        <td>
                            <div style={rightSideStyle}>
                                <button style={buttonStyle1}>Accept</button>
                                <button style={buttonStyle2}>Decline</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Electrical home services there freeze repairing of gas lickege.</td>
                        <td>Andrew</td>
                        <td>23/12/2023</td>
                        <td>2:45pm</td>
                        <td>207 ,colony nagar ,indore (m.p.)</td>
                        <td>5.24</td>
                        <td>345rs.</td>
                        <td>
                            <div style={rightSideStyle}>
                                <button style={buttonStyle1}>Accept</button>
                                <button style={buttonStyle2}>Decline</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Electrical home services there freeze repairing of gas lickege.</td>
                        <td>Andrew</td>
                        <td>23/12/2023</td>
                        <td>2:45pm</td>
                        <td>207 ,colony nagar ,indore (m.p.)</td>
                        <td>5.24</td>
                        <td>345rs.</td>
                        <td>
                            <div style={rightSideStyle}>
                                <button style={buttonStyle1}>Accept</button>
                                <button style={buttonStyle2}>Decline</button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>                  
    );
}