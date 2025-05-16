import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footercommon from '../components/Footercommon';
import Headercommon2 from '../components/Headercommon2';

function About()
{
    return(
        <div className="container-fluid">
            <div className="text-center text-white p-3 bg-black">
                <h1 style={{ fontFamily: 'ROBOT' }}>BALAJI SHOE MART</h1>
            </div>
            <br />
            <Headercommon2/>
            <Footercommon/>
        </div>
    );
}
export default About;