import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages & components 
import Home from './pages/Home'
import TopAnime from './pages/TopAnime';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Anime from './pages/Anime';
import User from './pages/User';
import EditAnime from './pages/EditAnime';
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
            <Route 
              path="/login"
              element={<Login />}
            />
            <Route 
              path="/signup"
              element={<Signup />}
            />
            <Route 
              path="/anime"
              element={<Anime />}
            />
            <Route 
              path="/anime/list"
              element={<EditAnime />}
            />
            <Route 
              path="/user"
              element={<User />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
