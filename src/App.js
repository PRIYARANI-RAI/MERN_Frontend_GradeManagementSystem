import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import AddStudentMarks from './Pages/AddStudentMarks';
import EditStudent from './Pages/EditStudent';
import ProtectedOutlet from './Protected';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>

        <Route path="/login" element={<Login />} ></Route>
        <Route element={<ProtectedOutlet />} >
          <Route path="/dashboard" element={<Dashboard />} ></Route>
          <Route path="/addstudent" element={<AddStudentMarks />} ></Route>
          <Route path="edit/:id" element={<EditStudent />} />
          <Route path="delete/:id" element={<deleteStudent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
