import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((index) => (
          <span key={index}>
            {value >= index ? (
              <Star size={16} fill="currentColor" />
            ) : value >= index - 0.5 ? (
              <StarHalf size={16} fill="currentColor" />
            ) : (
              <Star size={16} className="text-gray-300" />
            )}
          </span>
        ))}
      </div>
      <span className="text-sm text-gray-500 font-medium">{text && text}</span>
    </div>
  );
};

export default Rating;