import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AddCity } from './components/AddCity';
import { AddCountry } from './components/AddCountry';
import { Home } from './components/dashboard/Home';
import Navbar from './components/Navbar';

function App() {

  return (
    < div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/add-country" element={ <AddCountry /> } />
        <Route path="/add-city" element={ <AddCity /> } />
        <Route path="*" component={ <Home /> } /> 
      </Routes>
    </div>
  );
}

export default App;
