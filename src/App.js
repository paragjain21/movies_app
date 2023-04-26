// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
// import Pagination from './Components/Pagination';
// import Favorites from './Components/Favorites';
import Favourite from './Components/Favourite'

 
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>

      <Routes>
        <Route path = "/" element={
          <>
            <Banner></Banner>
            <Movies></Movies>
            {/* <Pagination></Pagination> */}
          </>
        }/>

        <Route path = "/favourites" element={
          <>
            <Favourite></Favourite>
          </>
        }/>
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;