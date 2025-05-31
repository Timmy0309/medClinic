import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { servicesApi } from '../../api/servicesApi';
import type { RootState } from '../index';
import { Service, ServiceCategory, ServiceFilters } from '../../types/services';

interface ServicesState {
  services: Service[];
  categories: ServiceCategory[];
  selectedService: Service | null;
  filters: ServiceFilters;
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  categories: [],
  selectedService: null,
  filters: {
    category: null,
    searchTerm: '',
    priceRange: { min: 0, max: 50000 },
  },
  loading: false,
  error: null,
};

// Асинхронный thunk для получения всех услуг
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (filters: ServiceFilters, { rejectWithValue }) => {
    try {
      const response = await servicesApi.getServices(filters);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке услуг');
    }
  }
);

// Асинхронный thunk для получения категорий услуг
export const fetchCategories = createAsyncThunk(
  'services/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await servicesApi.getCategories();
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке категорий');
    }
  }
);

// Асинхронный thunk для получения детальной информации об услуге
export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await servicesApi.getServiceById(id);
      return response;
    } catch (error) {
      return rejectWithValue('Услуга не найдена');
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<ServiceFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearSelectedService: (state) => {
      state.selectedService = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка fetchServices
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Обработка fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Обработка fetchServiceById
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.selectedService = null;
      });
  },
});

export const { setFilter, resetFilters, clearSelectedService } = servicesSlice.actions;

// Селекторы
export const selectServices = (state: RootState) => state.services.services;
export const selectCategories = (state: RootState) => state.services.categories;
export const selectSelectedService = (state: RootState) => state.services.selectedService;
export const selectFilters = (state: RootState) => state.services.filters;
export const selectServicesLoading = (state: RootState) => state.services.loading;
export const selectServicesError = (state: RootState) => state.services.error;

export default servicesSlice.reducer;