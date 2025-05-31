import { configureStore, AnyAction } from '@reduxjs/toolkit';
import servicesReducer, {
  fetchServices,
  fetchCategories,
  fetchServiceById,
  setFilter,
  resetFilters,
  clearSelectedService,
} from '../servicesSlice';
import { servicesApi } from '../../../api/servicesApi';
import { Service, ServiceCategory } from '../../../types/services';
import { ThunkDispatch } from 'redux-thunk';

// Mock the servicesApi
jest.mock('../../../api/servicesApi');

interface TestStore {
  services: ReturnType<typeof servicesReducer>;
}

type AppDispatch = ThunkDispatch<TestStore, unknown, AnyAction>;
type GetState = () => TestStore;

const createTestStore = () => {
  const store = configureStore({
    reducer: {
      services: servicesReducer,
    },
  });

  return {
    ...store,
    dispatch: store.dispatch as AppDispatch,
    getState: store.getState as GetState,
  };
};

describe('servicesSlice', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockService: Service = {
    id: '1',
    name: 'Test Service',
    description: 'Test Description',
    price: 1000,
    duration: 60,
    categoryId: '1',
    category: 'Test Category',
    image: 'test.jpg',
  };

  const mockCategory: ServiceCategory = {
    id: '1',
    name: 'Test Category',
    description: 'Test Category Description',
    icon: 'test-icon',
  };

  describe('fetchServices', () => {
    const filters = {
      category: null,
      searchTerm: '',
      priceRange: { min: 0, max: 50000 },
    };

    it('should handle pending state', () => {
      store.dispatch(fetchServices.pending('', filters));
      const state = store.getState().services;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle successful fetch', () => {
      store.dispatch(fetchServices.fulfilled([mockService], '', filters));
      const state = store.getState().services;
      expect(state.loading).toBe(false);
      expect(state.services).toEqual([mockService]);
      expect(state.error).toBeNull();
    });

    it('should handle fetch error', () => {
      const errorMessage = 'Failed to fetch services';
      store.dispatch(fetchServices.rejected(null, '', filters, errorMessage));
      const state = store.getState().services;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    it('should fetch services from API', async () => {
      const mockServices = [mockService];
      (servicesApi.getServices as jest.Mock).mockResolvedValue(mockServices);

      await store.dispatch(fetchServices(filters));
      const state = store.getState().services;
      
      expect(servicesApi.getServices).toHaveBeenCalledWith(filters);
      expect(state.services).toEqual(mockServices);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('fetchCategories', () => {
    it('should handle pending state', () => {
      store.dispatch(fetchCategories.pending('', undefined));
      const state = store.getState().services;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle successful fetch', () => {
      store.dispatch(fetchCategories.fulfilled([mockCategory], '', undefined));
      const state = store.getState().services;
      expect(state.loading).toBe(false);
      expect(state.categories).toEqual([mockCategory]);
      expect(state.error).toBeNull();
    });

    it('should handle fetch error', () => {
      const errorMessage = 'Failed to fetch categories';
      store.dispatch(fetchCategories.rejected(null, '', undefined, errorMessage));
      const state = store.getState().services;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    it('should fetch categories from API', async () => {
      const mockCategories = [mockCategory];
      (servicesApi.getCategories as jest.Mock).mockResolvedValue(mockCategories);

      await store.dispatch(fetchCategories());
      const state = store.getState().services;
      
      expect(servicesApi.getCategories).toHaveBeenCalled();
      expect(state.categories).toEqual(mockCategories);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('fetchServiceById', () => {
    it('should handle pending state', () => {
      store.dispatch(fetchServiceById.pending('', '1'));
      const state = store.getState().services;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle successful fetch', () => {
      store.dispatch(fetchServiceById.fulfilled(mockService, '', '1'));
      const state = store.getState().services;
      expect(state.loading).toBe(false);
      expect(state.selectedService).toEqual(mockService);
      expect(state.error).toBeNull();
    });

    it('should handle fetch error', () => {
      const errorMessage = 'Service not found';
      store.dispatch(fetchServiceById.rejected(null, '', '1', errorMessage));
      const state = store.getState().services;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.selectedService).toBeNull();
    });

    it('should fetch service by id from API', async () => {
      (servicesApi.getServiceById as jest.Mock).mockResolvedValue(mockService);

      await store.dispatch(fetchServiceById('1'));
      const state = store.getState().services;
      
      expect(servicesApi.getServiceById).toHaveBeenCalledWith('1');
      expect(state.selectedService).toEqual(mockService);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('filter actions', () => {
    it('should set filter', () => {
      const newFilter = { category: 'Test Category' };
      store.dispatch(setFilter(newFilter));
      const state = store.getState().services;
      expect(state.filters.category).toBe('Test Category');
    });

    it('should reset filters to initial state', () => {
      // First set some filters
      store.dispatch(setFilter({ category: 'Test Category', searchTerm: 'test' }));
      
      // Then reset
      store.dispatch(resetFilters());
      const state = store.getState().services;
      expect(state.filters).toEqual({
        category: null,
        searchTerm: '',
        priceRange: { min: 0, max: 50000 },
      });
    });

    it('should clear selected service', () => {
      // First set a selected service
      store.dispatch(fetchServiceById.fulfilled(mockService, '', '1'));
      expect(store.getState().services.selectedService).toEqual(mockService);

      // Then clear it
      store.dispatch(clearSelectedService());
      expect(store.getState().services.selectedService).toBeNull();
    });
  });
}); 