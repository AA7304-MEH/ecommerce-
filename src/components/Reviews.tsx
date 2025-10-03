'use client';

import { useState } from 'react';
import { Star, ThumbsUp, User, Verified } from 'lucide-react';
import Image from 'next/image';

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface ReviewsProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
}

const sampleReviews: Review[] = [
  {
    id: '1',
    userName: 'Sarah M.',
    rating: 5,
    title: 'Amazing product, exceeded expectations!',
    content: 'This gadget is exactly what I was looking for. The build quality is excellent, and it works perfectly with my devices. Highly recommend!',
    date: '2024-12-15',
    verified: true,
    helpful: 12,
    images: []
  },
  {
    id: '2',
    userName: 'Mike Chen',
    rating: 4,
    title: 'Good value for money',
    content: 'Works as advertised. The shipping was fast and the packaging was secure. Only minor issue is that the instructions could be clearer.',
    date: '2024-12-10',
    verified: true,
    helpful: 8,
    images: []
  },
  {
    id: '3',
    userName: 'Jennifer K.',
    rating: 5,
    title: 'Perfect for my setup',
    content: 'Love this! It fits perfectly with my existing tech setup. The LED indicators are helpful and the build quality feels premium.',
    date: '2024-12-08',
    verified: true,
    helpful: 15,
    images: []
  },
  {
    id: '4',
    userName: 'Alex R.',
    rating: 3,
    title: 'Decent but could be better',
    content: 'It does what it says, but I expected a bit more for the price. The design is nice but functionality is just okay.',
    date: '2024-12-05',
    verified: false,
    helpful: 3,
    images: []
  }
];

const Reviews = ({ productId, averageRating, totalReviews }: ReviewsProps) => {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating-high' | 'rating-low' | 'helpful'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    sampleReviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const filteredAndSortedReviews = sampleReviews
    .filter(review => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default: // newest
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const distribution = getRatingDistribution();
  const totalDistribution = Object.values(distribution).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating}</div>
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <div className="text-gray-600">{totalReviews} reviews</div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = distribution[rating as keyof typeof distribution];
              const percentage = totalDistribution > 0 ? (count / totalDistribution) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center gap-3">
                  <button
                    onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                    className={`flex items-center gap-1 text-sm ${
                      filterRating === rating ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
                    }`}
                  >
                    <span>{rating}</span>
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating-high">Highest Rating</option>
              <option value="rating-low">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
          
          {filterRating && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Showing {filterRating}-star reviews</span>
              <button
                onClick={() => setFilterRating(null)}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

        <button className="btn-primary">Write a Review</button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredAndSortedReviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No reviews match your current filter.</p>
            <button
              onClick={() => setFilterRating(null)}
              className="text-primary-600 hover:text-primary-700 text-sm mt-2"
            >
              View all reviews
            </button>
          </div>
        ) : (
          filteredAndSortedReviews.map(review => (
            <div key={review.id} className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                    {review.verified && (
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        <Verified className="w-3 h-3" />
                        <span>Verified Purchase</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                  <p className="text-gray-700 mb-4">{review.content}</p>
                  
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.map((image, index) => (
                        <div key={index} className="relative w-16 h-16 rounded-md overflow-hidden">
                          <Image
                            src={image}
                            alt={`Review image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="text-sm text-gray-600 hover:text-primary-600">
                      Reply
                    </button>
                    <button className="text-sm text-gray-600 hover:text-primary-600">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredAndSortedReviews.length > 0 && (
        <div className="text-center">
          <button className="btn-secondary">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;