import { configureStore } from '@reduxjs/toolkit';
import uiReducer, {
  toggleMobileMenu,
  closeMobileMenu,
  addNotification,
  removeNotification,
  setLoading,
  resetNotificationCounter,
} from '../uiSlice';

describe('uiSlice', () => {
  const createTestStore = () => {
    return configureStore({
      reducer: {
        ui: uiReducer,
      },
    });
  };

  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    resetNotificationCounter();
  });

  describe('mobile menu actions', () => {
    it('should toggle mobile menu', () => {
      // Initially closed
      expect(store.getState().ui.mobileMenuOpen).toBe(false);

      // Toggle to open
      store.dispatch(toggleMobileMenu());
      expect(store.getState().ui.mobileMenuOpen).toBe(true);

      // Toggle to close
      store.dispatch(toggleMobileMenu());
      expect(store.getState().ui.mobileMenuOpen).toBe(false);
    });

    it('should close mobile menu', () => {
      // First open the menu
      store.dispatch(toggleMobileMenu());
      expect(store.getState().ui.mobileMenuOpen).toBe(true);

      // Then close it
      store.dispatch(closeMobileMenu());
      expect(store.getState().ui.mobileMenuOpen).toBe(false);

      // Should remain closed when called again
      store.dispatch(closeMobileMenu());
      expect(store.getState().ui.mobileMenuOpen).toBe(false);
    });
  });

  describe('notification actions', () => {
    const testNotification = {
      type: 'success' as const,
      message: 'Test notification',
    };

    it('should add notification', () => {
      store.dispatch(addNotification(testNotification));
      const state = store.getState().ui;

      expect(state.notifications).toHaveLength(1);
      expect(state.notifications[0]).toEqual({
        id: '0',
        ...testNotification,
      });
    });

    it('should add multiple notifications with unique ids', () => {
      store.dispatch(addNotification(testNotification));
      store.dispatch(addNotification(testNotification));
      const state = store.getState().ui;

      expect(state.notifications).toHaveLength(2);
      expect(state.notifications[0].id).toBe('0');
      expect(state.notifications[1].id).toBe('1');
    });

    it('should remove notification by id', () => {
      // Add two notifications
      store.dispatch(addNotification(testNotification));
      store.dispatch(addNotification(testNotification));
      expect(store.getState().ui.notifications).toHaveLength(2);

      // Remove first notification
      store.dispatch(removeNotification('0'));
      const state = store.getState().ui;

      expect(state.notifications).toHaveLength(1);
      expect(state.notifications[0].id).toBe('1');
    });

    it('should handle different notification types', () => {
      const notifications = [
        { type: 'success' as const, message: 'Success message' },
        { type: 'error' as const, message: 'Error message' },
        { type: 'info' as const, message: 'Info message' },
        { type: 'warning' as const, message: 'Warning message' },
      ];

      notifications.forEach(notification => {
        store.dispatch(addNotification(notification));
      });

      const state = store.getState().ui;
      expect(state.notifications).toHaveLength(4);
      
      state.notifications.forEach((notification, index) => {
        expect(notification.type).toBe(notifications[index].type);
        expect(notification.message).toBe(notifications[index].message);
      });
    });
  });

  describe('loading state', () => {
    it('should set loading state', () => {
      // Initially not loading
      expect(store.getState().ui.isLoading).toBe(false);

      // Set to loading
      store.dispatch(setLoading(true));
      expect(store.getState().ui.isLoading).toBe(true);

      // Set back to not loading
      store.dispatch(setLoading(false));
      expect(store.getState().ui.isLoading).toBe(false);
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().ui;
      expect(state).toEqual({
        mobileMenuOpen: false,
        notifications: [],
        isLoading: false,
      });
    });
  });
}); 