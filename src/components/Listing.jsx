import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const Listing = ({ food, index, user, userList }) => {

  function deleteListing() {
    // console.log("Delete functionality to be added")
    // Axios({
    //   method: "DELETE",
    //   data: {
    //     food: food._id,
    //   },
    //   withCredentials: true,
    //   url: `${process.env.REACT_APP_URL_BASE_BACKEND}/favorite/check`
    // }).then((res) => {
    //   // truth = res.data;
    // }).catch((err) => {
    //   // console.log(err);
    // })

  }

  return (
    <div className="food-card">
      <ul className="food-ul">
        <img className="food-card-img" src={food.category === "Vegetable" ? "carrot-solid.svg" : (food.category === "Fruit" ? "apple-alt-solid.svg" : "egg-solid.svg")} alt={food.name} />
        <div className="food-cart-bottom-container">

          <div className="food-card-text-container">
            <div className="food-card-left">
              <li className="list-food-name">{food.name}</li>
              <li className="list-food-units">{food.units}</li>
              <li className="list-food-rating">
                <FontAwesomeIcon icon={farStar} className="font-awesome-icon star" />
                <span> </span>
                {food.rating.toFixed(1)}
              </li>
            </div>

            <div className="food-card-right">
              <li className="list-food-price">${food.price.toFixed(2)}</li>
              <li className="list-food-available">{(food.quantity > 0) ? (food.quantity + " available") : "Sold out"}</li>
              <li className="list-food-breed"> <span>&nbsp;</span> </li>
            </div>
          </div>
          <div className="update-delete-wrapper">
            <a className="update-text" href={"/listing/" + food._id + "/update/"}>UPDATE</a>
            <div className="delete-text" onClick={() => deleteListing()}>DELETE</div>
          </div>
        </div>
      </ul>
    </div>
  )
}

export default Listing;
