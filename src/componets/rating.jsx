import React, { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

const StarRating = ({ onChange, value }) => {
  const [rating, setRating] = useState(value || 0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onChange(selectedRating);
  };

  return (
    <div className="flex gap-2 py-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className="cursor-pointer"
          onClick={() => handleStarClick(star)}
        >
          {star <= rating ? (
            <BsStarFill className=" text-xl" />
          ) : (
            <BsStar className=" text-xl" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
