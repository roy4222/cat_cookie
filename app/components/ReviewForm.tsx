'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addDocument } from '../firebase/firestore';

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('請先登入後再評論');
      return;
    }

    if (!comment.trim()) {
      setError('請輸入評論內容');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      const reviewData = {
        productId,
        userId: user.uid,
        userName: user.displayName || '匿名用戶',
        rating,
        comment,
        createdAt: new Date().toISOString()
      };
      
      await addDocument('reviews', reviewData);
      
      // 重置表單
      setRating(5);
      setComment('');
      
      // 通知父組件評論已提交
      onReviewSubmitted();
    } catch (error) {
      console.error('提交評論失敗：', error);
      setError('提交評論失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">撰寫評論</h3>
      
      {!user ? (
        <p className="text-primary-dark mb-4">請先登入後再評論</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">評分</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none"
                >
                  {star <= rating ? (
                    <span className="text-secondary-dark">★</span>
                  ) : (
                    <span className="text-gray-300">★</span>
                  )}
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating} 顆星
              </span>
            </div>
          </div>
          
          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              評論內容
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="分享您對產品的看法..."
            />
          </div>
          
          {error && (
            <p className="text-error text-sm">{error}</p>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary py-2 px-4 rounded-lg"
          >
            {isSubmitting ? '提交中...' : '提交評論'}
          </button>
        </form>
      )}
    </div>
  );
} 