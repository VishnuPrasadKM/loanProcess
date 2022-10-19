import './App.css'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './Components/landingPage';
import Waivers from './Components/waivers'
import RateLock from './Components/rateLock'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/waivers' element={<Waivers/>} />
        <Route path='/ratelock' element={<RateLock/>}/>
      </Routes>
    </div>
  );
}

export default App;
