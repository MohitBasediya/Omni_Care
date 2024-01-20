import './customer_services.css'
function Pagination({totalPosts,postPerPage,currentPage,setCurrentPage}){
    let page=[];
    for(let i=1;i<=Math.ceil(totalPosts/postPerPage);i++){
        page.push(i);
    }
    return(
        <>
            <nav className='pagination-outer'>
                <ul className="pagination pagination-lg">
                    {
                        page.map((pg,index)=>{
                            return(
                                <li className="page-item " aria-current="page">
                                   <button key={index} className='page-link' onClick={()=>{
                                    setCurrentPage(pg)
                                   }}>{pg}</button>
                                </li>
                            )
                        })
                    }
                    
                    
                </ul>
            </nav>
        </>
    )
}
export default Pagination;