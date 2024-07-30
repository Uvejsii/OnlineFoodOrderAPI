import AddToCartButton from "./AddToCartButton";
import DeleteDrinkButton from "./DeleteDrinkButton";
import EditDrinkButton from "./EditDrinkButton";
import styled from "styled-components";
import { motion } from "framer-motion";

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

const DrinkListing = ({ drink, goToDrink, isHomePage }) => {
  const onGoToDrink = (drinkId) => {
    goToDrink(drinkId);
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
          src={drink.imageUrl}
          alt={`${drink.name} image`}
          className="card-img-top img-fluid"
          onClick={() => onGoToDrink(drink.id)}
          style={{
            cursor: "pointer",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
        <CardBody>
          <h5
            onClick={() => onGoToDrink(drink.id)}
            style={{ cursor: "pointer" }}
            className="card-title"
          >
            {drink.name}
          </h5>
        </CardBody>
        <CardFooter>
          {isHomePage ? (
            <div className="d-flex flex-column w-100">
              <div className="d-flex justify-content-between w-100 fs-5 fw-semibold">
                <p className="m-0">€ {drink.price.toFixed(2)}</p>
                <p className="m-0">Rating {drink.rating}</p>
              </div>
              <div className="d-flex mt-1">
                <AddToCartButton product={drink} isHomePage={isHomePage} />
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column gap-2 w-100">
              <div className="d-flex gap-3 w-100">
                <DeleteDrinkButton drink={drink} />
                <EditDrinkButton drink={drink} />
              </div>
              <div className="d-flex">
                <AddToCartButton product={drink} />
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DrinkListing;
