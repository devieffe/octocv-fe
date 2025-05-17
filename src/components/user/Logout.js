import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout()); 
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token"); 
    navigate("/login"); 
  }, [dispatch, navigate]);

  return null; 
};

export default Logout;
