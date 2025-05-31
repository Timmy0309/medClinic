import { configureStore, AnyAction } from '@reduxjs/toolkit';
import appointmentsReducer, {
  fetchUserAppointments,
  createAppointment,
  cancelAppointment,
  fetchAvailableSlots,
  clearAppointmentsError,
  AppointmentsState,
} from '../appointmentsSlice';
import { appointmentsApi } from '../../../api/appointmentsApi';
import { Appointment, NewAppointment } from '../../../types/appointments';
import { ThunkDispatch } from 'redux-thunk';

// Mock the appointmentsApi
jest.mock('../../../api/appointmentsApi');

interface TestStore {
  appointments: AppointmentsState;
}

type AppDispatch = ThunkDispatch<TestStore, unknown, AnyAction>;
type GetState = () => TestStore;

const createTestStore = () => {
  const store = configureStore({
    reducer: {
      appointments: appointmentsReducer,
    },
  });

  return {
    ...store,
    dispatch: store.dispatch as AppDispatch,
    getState: store.getState as GetState,
  };
};

describe('appointmentsSlice', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockAppointment: Appointment = {
    id: '1',
    userId: '1',
    serviceId: '1',
    serviceName: 'Test Service',
    date: '2024-03-20',
    time: '10:00',
    status: 'scheduled',
    createdAt: '2024-03-19T10:00:00Z',
    price: 1000,
  };

  const mockNewAppointment: NewAppointment = {
    serviceId: '1',
    date: '2024-03-20',
    time: '10:00',
  };

  describe('fetchUserAppointments', () => {
    it('should handle pending state', () => {
      store.dispatch(fetchUserAppointments.pending('', undefined));
      const state = store.getState().appointments;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle successful fetch', () => {
      store.dispatch(fetchUserAppointments.fulfilled([mockAppointment], '', undefined));
      const state = store.getState().appointments;
      expect(state.loading).toBe(false);
      expect(state.appointments).toEqual([mockAppointment]);
      expect(state.error).toBeNull();
    });

    it('should handle fetch error', () => {
      const errorMessage = 'Failed to fetch appointments';
      store.dispatch(fetchUserAppointments.rejected(null, '', undefined, errorMessage));
      const state = store.getState().appointments;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    it('should fetch appointments from API', async () => {
      const mockAppointments = [mockAppointment];
      (appointmentsApi.getUserAppointments as jest.Mock).mockResolvedValue(mockAppointments);

      await store.dispatch(fetchUserAppointments());
      const state = store.getState().appointments;
      
      expect(appointmentsApi.getUserAppointments).toHaveBeenCalled();
      expect(state.appointments).toEqual(mockAppointments);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('createAppointment', () => {
    it('should handle pending state', () => {
      store.dispatch(createAppointment.pending('', mockNewAppointment));
      const state = store.getState().appointments;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle successful creation', () => {
      store.dispatch(createAppointment.fulfilled(mockAppointment, '', mockNewAppointment));
      const state = store.getState().appointments;
      expect(state.loading).toBe(false);
      expect(state.appointments).toContainEqual(mockAppointment);
      expect(state.error).toBeNull();
    });

    it('should handle creation error', () => {
      const errorMessage = 'Failed to create appointment';
      store.dispatch(createAppointment.rejected(null, '', mockNewAppointment, errorMessage));
      const state = store.getState().appointments;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    it('should create appointment through API', async () => {
      (appointmentsApi.createAppointment as jest.Mock).mockResolvedValue(mockAppointment);

      await store.dispatch(createAppointment(mockNewAppointment));
      const state = store.getState().appointments;
      
      expect(appointmentsApi.createAppointment).toHaveBeenCalledWith(mockNewAppointment);
      expect(state.appointments).toContainEqual(mockAppointment);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('cancelAppointment', () => {
    beforeEach(() => {
      // Add an appointment to cancel
      store.dispatch(createAppointment.fulfilled(mockAppointment, '', mockNewAppointment));
    });

    it('should handle pending state', () => {
      store.dispatch(cancelAppointment.pending('', '1'));
      const state = store.getState().appointments;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle successful cancellation', () => {
      store.dispatch(cancelAppointment.fulfilled('1', '', '1'));
      const state = store.getState().appointments;
      expect(state.loading).toBe(false);
      expect(state.appointments).not.toContainEqual(mockAppointment);
      expect(state.error).toBeNull();
    });

    it('should handle cancellation error', () => {
      const errorMessage = 'Failed to cancel appointment';
      store.dispatch(cancelAppointment.rejected(null, '', '1', errorMessage));
      const state = store.getState().appointments;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    it('should cancel appointment through API', async () => {
      (appointmentsApi.cancelAppointment as jest.Mock).mockResolvedValue('1');

      await store.dispatch(cancelAppointment('1'));
      const state = store.getState().appointments;
      
      expect(appointmentsApi.cancelAppointment).toHaveBeenCalledWith('1');
      expect(state.appointments).not.toContainEqual(mockAppointment);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('fetchAvailableSlots', () => {
    const mockSlots = [
      { date: '2024-03-20', time: '10:00' },
      { date: '2024-03-20', time: '11:00' },
    ];

    it('should handle pending state', () => {
      store.dispatch(fetchAvailableSlots.pending('', '1'));
      const state = store.getState().appointments;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle successful fetch', () => {
      store.dispatch(fetchAvailableSlots.fulfilled(mockSlots, '', '1'));
      const state = store.getState().appointments;
      expect(state.loading).toBe(false);
      expect(state.availableSlots).toEqual(mockSlots);
      expect(state.error).toBeNull();
    });

    it('should handle fetch error', () => {
      const errorMessage = 'Failed to fetch slots';
      store.dispatch(fetchAvailableSlots.rejected(null, '', '1', errorMessage));
      const state = store.getState().appointments;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    it('should fetch slots through API', async () => {
      (appointmentsApi.getAvailableSlots as jest.Mock).mockResolvedValue(mockSlots);

      await store.dispatch(fetchAvailableSlots('1'));
      const state = store.getState().appointments;
      
      expect(appointmentsApi.getAvailableSlots).toHaveBeenCalledWith('1');
      expect(state.availableSlots).toEqual(mockSlots);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('clearAppointmentsError', () => {
    it('should clear error state', () => {
      // First set an error
      store.dispatch(fetchUserAppointments.rejected(null, '', undefined, 'Test error'));
      expect(store.getState().appointments.error).toBe('Test error');

      // Then clear it
      store.dispatch(clearAppointmentsError());
      expect(store.getState().appointments.error).toBeNull();
    });
  });
}); 