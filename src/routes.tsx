import { Navigate, Route } from "react-router-dom";
import LoginPage from "./components/pages/Login";
import ProfilePage from "./components/pages/Profile";
import RegisterPage from "./components/pages/Register";

export const useRoutes = (loggedIn: boolean)=>{
    if(loggedIn){
        return(
            <>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path='*' element={<Navigate to="/profile" replace />}/>
            </>
        )
    }
        return(
            <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path='*' element={<Navigate to="/login" replace />}/>
            </>
        )
}