import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnvelopeAtFill, LockFill } from "react-bootstrap-icons";

const Register = () => {
  // state variables for email and passwords
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // state variable for error messages
  const [error, setError] = useState("");

  const handleLoginClick = () => {
    navigate("/login");
  };

  // handle change events for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  // handle submit event for the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // validate email and passwords
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      // clear error message
      setError("");
      // post data to the /register api
      fetch("http://localhost:5071/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        //.then((response) => response.json())
        .then((data) => {
          // handle success or error from the server
          console.log(data);
          if (data.ok) setError("Successful register.");
          else setError("Error registering.");
        })
        .catch((error) => {
          // handle network error
          console.error(error);
          setError("Error registering.");
        });
      navigate("/login");
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
              <h3 className="text-center text-light mt-4">Register</h3>
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
                  <div className="form-outline text-light mb-4 fw-semibold">
                    <div className="d-flex align-items-center gap-1 mb-1">
                      <LockFill />
                      <label htmlFor="confirmPassword">Confirm Password:</label>
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex gap-5">
                    <button
                      type="submit"
                      className="btn btn-success fw-semibold w-50"
                    >
                      Register
                    </button>
                    <button
                      onClick={handleLoginClick}
                      className="btn btn-primary fw-semibold w-50"
                    >
                      Go to Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </section>
  );
};

export default Register;