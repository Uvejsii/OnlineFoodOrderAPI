import AddToCartButton from "./AddToCartButton";
import EditFoodButton from "./EditFoodButton";
import styled from "styled-components";
import { motion } from "framer-motion";
import "/src/productDetail.css";
import StartDeleteFood from "./StartDeleteFood";

const Card = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const CardBody = styled.div`
  padding: 15px;
`;

const CardFooter = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const FoodListing = ({ food, goToFood, isHomePage }) => {
  const onGoToFood = (foodId) => {
    goToFood(foodId);
  };

  return (
    <motion.div
      className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <img
          src={food.imageUrl}
          alt={`${food.name} image`}
          className="card-img-top img-fluid"
          onClick={() => onGoToFood(food.id)}
          style={{
            cursor: "pointer",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
        <CardBody>
          <h5
            onClick={() => onGoToFood(food.id)}
            style={{ cursor: "pointer" }}
            className="card-title"
          >
            {food.name}
          </h5>
        </CardBody>
        <CardFooter>
          {isHomePage ? (
            <div className="d-flex flex-column w-100">
              <div className="d-flex justify-content-between w-100 fs-5 fw-semibold">
                <p className="m-0">€ {food.price.toFixed(2)}</p>
                <p className="m-0">Rating {food.rating}</p>
              </div>
              <div className="d-flex mt-1">
                <AddToCartButton product={food} isHomePage={isHomePage} />
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column gap-2 w-100">
              <div className="d-flex gap-3 w-100">
                <StartDeleteFood food={food} />
                <EditFoodButton food={food} />
              </div>
              <div className="d-flex">
                <AddToCartButton product={food} />
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FoodListing;
