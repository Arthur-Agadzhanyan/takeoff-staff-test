import { useEffect } from 'react';
import { Routes, useNavigate } from 'react-router-dom';
import { auth } from '@app/firebase';
import { useRoutes } from './routes';
import { useAuth } from './app/hooks/use-auth';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const navigate = useNavigate()
  const {isAuth} = useAuth()  

  useEffect(()=>{
    onAuthStateChanged(auth, function(user) {
      if (user) {
        navigate('/profile',{replace: true}) 
        localStorage.setItem('user', JSON.stringify(user))

      } else {
        localStorage.removeItem('user')
      }
    })
    
  },[isAuth,navigate])

  return (
    <Routes>
       {useRoutes(isAuth)}
    </Routes>
  );
}

export default App;
