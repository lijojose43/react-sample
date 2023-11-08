import React from "react";
import StarRatings from "react-star-ratings";

const StarRatingView = ({ rating }) => {
  return (
    <div className="star-rating">
      <StarRatings
        rating={rating}
        starRatedColor="yellow" // Set the color of the filled stars
        numberOfStars={5} // Number of stars
        name="rating"
        starDimension="15px" // Set the size of the stars
        starSpacing="2px" // Set the spacing between stars
      />
    </div>
  );
};

export default StarRatingView;
