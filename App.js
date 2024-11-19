import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import axios from 'axios';
import './App.css'; // Page 1 CSS
import Page2 from './Page2'; // Import Page2
import Page3 from './Page3'; // Import Page3
import Page4 from './Page4'; // Import Page4
import About from './About'; // Import About Page
import Marla3 from './Marla3'; // Import Marla3
import Marla7 from './Marla7'; // Import Marla7
import Marla10 from './Marla10'; // Import Marla10
import Kanal from './Kanal'; // Import kanal
import Page5 from './Page5';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  const [userData, setUserData] = useState({ name: '', mobile: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate inside the App function

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setError(''); // Clear errors on input change
  };

  const handleNextPage = async () => {
    // Input validation for mobile number, name, and ensuring fields are filled
    if (!userData.name || !userData.mobile) {
      setError('Please fill out all fields.');
      return;
    }

    if (userData.mobile.length !== 11) {
      setError('Mobile number must be exactly 11 digits.');
      return;
    }
    
    if (userData.name.length > 40) {
      setError('Name must be 40 characters or less.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/save-user-data/', {
          name: userData.name,
          mobile: userData.mobile,
      });

      console.log(response.data.message); // Log success response
      navigate('/page2'); // Navigate to Page2
  } catch (error) {
      console.error('Error:', error);
      setError('Failed to save data. Please try again.');
  }
    // Navigate to Page 2 after successful validation
    navigate('/page2');
  };

  return (
    <div className="App">
      <div className="page">
        <div className="left-section">
          <div className="form-container">
            <h1>Enter Your Details</h1>
            {error && <p className="error">{error}</p>}
            <input
  type="text"
  name="name"
  className="name-input"
  placeholder="Enter Your Name"
  value={userData.name}
  onChange={handleInputChange}
/>
<input
  type="tel"
  name="mobile"
  className="mobile-input"
  placeholder="Enter Your Mobile Number"
  value={userData.mobile}
  onChange={handleInputChange}
/>
            <button id="nextButtonPage1" onClick={handleNextPage}>Log In</button>
          </div>
        </div>
        <div className="right-section"></div>
      </div>
    </div>
  );
}

// Wrap App with Router and define Routes
function AppWithRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} /> {/* Route to Page3 */}
        <Route path="/page4" element={<Page4 />} /> {/* Route to Page4 */}
        <Route path="/page5" element={<Page5 />} />
        <Route path="/marla3" element={<Marla3 />} /> {/* Route to Marla3 */}
        <Route path="/marla7" element={<Marla7 />} /> {/* Route to Marla7 */}
        <Route path="/marla10" element={<Marla10 />} /> {/* Route to Marla10 */}
        <Route path="/Kanal" element={<Kanal />} /> {/* Route to Kanal */}
        <Route path="/about" element={<About />} /> {/* Route to About Page */}
      </Routes>
    </Router>
  );
}

export default AppWithRouter;
