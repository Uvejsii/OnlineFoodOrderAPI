import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const GoToAdminPageButton = () => {
  const navigate = useNavigate();

  const goToAdminPage = () => {
    navigate("/");
  };

  return (
    <button
      className="btn btn-success fw-bold d-flex justify-content-center align-items-center gap-2 mb-2"
      onClick={goToAdminPage}
    >
      Back To Admin Page <ArrowLeftCircleFill />
    </button>
  );
};

export default GoToAdminPageButton;
