import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <div  >
    <Navbar expand="lg" className='header'>
        <Navbar.Brand style={{fontSize:'25px', fontWeight:'500', color:'white'}}>LOGO</Navbar.Brand>
            <Navbar.Text className='divider' style={{color:'white'}}>|</Navbar.Text>
            <Navbar.Text style={{color:'white'}}>Project Name</Navbar.Text>
    </Navbar>
    </div>
  );
}

export default Header;