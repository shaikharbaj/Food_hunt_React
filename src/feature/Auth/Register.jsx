import React, { useState,useEffect,useRef  } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import Register_Image from "../../assets/undraw_barbecue_3x93.png";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/slices/userAuthSlice";
import toast from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastId=useRef(null);
  const loggeduser = useSelector((state)=>state.user.loggedUser)
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  //
  const checkUserLoggedIn = () => {
    if (loggeduser) {
      navigate("/");
    }
  };
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const [error, setError] = useState({});
  const checkValidation = () => {
    let Error = {};

    const checkSpace = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
    const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!formValue.name) {
      Error.name = "name is required";
    }
    if (!formValue.email) {
      Error.email = "email is required";
    } else if (!emailregex.test(formValue.email)) {
      Error.email = "enter valid email!";
    }
    if (!formValue.password) {
      Error.password = "password is required !";
    }
    //  else if(!checkSpace.test(formValue.password))
    //  {
    //        Error.password="space is not allowed"
    //  }

    return Error;
  };
  const InputChangeHandler = (e) => {
    setFormValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
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

  const SubmitHandler = (event) => {
    event.preventDefault();
    dismiss();
    const errors = checkValidation();
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      const data = {
        name: formValue.name.trim(),
        email: formValue.email.trim(),
        password: formValue.password.trim(),
      };
      const user = JSON.parse(localStorage.getItem("users"));
     
     

      if (!user) {
        dispatch(signup(data));
        Popup("user logged in successfully", "success", "#00ad1d", "white");
        navigate("/");
      } else {
        //check user alredy exist or not
        const check = user?.filter((user) => user.email === data.email);
        if (check?.length > 0) {
          Popup("user already exist", "error", "red", "white");
        } else {
          dispatch(signup(data));
          Popup("user logged in successfully", "success", "#00ad1d", "white");
          navigate("/");
        }
      }
    }
  };
  return (
    <>
      <section>
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src={Register_Image}
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 col-md-px-5">
              <form onSubmit={SubmitHandler}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                    name="name"
                    value={formValue.name}
                    onChange={InputChangeHandler}
                  />
                  {error?.name && (
                    <p className="error mb-0 mt-2">{error?.name}</p>
                  )}
                </div>
                <div className="form-outline mb-4">
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
                <div className="text-center text-lg-start mt-4 pt-2 mb-4">
                  <button type="submit" className="btn btn-login w-100">
                    Register
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Have an account?{" "}
                    <Link to={"/login"} className="link-danger">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
};

export default Register;
