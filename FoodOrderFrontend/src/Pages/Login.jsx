import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EnvelopeAtFill, LockFill } from "react-bootstrap-icons";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../features/users/usersSlice";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, status } = useSelector((state) => state.users);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/userRegister");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
    } else {
      dispatch(login({ email, password }))
        .unwrap()
        .then((data) => {
          if (data.roles.includes("Admin")) {
            navigate("/admin");
            toast.success("Login successful as Admin!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          } else {
            navigate("/");
            toast.success("Login successful!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        })
        .catch(() => {
          toast.error("Error Logging in.");
        });
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden vh-100 pt-5">
      <div className="container py-5 px-md-5 my-4 mt-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-xl-5 col-lg-7 col-md-9 col-sm-9 mb-5 mb-lg-0 position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>
            <div className="card bg-glass col-12">
              <h3 className="text-center text-light mt-4">Login</h3>
              <div className="card-body px-4 pb-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  <div className="form-outline text-light mb-4 fw-semibold">
                    <div className="d-flex align-items-center gap-1 mb-1">
                      <EnvelopeAtFill />
                      <label htmlFor="email">Email:</label>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email address"
                      value={email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-outline text-light mb-4 fw-semibold">
                    <div className="d-flex align-items-center gap-1 mb-1">
                      <LockFill />
                      <label htmlFor="password">Password:</label>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={handleChange}
                    />
                  </div>
                  {error && (
                    <p className="error text-light fw-semibold">{error}</p>
                  )}
                  <div className="d-flex gap-5">
                    <button
                      type="submit"
                      className="btn btn-danger fw-semibold w-50"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleRegisterClick}
                      className="btn btn-primary fw-semibold w-50"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
