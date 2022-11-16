import './App.css'
import { Route, Routes} from 'react-router-dom'
import LandingPage from './Components/landingPage';
import Waivers from './Components/waivers'
import RateLock from './Components/rateLock'
import RateLockFull from './Components/rateLockFull'
import WaiversFull from './Components/waiversFull';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/waivers/:loanId' element={<Waivers/>} />
          <Route path='/waivers-fullscreen/:loanId' element={<WaiversFull/>} />
          <Route path='/ratelock/:loanId' element={<RateLock/>}/>
          <Route path='/ratelock-fullscreen/:loanId' element={<RateLockFull/>}/>
          <Route path="*" element={<h1 style={{padding:'40vh 60vh'}}>Page Not Foud:Error 404!</h1>} />
        </Routes>
    </div>
  );
}

export default App;