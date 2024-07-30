import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClickedFood } from "../features/products/food/foodSlice";
import { useParams } from "react-router-dom";
import GoToAdminPageButton from "../components/GoToAdminPageButton";
import GoToHomePageButton from "../components/GoToHomePageButton";
import "/src/productDetail.css";
import AddToCartButton from "../components/AddToCartButton";

const FoodDetail = () => {
  const dispatch = useDispatch();
  const food = useSelector((state) => state.foods.clickedFood);
  const isLoading = useSelector((state) => state.foods.isLoading);
  const error = useSelector((state) => state.foods.error);
  const { foodId } = useParams();

  useEffect(() => {
    dispatch(getClickedFood(foodId));
  }, [foodId, dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching food please refresh the page</p>;
  }

  if (!food || !food.price) {
    return <p>Food not found or missing data</p>;
  }

  return (
    <>
      <div className="product-detail-container vh-100 d-flex">
        <section className="product container col-xl-8 col-lg-9 col-md-10 shadow-lg my-5">
          <div className="product__photo">
            <div className="photo-container">
              <div className="photo-main d-flex justify-content-center align-items-center rounded">
                <img
                  src={food.imageUrl}
                  alt={`${food.name} image`}
                  className="rounded-circle h-75"
                />
              </div>
            </div>
          </div>
          <div className="product__info">
            <div className="title">
              <h1>{food.name}</h1>
              <span>COD: {food.id}</span>
            </div>
            <div className="price">
              € <span>{food.price.toFixed(2)}</span>
            </div>
            <div className="rating">Stars: {food.rating}</div>
            <div className="description pe-3">
              <h3>Description</h3>
              <p>{food.description}</p>
            </div>
            <AddToCartButton product={food} />
          </div>
          <div className="navigate-btns d-flex gap-5 mt-4">
            <GoToAdminPageButton />
            <GoToHomePageButton />
          </div>
        </section>
      </div>
    </>
  );
};

export default FoodDetail;
