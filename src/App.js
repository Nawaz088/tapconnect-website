import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileScreen from './ProfileScreen';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profilescreen/:id" element={<ProfileScreen />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
