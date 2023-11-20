import React from "react";
import StarRatings from "react-star-ratings";

const StarRatingView = ({ rating }) => {
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  return (
    <div className="star-rating">
      <StarRatings
        rating={rating}
        starRatedColor="#ffa921" // Set the color of the filled stars
        numberOfStars={5} // Number of stars
        name="rating"
        starDimension="15px" // Set the size of the stars
        starSpacing="2px" // Set the spacing between stars
      />
      <small
        style={{ fontSize: "11px" }}
      >{`(${generateRandomNumber()})`}</small>
    </div>
  );
};

export default StarRatingView;
