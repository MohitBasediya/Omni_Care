import img1 from '../../images/mostbook1.webp';
import img2 from '../../images/mostbook2.webp';
import img3 from '../../images/mostbook3.webp';
import img4 from '../../images/mostbook4.webp';
import './Home.css';
function MostBook(){
   return(
       <>
         <section id="mostbook">
             <div className="head">
                <div className="container p-2">
                   <h1 style={{color:'black',fontWeight:"bold"}}>Most Booked Services</h1>
                   <p style={{color:'black'}}>Discover an array of services meticulously crafted and personalized just for you</p>
                   <div className="line"></div>
                </div>
                <div className="most-service">
                    <div className="container">
                       <div className="row">
                         <div className="col-lg-3 p-2 col-md-6 col-sm-12">
                            <div className="card" style={{width: "100%"}}>
                                <img src={img1} className="card-img-top"/>
                                <div className="card-body text-start">
                                    <p className="card-text">Up to 30 % off on Mens style spa & salon</p>
                                    <div className='d-flex justify-content-center'>
                                      <button  class="btn text-light" style={{background:'black'}}>Go somewhere</button>
                                    </div>
                                </div>
                            </div>
                         </div>
                         <div className="col-lg-3 p-2 col-md-6 col-sm-12">
                            <div className="card" style={{width: "100%"}}>
                                <img src={img2} className="card-img-top"/>
                                <div className="card-body text-start">
                                    <p className="card-text">Up to 30 % off on Mens style spa & salon</p>
                                    <div className='d-flex justify-content-center'>
                                      <button  class="btn bg-yellow text-light" style={{background:'black'}}>Go somewhere</button>
                                    </div>
                                </div>
                            </div>
                         </div>
                         <div className="col-lg-3 p-2 col-md-6 col-sm-12">
                            <div className="card" style={{width: "100%"}}>
                                <img src={img3} className="card-img-top"/>
                                <div className="card-body text-start">
                                    <p className="card-text">Up to 30 % off on Mens style spa & salon</p>
                                    <div className='d-flex justify-content-center'>
                                      <button  class="btn bg-yellow text-light" style={{background:'black'}}>Go somewhere</button>
                                    </div>
                                </div>
                            </div>
                         </div>
                         <div className="col-lg-3 p-2 col-md-6 col-sm-12">
                            <div className="card" style={{width: "100%"}}>
                                <img src={img4} className="card-img-top"/>
                                <div className="card-body text-start">
                                    <p className="card-text">Up to 30 % off on Mens style spa & salon</p>
                                    <div className='d-flex justify-content-center'>
                                      <button  class="btn text-light" style={{background:'black'}}>Go somewhere</button>
                                    </div>
                                </div>
                            </div>
                         </div>
                       </div>
                    </div>
                </div>
             </div>
         </section>        
       </>
   )
}
export default MostBook;