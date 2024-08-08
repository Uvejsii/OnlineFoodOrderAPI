import { useState, useEffect } from "react";
import { EnvelopeAtFill, LockFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAdminForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.users.user);

  useEffect(() => {
    if (!currentUser || !currentUser.roles.includes("Admin")) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");

      fetch("http://localhost:5071/registerAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }),
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.text();
        })
        .then((message) => {
          console.log("Backend message:", message);
          if (message.trim() === "Admin registered successfully.") {
            setError("");
            toast.success("New Admin Registered Successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          } else {
            setError("Error registering.");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setError("Error registering.");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="addAdminModal"
        tabIndex="-5"
        aria-labelledby="addAdminModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="col-12 text-primary fw-bold form-container border border-primary rounded-3 bg-primary-subtle p-4">
              <h2 className="text-center fw-bold">Add New Admin</h2>
              <div className="form-outline text-primary mb-4 fw-semibold">
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
              <div className="form-outline text-primary mb-4 fw-semibold">
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
              <div className="form-outline text-primary mb-4 fw-semibold">
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
              {error && <p className="error text-danger">{error}</p>}
              <button
                className="btn btn-primary w-100 mt-4 fw-bold"
                data-bs-dismiss={error ? null : "modal"}
              >
                CONFIRM ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddAdminForm;
