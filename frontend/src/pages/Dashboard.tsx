import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { propertyService } from '../services/propertyService';
import { favouriteService } from '../services/favouriteService';
import type { Property } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { FRONTEND_MESSAGES } from '../utils/messages.constants';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function Dashboard() {
  const { user, logout } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [favourites, setFavourites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter state
  const [showOnlyFavourites, setShowOnlyFavourites] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page]); // Re-fetch when page changes

  const fetchData = async () => {
    setLoading(true);
    try {
      const [propsRes, favsRes] = await Promise.all([
        propertyService.getAll(page),
        favouriteService.getFavourites()
      ]);
      
      setProperties(propsRes.data.items);
      setTotalPages(propsRes.data.meta.totalPages);
      setFavourites(new Set(favsRes.data.map(p => p.id)));
    } catch (err: any) {
      // Error handled by global interceptor
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavourite = async (propertyId: string, isCurrentlyFav: boolean) => {
    setActionLoading(propertyId);
    try {
      if (isCurrentlyFav) {
        await favouriteService.removeFavourite(propertyId);
        setFavourites(prev => {
          const next = new Set(prev);
          next.delete(propertyId);
          return next;
        });
      } else {
        await favouriteService.addFavourite(propertyId);
        setFavourites(prev => new Set(prev).add(propertyId));
      }
    } catch (err) {
      // Error handled by global interceptor
    } finally {
      setActionLoading(null);
    }
  };

  const displayedProperties = showOnlyFavourites 
    ? properties.filter(p => favourites.has(p.id)) 
    : properties;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl">🏡</span>
              <span className="font-bold text-xl text-gray-900 tracking-tight">BuyerPortal</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-right hidden sm:block">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-gray-500 text-xs">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Property Listings</h1>
            <p className="text-gray-500 mt-1">Find your next dream home.</p>
          </div>
          <div className="bg-white rounded-lg p-1 border shadow-sm flex inline-flex">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${!showOnlyFavourites ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setShowOnlyFavourites(false); setPage(1); }}
            >
              All Properties
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${showOnlyFavourites ? 'bg-red-50 text-red-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setShowOnlyFavourites(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              My Favourites ({favourites.size})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : displayedProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavourite={favourites.has(property.id)}
                  onToggleFavourite={handleToggleFavourite}
                  isLoading={actionLoading === property.id}
                />
              ))}
            </div>
            
            {!showOnlyFavourites && totalPages > 1 && (
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setPage(p => Math.max(1, p - 1))} 
                        className={`cursor-pointer ${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          onClick={() => setPage(i + 1)} 
                          isActive={page === i + 1}
                          className="cursor-pointer"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                        className={`cursor-pointer ${page === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">{FRONTEND_MESSAGES.INFO.NO_PROPERTIES}</h3>
            <p className="mt-1 text-gray-500">
              {showOnlyFavourites ? FRONTEND_MESSAGES.INFO.NO_FAVOURITES : "Check back later for new listings."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
