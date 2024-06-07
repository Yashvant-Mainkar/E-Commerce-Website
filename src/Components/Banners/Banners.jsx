import "./banners.css"
import Banner1 from '../../assets/banner1.jpg';
import Banner2 from '../../assets/banner2.jpg';
import Banner3 from '../../assets/banner3.jpg';


const Banners = ()=>{
    return(
        <div className='bannerSection'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='box'>
                            <img src={Banner1} className='w-100 transition' />
                        </div>
                    </div>

                    <div className='col'>
                        <div className='box'>
                            <img src={Banner2} className='w-100 transition' />
                        </div>
                    </div>

                    <div className='col'>
                        <div className='box'>
                            <img src={Banner3} className='w-100 transition' />
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default Banners;