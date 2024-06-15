import logo from './logo.svg';
import './App.css';
import { Home } from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Collection } from './Pages/Collection';
import { BestDeals } from './Pages/BestDeals';
import { ProductDetailsPage } from './Pages/ProductDetailsPage';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Best-Deals" element={<BestDeals/>}></Route>
        <Route path="/Collection" element={<Collection/>}></Route>
        <Route path="/Orders" element={<Home/>}></Route>
        <Route path="/ProductDetails" element={<ProductDetailsPage/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
      </Routes>
    </div>
  );
}

export default App;