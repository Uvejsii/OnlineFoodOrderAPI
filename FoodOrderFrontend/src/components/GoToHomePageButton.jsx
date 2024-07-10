import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
const GoToHomePageButton = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <button
      className="btn btn-primary fw-bold d-flex justify-content-center align-items-center gap-2 mb-2"
      onClick={goToHomePage}
    >
      Home Page <ArrowLeftCircleFill />
    </button>
  );
};

export default GoToHomePageButton;
