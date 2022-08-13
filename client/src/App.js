import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Deck from './pages/Deck'
import './App.css'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className = "pages">
          <Routes>
            <Route path="/" element= {<Home />}/>
            <Route path = "/deck/:id" element = { <Deck />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
