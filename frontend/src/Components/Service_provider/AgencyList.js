import agency1 from '../../images/agency1.jpg';
import agency2 from '../../images/agency2.jpg';
import agency3 from '../../images/agency3.jpg';
import agency4 from '../../images/agency4.jpg';
import agency5 from '../../images/agency5.jpg';

function Shifting(){    
   const containerStyle = {
      display: 'flex',
   };        
   const leftSideStyle1={
      width: '100%',
      height: '100%',
   }   
   const centerContentStyle = {
      flex: 3,
      padding: '20px',
   }   
   const rightSideStyle = {
      flex: 0.5,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
   }    
   const buttonStyle = {
      padding:'10px 50px',
      border:'none',
      fontWeight:'bold',
      borderRadius:'12px',
      background: '#FFB649',
   }
   return(
        <>
        <section id='agency_list' style={{padding:"70px 15px",background:"#F9F5F4"}}>
        <div className="container p-2 my-1" style={{background:'white'}}>
         <div className="row">
            <div className='col-lg-4 col-md-6 col-sm-12'>            
               <img src={agency1} style={leftSideStyle1} alt="" />
            </div>
            <div className='col-lg-8 col-md-6 col-sm-12 d-flex justify-content-around align-items-center'>
               <div style={centerContentStyle}>
                  <h5 className='fw-bold'>Agarwal Packers and Movers</h5>
                  <h6 className='fw-bold'>Mr. Dayanand Agarwal</h6>
                  <h6>9360014001</h6>
                  <p>Agarwal Packers and Movers is the original and long-serving shifting company since 1984 . To help our clientele differentiate the original from the other players in the market with a similar.</p>
               </div>
               <div style={rightSideStyle}>
                  <button style={buttonStyle}>Visit</button>
               </div>
           </div>
        </div>
      </div>
      <div className="container p-2 my-1" style={{background:'white'}}>
      <div className="row">
            <div className='col-lg-4 col-md-6 col-sm-12'>            
               <img src={agency2} style={leftSideStyle1} alt="" />
            </div>
            <div className='col-lg-8 col-md-6 col-sm-12 d-flex justify-content-around align-items-center'>
               <div style={centerContentStyle}>
                  <h5 className='fw-bold'>Agarwal Packers and Movers</h5>
                  <h6 className='fw-bold'>Mr. Dayanand Agarwal</h6>
                  <h6>9360014001</h6>
                  <p>Agarwal Packers and Movers is the original and long-serving shifting company since 1984. To help our clientele differentiate the original from the other players in the market with a similar.</p>
               </div>
               <div style={rightSideStyle}>
                  <button style={buttonStyle}>Visit</button>
               </div>
           </div>
        </div>
      </div>
      <div className="container p-2 my-1" style={{background:'white'}}>
      <div className="row">
            <div className='col-lg-4 col-md-6 col-sm-12'>            
               <img src={agency3} style={leftSideStyle1} alt="" />
            </div>
            <div className='col-lg-8 col-md-6 col-sm-12 d-flex justify-content-around align-items-center'>
               <div style={centerContentStyle}>
                  <h5 className='fw-bold'>Agarwal Packers and Movers</h5>
                  <h6 className='fw-bold'>Mr. Dayanand Agarwal</h6>
                  <h6>9360014001</h6>
                  <p>Agarwal Packers and Movers is the original and long-serving shifting company since 1984. To help our clientele differentiate the original from the other players in the market with a similar.</p>
               </div>
               <div style={rightSideStyle}>
                  <button style={buttonStyle}>Visit</button>
               </div>
           </div>
        </div>
      </div>
      <div className="container p-2 my-1" style={{background:'white'}}>
      <div className="row">
            <div className='col-lg-4 col-md-6 col-sm-12'>            
               <img src={agency4} style={leftSideStyle1} alt="" />
            </div>
            <div className='col-lg-8 col-md-6 col-sm-12 d-flex justify-content-around align-items-center'>
               <div style={centerContentStyle}>
                  <h5 className='fw-bold'>Agarwal Packers and Movers</h5>
                  <h6 className='fw-bold'>Mr. Dayanand Agarwal</h6>
                  <h6>9360014001</h6>
                  <p>Agarwal Packers and Movers is the original and long-serving shifting company since 1984. To help our clientele differentiate the original from the other players in the market with a similar.</p>
               </div>
               <div style={rightSideStyle}>
                  <button style={buttonStyle}>Visit</button>
               </div>
           </div>
        </div>
      </div>
      <div className="container p-2 my-1" style={{background:'white'}}>
       <div className="row">
            <div className='col-lg-4 col-md-6 col-sm-12'>            
               <img src={agency5} style={leftSideStyle1} alt="" />
            </div>
            <div className='col-lg-8 col-md-6 col-sm-12 d-flex justify-content-around align-items-center'>
               <div style={centerContentStyle}>
                  <h5 className='fw-bold'>Agarwal Packers and Movers</h5>
                  <h6 className='fw-bold'>Mr. Dayanand Agarwal</h6>
                  <h6>9360014001</h6>
                  <p>Agarwal Packers and Movers is the original and long-serving shifting company since 1984. To help our clientele differentiate the original from the other players in the market with a similar.</p>
               </div>
               <div style={rightSideStyle}>
                  <button style={buttonStyle}>Visit</button>
               </div>
           </div>
        </div>
      </div>
      </section>
        </>
    );
}
export default Shifting;
