import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages & components 
import Home from './pages/Home'
import TopAnime from './pages/TopAnime';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/top_animes"
              element={<TopAnime />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
