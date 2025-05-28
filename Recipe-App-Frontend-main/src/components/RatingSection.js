import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';

/**
 * Represents a section displaying ratings and reviews.
 * @param {Object} props - The component props.
 * @param {Array} props.comments - An array of comments/reviews.
 * @returns {JSX.Element} The RatingSection component.
 */
const RatingSection = ({ comments }) => {
  const [average, setAverage] = useState(0);

  useEffect(() => {
    handleAverage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  /**
   * Calculates the average rating from the comments.
   */
  const handleAverage = () => {
    if (comments.length <= 0) return 0;

    let sum = 0;
    comments.forEach((comment) => {
      sum += comment.rating;
    });
    setAverage(sum / comments.length);
  };

  return (
    <div>
      {comments.length > 0 ? (
        <section>
          <ol className='flex'>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <li key={index}>
                <FaStar className={Math.floor(average) >= star ? 'text-yellow-500' : 'text-gray-300'} />
              </li>
            ))}
          </ol>
          <p>{comments.length} Reviews | {average.toFixed(1)} Average</p>
        </section>
      ) : (
        <section>
          <p>No Reviews.</p>
        </section>
      )}
      <section></section>
    </div>
  );
};

export default RatingSection;
