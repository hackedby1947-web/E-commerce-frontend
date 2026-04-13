

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, CheckCircle2, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api";
export default function ProductReviews() {
  const { id } = useParams();

  const [reviews, setReviews] = useState([]);
  const [selectedImages, setSelectedImages] = useState(null);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/api/products")
      .then(res => {
        const product = res.data.find(p => p._id === id);
        if (product) {
          setReviews(product.reviews || []);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  // ✅ Pagination logic
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
         <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 text-gray-600 hover:text-black transition"
  >
    <ArrowLeft size={20} />
    <span className="font-medium">Back</span>
  </button>
       <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
  {/* Header */}


  {/* Total Reviews Badge */}
  <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full shadow-sm transition-all hover:bg-indigo-100">
    Total Reviews ({reviews.length})
  </span>
</div>
      </div>

      <div className="grid gap-6">
        {currentReviews.length > 0 ? (
          currentReviews.map((review, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 text-white font-bold">
                    {review.user?.name
                      ? review.user.name[0].toUpperCase()
                      : "U"}
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800">
                      {review.user?.name || "Verified Buyer"}
                    </h4>

                    <p className="text-[11px] font-bold text-green-600 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Verified Purchase
                    </p>

                    <span className="text-[11px] text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      fill={index < review.rating ? "#FBBF24" : "none"}
                      className={index < review.rating ? "text-yellow-400" : "text-gray-200"}
                    />
                  ))}
                  <span className="ml-2 text-sm font-bold">
                    {review.rating}
                  </span>
                </div>
              </div>

              {/* Comment */}
                {/* <p className="text-gray-800  text-sm font-medium px-14">{review.comment}</p> */}
<p className="text-gray-700 text-sm leading-relaxed mt-2 pl-14 pr-4 md:px-14">
  {review.comment}
</p>

              {/* Images */}
              {review.images?.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {review.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="review"
                      className="w-20 h-20 object-cover rounded-xl cursor-pointer"
                      onClick={() => setSelectedImages(img)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            No reviews yet
          </p>
        )}
      </div>

      {/* ✅ Pagination UI */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Image Modal */}
      {selectedImages && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center"
          onClick={() => setSelectedImages(null)}
        >
          <button className="absolute top-6 right-6 text-white">
            <X />
          </button>
          <img
            src={selectedImages}
            className="max-h-[80vh] rounded-xl"
          />
        </div>
      )}
    </div>
  );
}