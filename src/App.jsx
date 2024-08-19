import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Note from './components/Note';
import 'boxicons';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/Note' element={<Note />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
    </>
  )
}

export default App
