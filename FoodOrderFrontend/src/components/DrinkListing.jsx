import DeleteDrinkButton from "./DeleteDrinkButton";
import EditDrinkButton from "./EditDrinkButton";

const DrinkListing = ({ drink, goToDrink, isHomePage }) => {
  const onGoToDrink = (drinkId) => {
    goToDrink(drinkId);
  };

  return (
    <div className="col">
      <div className="card drink-card">
        <img
          src={drink.imageUrl}
          alt={`${drink.name} image`}
          className="card-img-top img-fluid"
          onClick={() => {
            onGoToDrink(drink.id);
          }}
        />
        <div className="card-body">
          <h5
            onClick={() => {
              onGoToDrink(drink.id);
            }}
          >
            {drink.name}
          </h5>
        </div>
        <div className="card-footer d-flex justify-content-center gap-3">
          {isHomePage ? (
            <div className="d-flex justify-content-between w-100 fs-5 fw-semibold">
              <p className="m-0">€ {drink.price.toFixed(2)}</p>
              <p className="m-0">Rating {drink.rating}</p>
            </div>
          ) : (
            <>
              <DeleteDrinkButton drink={drink} />
              <EditDrinkButton drink={drink} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrinkListing;
