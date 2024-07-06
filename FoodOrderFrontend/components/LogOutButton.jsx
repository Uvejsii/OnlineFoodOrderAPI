import { useNavigate } from "react-router-dom";
import { PersonFillDash } from "react-bootstrap-icons";

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5071/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
      credentials: "include",
    })
      .then((data) => {
        if (data.ok) {
          navigate("/login");
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <button
        className="btn btn-danger fw-bold fs-5 d-flex align-items-center gap-2"
        onClick={handleSubmit}
      >
        Logout <PersonFillDash />
      </button>
    </>
  );
};

export default LogOutButton;
