import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { User } from './pages/User';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
      </Routes>
    </Router>
  )
}

export default App;