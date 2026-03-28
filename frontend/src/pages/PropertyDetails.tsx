import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import { favouriteService } from '../services/favouriteService';
import type { Property } from '../types';
import { HugeiconsIcon } from '@hugeicons/react';
import { Location01Icon } from '@hugeicons/core-free-icons';
import { toast } from 'sonner';

export function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [togglingFav, setTogglingFav] = useState(false);

  useEffect(() => {
    async function loadPropertyAndFavourites() {
      try {
        if (!id) return;
        
        // Fetch property details
        const res = await propertyService.getById(id);
        setProperty(res.data);

        // Fetch user's favourites to determine if this one is favourited
        const favRes = await favouriteService.getFavourites();
        setIsFavourite(favRes.data.some((f: Property) => f.id === id));
      } catch (err: any) {
        toast.error('Failed to load property details');
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
    loadPropertyAndFavourites();
  }, [id, navigate]);

  const handleToggleFavourite = async () => {
    if (!property) return;
    setTogglingFav(true);
    try {
      if (isFavourite) {
        await favouriteService.removeFavourite(property.id);
        toast.success('Removed from favourites');
      } else {
        await favouriteService.addFavourite(property.id);
        toast.success('Added to favourites');
      }
      setIsFavourite(!isFavourite);
    } catch (error) {
      toast.error('Failed to update favourites');
    } finally {
      setTogglingFav(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">Property not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')} 
          className="mb-6 flex items-center text-gray-500 hover:text-blue-600 transition-colors font-medium cursor-pointer"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative h-96 w-full">
            {property.imageUrl ? (
              <img 
                src={property.imageUrl} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-lg">No image available</span>
              </div>
            )}
            <button
              onClick={handleToggleFavourite}
              disabled={togglingFav}
              className={`absolute top-6 right-6 p-3.5 rounded-full backdrop-blur-md shadow-lg transition-transform active:scale-95 disabled:opacity-50 ${
                isFavourite ? 'bg-red-50/95 text-red-500' : 'bg-white/95 text-gray-400 hover:text-gray-600'
              }`}
              title={isFavourite ? "Remove from favourites" : "Add to favourites"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={isFavourite ? "currentColor" : "none"} 
                stroke="currentColor" 
                className="w-7 h-7"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full inline-flex font-medium border border-gray-100">
                  <HugeiconsIcon icon={Location01Icon} size={20} className="text-blue-500" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-gray-500 font-medium mb-1">Asking Price</p>
                <p className="text-3xl font-extrabold text-blue-600">
                  NPR {property.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
