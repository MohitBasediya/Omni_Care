import './Overview.css';
export default function ServiceOverview() {
    return (
        <>
            <div className="col-md-9 " style={{ backgroundColor: "whitesmoke" }}>
                <h1 style={{ margin: "2rem" }}>Overview</h1>
                <div className="row m-auto"  >
                    <div className="col-md-3 col-sm-12 m-2 bg-white">
                        <i class="fa-solid fa-users i"></i>
                        <span>Total Customer's</span>
                        <p className="overviewcount">56</p>
                    </div>
                    <div className="col-md-3 col-sm-12 m-2 bg-white" >
                        <i class="fa-solid fa-arrows-rotate i"></i>
                        <span>Pedding Services</span>
                        <p>56</p>
                    </div>
                    <div className="col-md-3 col-sm-12 m-2 bg-white" >
                        <i class="fa-regular fa-circle-xmark i"></i>
                        <span>Cancel Services</span>
                        <p>56</p>
                    </div>
                </div>
            </div>
        </>
    );
}