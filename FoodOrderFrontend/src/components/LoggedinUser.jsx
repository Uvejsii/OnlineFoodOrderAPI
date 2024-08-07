import { ChevronDown, ChevronUp, Person } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../features/users/usersSlice";

const Account = styled.p`
  cursor: pointer;
  position: relative;
  margin: 0;
  padding: 2px;
  border-radius: 4px;
  font-weight: 500;
  &:hover {
    background-color: white;
    color: #ff6536;
    transition: ease-in-out 0.2s;
  }
`;

const AccOptions = styled.div`
  width: 120px !important;
  background-color: #ff6536;
  color: white;
  margin-top: 20px;
  &:hover {
    background-color: #fc9373;
    cursor: pointer;
  }
  @media (max-width: 895px) {
    margin-top: -25px;
  }
`;

const LoggedinUser = ({ toggleHamburgerMenu }) => {
  const { user } = useSelector((state) => state.users);
  const [showAccOptions, setShowAccOptions] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
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
          dispatch(userLogout());
          navigate("/login");
          setShowAccOptions(false);
          toggleHamburgerMenu();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!user) {
    return (
      <Link to="/login" className="text-light">
        <Person className="fs-3" onClick={toggleHamburgerMenu} />
      </Link>
    );
  }

  return (
    <div>
      <Account onClick={() => setShowAccOptions(!showAccOptions)}>
        {user.email}
        {showAccOptions ? (
          <ChevronUp className="ms-2" />
        ) : (
          <ChevronDown className="ms-2" />
        )}
      </Account>
      {showAccOptions && (
        <AccOptions
          onClick={handleLogout}
          className="position-absolute top-50 border w-25 p-1 rounded shadow-lg"
        >
          <p className="m-0">Logout</p>
        </AccOptions>
      )}
    </div>
  );
};

export default LoggedinUser;
