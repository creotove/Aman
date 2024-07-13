import axios from "../apis/admin";
import React, { useEffect } from "react";
import passwordKeyIcon from "../assets/icons/lockIcon.svg";
import callIcon from "../assets/icons/callIcon.svg";
import useToast from "../hooks/useToast";
import Toast from "../components/newCreated/Toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [phoneNumber, setEmail] = React.useState(9824367931);
  const [password, setPassword] = React.useState("amanTailors");
  const navigate = useNavigate();
  const {
    showToast,
    setShowToast,
    setToastMsg,
    setToastType,
    toastMsg,
    toastType,
  } = useToast();
  const { auth, setAuth } = useAuth();

  const login = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!phoneNumber || !password) {
      setToastMsg("Please fill all the fields!");
      setToastType("error");
      setShowToast(true);
      return;
    }
    try {
      const res = await axios.post("/login", { phoneNumber, password });
      if (res.data.success) {
        setAuth({ user: res.data.data.user });
        setToastMsg("Login successful!");
        setToastType("success");
        setShowToast(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      setToastMsg(error?.response?.data?.message || error.message);
      setToastType("error");
      setShowToast(true);
    }
  };
  useEffect(() => {
    if (auth.user) {
      navigate("/");
    } else {
      console.log("User is not logged in");
    }
  }, [auth, navigate]);
  return (
    <section>
      {showToast && (
        <Toast
          message={toastMsg}
          type={toastType}
          onClose={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowToast(false);
          }} // Close the toast
        />
      )}
      <div className="bg-black border border-[#1b1b1b] h-screen w-screen flex">
        <div className="left_part hidden md:flex md:w-3/5"></div>
        <div className="right_part bg-[linear-gradient(9deg,#1e1e1e,#121212)]0 md:bg-[linear-gradient(9deg,#1e1e1e,#121212)] w-full rounded-none md:rounded-l-3xl flex items-center justify-center flex-col">
          <p className="text-3xl font-semibold">Login</p>
          <form className="mt-10 w-80" onSubmit={login} autoComplete="off">
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md grayscale">
                <img src={callIcon} alt="passwordKeyIcon" className="w-4 h-4" />
              </span>
              <input
                type="password"
                id="phoneNumber"
                className="rounded-none rounded-r-lg bg-black border text-white focus:ring-yellow-400 focus:border-yellow-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex mt-3">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md grayscale">
                <img
                  src={passwordKeyIcon}
                  alt="passwordKeyIcon"
                  className="w-4 h-4"
                />
              </span>
              <input
                type="password"
                id="pasword"
                className="rounded-none rounded-r-lg bg-black border text-white focus:ring-yellow-400 focus:border-yellow-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="myBtn mt-5">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
