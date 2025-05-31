export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  specialistId?: string;
  specialistName?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  price: number;
  conclusion?: string;
}

export interface NewAppointment {
  serviceId: string;
  date: string;
  time: string;
  specialistId?: string;
  notes?: string;
}

export interface AppointmentDetails {
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
}

/////////////////////////