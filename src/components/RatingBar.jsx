function RatingBar({ rate }) {
  const totalStars = 10;
  const filledStars = Math.min(Math.max(0, rate), totalStars); // Ensure rate is between 0 and 10

  return (
    <div className="rating-bar">
      {[...Array(totalStars)].map((_, index) => (
        <span key={index} className="star">
          {index < filledStars ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default RatingBar;