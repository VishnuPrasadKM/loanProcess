import Navbar from 'react-bootstrap/Navbar';
import { TbBuildingBank } from 'react-icons/tb';

function Header() {
  return (
    <div  >
    <Navbar expand="lg" className='header'>
        <Navbar.Brand style={{fontSize:'25px', fontWeight:'500', color:'white', display:'flex'}}><span style={{display:'flex', fontSize:'larger'}}><TbBuildingBank/></span>LOGO</Navbar.Brand>
            <Navbar.Text style={{borderLeft:"2px solid white" ,color:'white', paddingLeft:'18px' }}>Project Name</Navbar.Text>
    </Navbar>
    </div>
  );
}

export default Header;