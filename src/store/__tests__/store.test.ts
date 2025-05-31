import { store } from '../index';
import { login } from '../slices/authSlice';
import { fetchServices } from '../slices/servicesSlice';
import { fetchUserAppointments } from '../slices/appointmentsSlice';
import { addNotification, setLoading } from '../slices/uiSlice';
import { authApi } from '../../api/authApi';
import { servicesApi } from '../../api/servicesApi';
import { appointmentsApi } from '../../api/appointmentsApi';

// Mock APIs
jest.mock('../../api/authApi');
jest.mock('../../api/servicesApi');
jest.mock('../../api/appointmentsApi');

describe('Redux Store', () => {
  beforeEach(() => {
    // Очищаем все моки перед каждым тестом
    jest.clearAllMocks();
  });

  describe('Store Configuration', () => {
    it('should have all required reducers', () => {
      const state = store.getState();
      
      expect(state).toHaveProperty('auth');
      expect(state).toHaveProperty('services');
      expect(state).toHaveProperty('appointments');
      expect(state).toHaveProperty('ui');
    });

    it('should have correct initial state', () => {
      const state = store.getState();
      
      // Auth initial state
      expect(state.auth).toEqual({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });

      // Services initial state
      expect(state.services).toEqual({
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
      });

      // Appointments initial state
      expect(state.appointments).toEqual({
        appointments: [],
        availableSlots: [],
        loading: false,
        error: null,
      });

      // UI initial state
      expect(state.ui).toEqual({
        mobileMenuOpen: false,
        notifications: [],
        isLoading: false,
      });
    });
  });

  describe('Cross-Slice Interactions', () => {
    it('should handle auth and ui states during login', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      };

      (authApi.login as jest.Mock).mockResolvedValue({
        user: mockUser,
        token: 'mock-token',
      });

      const loginAction = store.dispatch(login({
        email: 'test@example.com',
        password: 'password123',
      }));

      // Проверяем состояние во время загрузки
      expect(store.getState().auth.loading).toBe(true);
      expect(store.getState().auth.error).toBeNull();

      await loginAction;

      // Проверяем состояние после успешного входа
      expect(store.getState().auth.user).toEqual(mockUser);
      expect(store.getState().auth.isAuthenticated).toBe(true);
      expect(store.getState().auth.loading).toBe(false);
    });

    it('should handle services and ui states during services fetch', async () => {
      const mockServices = [
        { id: '1', name: 'Service 1', price: 1000 },
        { id: '2', name: 'Service 2', price: 2000 },
      ];

      (servicesApi.getServices as jest.Mock).mockResolvedValue(mockServices);

      const fetchAction = store.dispatch(fetchServices({
        category: null,
        searchTerm: '',
        priceRange: { min: 0, max: 50000 },
      }));

      // Проверяем состояние во время загрузки
      expect(store.getState().services.loading).toBe(true);
      expect(store.getState().services.error).toBeNull();

      await fetchAction;

      // Проверяем состояние после успешной загрузки
      expect(store.getState().services.services).toEqual(mockServices);
      expect(store.getState().services.loading).toBe(false);
    });

    it('should handle appointments and ui states during appointments fetch', async () => {
      const mockAppointments = [
        { id: '1', serviceName: 'Service 1', date: '2024-03-20' },
        { id: '2', serviceName: 'Service 2', date: '2024-03-21' },
      ];

      (appointmentsApi.getUserAppointments as jest.Mock).mockResolvedValue(mockAppointments);

      const fetchAction = store.dispatch(fetchUserAppointments());

      // Проверяем состояние во время загрузки
      expect(store.getState().appointments.loading).toBe(true);
      expect(store.getState().appointments.error).toBeNull();

      await fetchAction;

      // Проверяем состояние после успешной загрузки
      expect(store.getState().appointments.appointments).toEqual(mockAppointments);
      expect(store.getState().appointments.loading).toBe(false);
    });
  });

  describe('Middleware', () => {
    it('should allow non-serializable values in ignored actions', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        // Добавляем не сериализуемое значение
        createdAt: new Date(),
      };

      (authApi.login as jest.Mock).mockResolvedValue({
        user: mockUser,
        token: 'mock-token',
      });

      // Это должно работать без ошибок благодаря настройке middleware
      await store.dispatch(login({
        email: 'test@example.com',
        password: 'password123',
      }));

      expect(store.getState().auth.isAuthenticated).toBe(true);
    });
  });

  describe('UI Interactions', () => {
    it('should handle global loading state', () => {
      store.dispatch(setLoading(true));
      expect(store.getState().ui.isLoading).toBe(true);

      store.dispatch(setLoading(false));
      expect(store.getState().ui.isLoading).toBe(false);
    });

    it('should handle notifications across different actions', async () => {
      // Добавляем уведомление напрямую
      store.dispatch(addNotification({
        type: 'info',
        message: 'Test notification',
      }));

      // Проверяем, что уведомление добавлено
      expect(store.getState().ui.notifications).toHaveLength(1);
      expect(store.getState().ui.notifications[0].message).toBe('Test notification');

      // Симулируем ошибку при загрузке услуг
      (servicesApi.getServices as jest.Mock).mockRejectedValue(new Error('API Error'));

      await store.dispatch(fetchServices({
        category: null,
        searchTerm: '',
        priceRange: { min: 0, max: 50000 },
      }));

      // Проверяем состояние ошибки
      expect(store.getState().services.error).toBeTruthy();
    });
  });
}); 