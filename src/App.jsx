import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { MovieDetails } from './pages/MovieDetails';
import { TvDetails } from './pages/TvDetails'
import { LandingPage } from './pages/LandingPage';
import { AuthContextProvider } from './context/AuthContext';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AllMovies from './pages/AllMovies';
import AllSeries from './pages/AllSeries';
import { useDebounce } from './hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import Navbar from './components/Navbar';

function AllMoviesPage() {
  const [query] = useSearchParams();
  const search = query.get('search');
  const debouncedSearch = useDebounce(search, 300);

  return <AllMovies key={debouncedSearch} search={debouncedSearch} />;
}

function AllSeriesPage() {
  const [query] = useSearchParams();
  const search = query.get('search');
  const debouncedSearch = useDebounce(search, 300);

  return <AllSeries key={debouncedSearch} search={debouncedSearch} />;
}

function App() {

  return (
      <Router>
        <AuthContextProvider>
          <main>
            <Routes>
              <Route path="/movie/:movieId" element={<MovieDetails />} /> {/*Proporciona un valor para movieId de lo contrario sería null */}
              <Route path="/tv/:movieId" element={<TvDetails />} />
              <Route path="/" element={<LandingPage className='text-white' />} />
              <Route path='/allmovie' element={<AllMoviesPage />} />
              <Route path='/allseries' element={<AllSeriesPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} /> //se renderizará solo si el usuario está autenticado
            </Routes>
          </main>
        </AuthContextProvider>
      </Router>
  )
}

export default App
