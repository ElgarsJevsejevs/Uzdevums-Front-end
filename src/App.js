import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import '../src/styles/global.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Table } from "./components/Pages/Table";
import { Info } from "./components/Pages/Info";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Table/>}/>
        <Route path='/info' element={<Info/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
