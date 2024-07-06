import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnvelopeAtFill, LockFill } from "react-bootstrap-icons";

const Login = () => {
  // state variables for email and passwords
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(false);
  // state variable for error messages
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handle change events for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "rememberme") setRememberme(e.target.checked);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  // handle submit event for the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate email and passwords
    if (!email || !password) {
      setError("Please fill in all fields.");
    } else {
      // clear error message @Admin00
      setError("");
      // post data to the /register api

      var loginurl = "";
      if (rememberme == true) {
        loginurl = "http://localhost:5071/login?useCookies=true";
      } else {
        loginurl = "http://localhost:5071/login?useSessionCookies=true";
      }

      await fetch(loginurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: "include",
      })
        .then((data) => {
          // handle success or error from the server
          console.log(data);
          if (data.ok) {
            setError("Successful Login.");
            // window.location.href = "/admin";
            navigate("/admin");
          } else setError("Error Logging In.");
        })
        .catch((error) => {
          // handle network error
          console.error(error);
          setError("Error Logging in.");
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
                  <div className="d-flex align-items-center gap-1 fw-semibold mb-3">
                    <input
                      type="checkbox"
                      id="rememberme"
                      name="rememberme"
                      className="mt-1"
                      checked={rememberme}
                      onChange={handleChange}
                    />
                    <span className="text-light m-0">Remember Me</span>
                  </div>
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
