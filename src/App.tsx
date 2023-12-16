import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { User } from './pages/User';
import { Admin } from './pages/Admin';
import AddLunch from './pages/AddLunch';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add" element={<AddLunch />} />
      </Routes>
    </Router>
  )
}

export default App;