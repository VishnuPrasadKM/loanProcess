import './App.css'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './Components/landingPage';
import Waivers from './Components/waivers'
import RateLock from './Components/rateLock'
import RateLockFull from './Components/rateLockFull'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/waivers' element={<Waivers/>} />
        <Route path='/ratelock' element={<RateLock/>}/>
        <Route path='/ratelock' element={<RateLock/>}/>
        <Route path='/ratelock-fullscreen' element={<RateLockFull/>}/>
      </Routes>
    </div>
  );
}

export default App;
