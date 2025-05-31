import { format, addDays, parseISO, isBefore } from 'date-fns';
import { Appointment, NewAppointment } from '../types/appointments';

const DELAY = 500;
const APPOINTMENTS_KEY = 'appointments';
const USER_DATA_KEY = 'user_data';

// Загрузка записей из localStorage
let mockAppointments: Appointment[] = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');

// Получение ID текущего пользователя
const getCurrentUserId = () => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  if (!userData) throw new Error('Пользователь не авторизован');
  return JSON.parse(userData).id;
};

// Сохранение записей в localStorage
const saveAppointments = () => {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(mockAppointments));
};

const generateAvailableSlots = (serviceId: string) => {
  const slots = [];
  const startDate = new Date();

  for (let i = 1; i <= 14; i++) {
    const currentDate = addDays(startDate, i);
    if ([0, 6].includes(currentDate.getDay())) continue;

    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    for (let hour = 9; hour < 18; hour++) {
      for (let minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isBooked = mockAppointments.some(
          (a) => a.date === formattedDate && a.time === time && a.serviceId === serviceId
        );
        if (!isBooked) {
          slots.push({ date: formattedDate, time });
        }
      }
    }
  }

  return slots;
};

const generateConclusion = (serviceId: string): string => {
  const conclusions = {
    '1': 'Проведен первичный осмотр. Общее состояние удовлетворительное. Назначено дополнительное обследование.',
    '2': 'Проведен повторный осмотр. Отмечается положительная динамика. Рекомендовано продолжить лечение.',
    '3': 'Выполнена профессиональная чистка зубов. Состояние полости рта удовлетворительное.',
    '4': 'Проведено лечение кариеса. Установлена пломба из светоотверждаемого материала.',
    '5': 'Проведена проверка зрения. Острота зрения: OD = 1.0, OS = 1.0. Внутриглазное давление в норме.',
    '6': 'Выполнен подбор очков. Назначена оптическая коррекция.',
    '7': 'Проведена консультация невролога. Неврологический статус без особенностей.',
    '8': 'Выполнен общий анализ крови. Все показатели в пределах референсных значений.',
    '9': 'Проведен биохимический анализ крови. Отклонений от нормы не выявлено.',
    '10': 'Выполнена ЭКГ. Ритм синусовый, нормальный. Патологических изменений не выявлено.',
  };
  
  return conclusions[serviceId as keyof typeof conclusions] || 
    'Приём завершен. Рекомендации выданы пациенту на руки.';
};

const updateAppointmentStatuses = () => {
  const now = new Date();
  mockAppointments = mockAppointments.map(appointment => {
    const appointmentDate = parseISO(`${appointment.date}T${appointment.time}`);
    if (appointment.status === 'scheduled' && isBefore(appointmentDate, now)) {
      return { 
        ...appointment, 
        status: 'completed',
        conclusion: generateConclusion(appointment.serviceId)
      };
    }
    return appointment;
  });
  saveAppointments();
};

export const appointmentsApi = {
  getUserAppointments: async (): Promise<Appointment[]> => {
    await new Promise((r) => setTimeout(r, DELAY));
    const userId = getCurrentUserId();
    updateAppointmentStatuses();
    return mockAppointments.filter((a) => a.userId === userId && a.status !== 'cancelled');
  },

  createAppointment: async (appointmentData: NewAppointment): Promise<Appointment> => {
    await new Promise((r) => setTimeout(r, DELAY));
    const userId = getCurrentUserId();

    const { servicesApi } = await import('./servicesApi');
    const service = await servicesApi.getServiceById(appointmentData.serviceId);

    const newAppointment: Appointment = {
      id: String(Date.now()),
      userId,
      serviceId: appointmentData.serviceId,
      serviceName: service.name,
      date: appointmentData.date,
      time: appointmentData.time,
      specialistId: appointmentData.specialistId,
      specialistName: appointmentData.specialistId ? 'Иванов Иван Иванович' : undefined,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      price: service.price,
    };

    mockAppointments.push(newAppointment);
    saveAppointments();
    return newAppointment;
  },

  cancelAppointment: async (id: string): Promise<string> => {
    await new Promise((r) => setTimeout(r, DELAY));
    const userId = getCurrentUserId();

    mockAppointments = mockAppointments.filter(
      (appointment) => !(appointment.id === id && appointment.userId === userId)
    );
    saveAppointments();
    return id;
  },

  getAvailableSlots: async (serviceId: string): Promise<{ date: string; time: string }[]> => {
    await new Promise((r) => setTimeout(r, DELAY));
    return generateAvailableSlots(serviceId);
  },
};