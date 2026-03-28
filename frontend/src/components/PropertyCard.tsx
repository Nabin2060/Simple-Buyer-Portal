import type { Property } from '../types';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Location01Icon } from '@hugeicons/core-free-icons';


interface Props {
  property: Property;
  isFavourite: boolean;
  onToggleFavourite: (id: string, isFav: boolean) => void;
  isLoading: boolean;
}

export function PropertyCard({ property, isFavourite, onToggleFavourite, isLoading }: Props) {
  return (
    <Link 
      to={`/property/${property.id}`}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
    >
      <div className="relative h-56 w-full overflow-hidden">
        {property.imageUrl ? (
          <img 
            src={property.imageUrl} 
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavourite(property.id, isFavourite);
          }}
          disabled={isLoading}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm shadow-sm transition-transform active:scale-95 disabled:opacity-50 ${
            isFavourite ? 'bg-red-50/90 text-red-500' : 'bg-white/90 text-gray-400 hover:text-gray-600'
          }`}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={isFavourite ? "currentColor" : "none"} 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors">{property.title}</h3>
        <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed flex-grow">
          {property.description}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center gap-3">
          <span className="text-lg font-extrabold text-blue-600 truncate max-w-[60%]" title={`NPR ${property.price.toLocaleString()}`}>
            NPR {property.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-full flex items-center gap-1 font-medium border border-gray-100 truncate max-w-[40%]" title={property.location.split(',')[0]}>
            <HugeiconsIcon icon={Location01Icon} size={14} className="text-gray-400 flex-shrink-0" />
            <span className="truncate">{property.location.split(',')[0]}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
