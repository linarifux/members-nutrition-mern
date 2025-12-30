import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* 404 Big Text */}
      <div className="relative mb-8">
        <h1 className="text-[150px] md:text-[200px] font-black text-gray-100 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-orange-100 text-orange-600 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-sm border border-orange-200">
            Page Not Found
          </span>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Something's missing here.
      </h2>
      
      <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
        We can't seem to find the page you're looking for. It might have been removed, renamed, or temporarily unavailable.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1"
        >
          <Home size={20} />
          Back to Home
        </Link>
        
        <button 
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 bg-white text-gray-600 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;