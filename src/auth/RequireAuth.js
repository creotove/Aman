import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "../apis/admin";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAuthenticateUser = async () => {
    try {
      const res = await axios.post(
        "/getAuthenticateUser",
        {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken: localStorage.getItem("refreshToken"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.data.success) {
        setAuth({user:res?.data?.data});
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAuthenticateUser();
  }, []);
  return (
    <>
      {loading ? (
        <section className="h-screen flex justify-center items-center w-screen">
          <span className="loader"></span>
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default RequireAuth;
