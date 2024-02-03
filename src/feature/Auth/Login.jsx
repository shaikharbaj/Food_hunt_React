import React, { useEffect, useState,useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./auth.css";
import LoginImage from "../../assets/undraw_Eating_together_re_ux62 (1).png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/userAuthSlice";
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const toastId=useRef(null);
  const loggeduser = useSelector((state) => state.user.loggedUser);
  const navigate = useNavigate();

  //check user already loggedin or not if user is logged in then we not show login or register page to user....
  const checkUserLoggedIn = () => {
    if (loggeduser) {
      navigate("/");
    }
  };
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const Popup = (message, type, background, color) =>
    (toastId.current = toast[type](message, {
      position: "top-center",
      autoClose: 100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: { background: background, color: color },
    }));

    const dismiss = () =>  toast.dismiss(toastId.current);

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const checkValidation = () => {
    let Error = {};
    const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!formValue.email) {
      Error.email = "email is required";
    } else if (!emailregex.test(formValue.email)) {
      Error.email = "enter valid email!";
    }
    if (!formValue.password) {
      Error.password = "password is required !";
    }

    return Error;
  };
  const InputChangeHandler = (e) => {
    setFormValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const SubmitHandler = (event) => {
    event.preventDefault();
    const { state } = location;
    const redirectPath = state?.from || '/';
    const errors = checkValidation();
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      dismiss();
      const data = {
        email: formValue.email.trim(),
        password: formValue.password.trim(),
      };

      //check user....
      const users = JSON.parse(localStorage.getItem("users"));
      if (!users) {
        Popup("user not registerd", "error", "red", "white");
      } else {
        const check = users.filter((user) => user.email === data.email);

        if (check.length === 0) {
            Popup("user not registerd", "error", "red", "white");
        } else {
          if (check[0].password === data.password) {
            dispatch(login(check[0]));
            Popup("user logged in successfully", "success", "#00ad1d", "white");
            navigate(redirectPath);
          } else {

            Popup("Invalid credentials", "error", "red", "white");
          }
        }
      }
    }
  };
  return (
    <section>
      {/* <Toaster /> */}
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={LoginImage} className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 col-md-px-5">
            <form onSubmit={SubmitHandler}>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control"
                  placeholder="Enter a valid email address"
                  name="email"
                  value={formValue.email}
                  onChange={InputChangeHandler}
                />
                {error?.email && (
                  <p className="error mb-0 mt-2">{error?.email}</p>
                )}
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={formValue.password}
                  onChange={InputChangeHandler}
                />
                {error?.password && (
                  <p className="error mb-0 mt-2">{error?.password}</p>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                {/* <a href="#!" className="text-body">Forgot password?</a> */}
              </div>

              <div className="text-center text-lg-start mt-3 pt-2 mb-3">
                <button type="submit" className="btn btn-login w-100">
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link to={"/register"} className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
