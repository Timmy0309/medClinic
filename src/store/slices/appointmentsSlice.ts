import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { appointmentsApi } from '../../api/appointmentsApi';
import type { RootState } from '../index';
import { Appointment, NewAppointment } from '../../types/appointments';

interface AppointmentsState {
  appointments: Appointment[];
  availableSlots: { date: string; time: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentsState = {
  appointments: [],
  availableSlots: [],
  loading: false,
  error: null,
};

export const fetchUserAppointments = createAsyncThunk(
  'appointments/fetchUserAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentsApi.getUserAppointments();
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке записей');
    }
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (appointmentData: NewAppointment, { rejectWithValue }) => {
    try {
      const response = await appointmentsApi.createAppointment(appointmentData);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при создании записи');
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  'appointments/cancelAppointment',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await appointmentsApi.cancelAppointment(id);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при отмене записи');
    }
  }
);

export const fetchAvailableSlots = createAsyncThunk(
  'appointments/fetchAvailableSlots',
  async (serviceId: string, { rejectWithValue }) => {
    try {
      const response = await appointmentsApi.getAvailableSlots(serviceId);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке доступных слотов');
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearAppointmentsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchUserAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(
          appointment => appointment.id !== action.payload
        );
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.availableSlots = action.payload;
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAppointmentsError } = appointmentsSlice.actions;

export const selectAppointments = (state: RootState) => state.appointments.appointments;
export const selectAvailableSlots = (state: RootState) => state.appointments.availableSlots;
export const selectAppointmentsLoading = (state: RootState) => state.appointments.loading;
export const selectAppointmentsError = (state: RootState) => state.appointments.error;

export default appointmentsSlice.reducer;