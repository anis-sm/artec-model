import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Model from './pages/Model';
import Navbar from './components/Navbar'
import HeroSection from './pages/Section1'
import Section2 from './pages/Section2'
import Section3 from './pages/Section3'
import Section4 from './pages/Section4'
import Settings from './pages/Setting'
import Login from './pages/Login'

function App() {
 const [user, setUser] = useState(() => {
  const storedUser = sessionStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});

useEffect(() => {
  if (!user) {
    fetch("http://localhost:5000/api/me", {
      credentials: "include"
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          sessionStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }
      });
  }
}, []);

  return (
    <Router>
      <Routes>
        {/* 🏠 Home page */}
        <Route
          path="/"
          element={
            <>
              <Navbar user={user} />
              <HeroSection user={user} />
              <Section2 user={user} />
              <Section3 user={user} />
              <Section4 user={user} />
            </>
          }
        />

        {/* 🔐 Login page */}
        <Route path="/login" element={<Login />} />
        <Route path="/model" element={<Model />} user={user} />
        <Route path="/settings" element={<Settings />} />

      </Routes>
    </Router>
  )
}

export default App
