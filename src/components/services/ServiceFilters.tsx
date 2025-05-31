import React, { useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCategories,
  selectCategories,
  selectFilters,
  setFilter,
  resetFilters,
} from '../../store/slices/servicesSlice';
import Button from '../ui/Button';

const ServiceFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const filters = useAppSelector(selectFilters);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ searchTerm: e.target.value }));
  };
  
  const handleCategoryChange = (categoryId: string | null) => {
    dispatch(setFilter({ category: categoryId }));
  };
  
  const handlePriceRangeChange = (min: number, max: number) => {
    dispatch(setFilter({ priceRange: { min, max } }));
  };
  
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };
  
  const hasActiveFilters =
    filters.searchTerm !== '' ||
    filters.category !== null ||
    filters.priceRange.min !== 0 ||
    filters.priceRange.max !== 50000;
  
  return (
    <div className="card p-4 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Поиск услуг</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Введите название услуги..."
            className="input pl-10"
            value={filters.searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Категории</h3>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              filters.category === null
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
            }`}
            onClick={() => handleCategoryChange(null)}
          >
            Все
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.category === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Стоимость</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="min-price" className="block text-sm text-neutral-600 mb-1">
              От
            </label>
            <input
              id="min-price"
              type="number"
              min="0"
              step="100"
              className="input"
              value={filters.priceRange.min}
              onChange={(e) =>
                handlePriceRangeChange(Number(e.target.value), filters.priceRange.max)
              }
            />
          </div>
          <div>
            <label htmlFor="max-price" className="block text-sm text-neutral-600 mb-1">
              До
            </label>
            <input
              id="max-price"
              type="number"
              min="0"
              step="100"
              className="input"
              value={filters.priceRange.max}
              onChange={(e) =>
                handlePriceRangeChange(filters.priceRange.min, Number(e.target.value))
              }
            />
          </div>
        </div>
      </div>
      
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          icon={<X className="h-4 w-4" />}
          onClick={handleResetFilters}
          className="w-full"
        >
          Сбросить фильтры
        </Button>
      )}
    </div>
  );
};

export default ServiceFilters;