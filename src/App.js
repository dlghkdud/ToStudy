import { useEffect, useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import StudyListPage from './components/StudyListPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import StudyDiary from './components/StudyDiary';
import WriteDiary from './components/WriteDiary';

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  useEffect(() => {
    console.log(auth.currentUser);
  })
  return (
    <Routes>
      <Route index element={<Home setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/login" element={<Login />}  />
      <Route path="/signup" element={<Signup />} />
      <Route path='/tostudy' element={isLoggedin ? <StudyListPage /> : <Navigate to="/" />} />
      <Route path='/studydiary' element={isLoggedin ? <StudyDiary /> : <Navigate to="/" />} />
      <Route path='/writediary' element={isLoggedin ? <WriteDiary /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
