import React, { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { X, Calendar, Clock, User, FileText, Tag } from 'lucide-react';
import { AppointmentDetails as AppointmentDetailsProps } from '../../types/appointments';
import Button from '../ui/Button';

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
    appointment,
    isOpen,
    onClose,
}) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const formatDate = (dateString: string) => {
        try {
            const date = parseISO(dateString);
            return format(date, 'd MMMM yyyy (EEEE)', { locale: ru });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}>
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Детали приёма</h2>
                        <button
                            onClick={onClose}
                            className="text-neutral-500 hover:text-neutral-700"
                            aria-label="Закрыть"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">{appointment.serviceName}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start">
                                    <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                                    <div>
                                        <p className="text-sm font-medium">Дата</p>
                                        <p className="text-neutral-700">{formatDate(appointment.date)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Clock className="h-5 w-5 mr-2 text-primary-600" />
                                    <div>
                                        <p className="text-sm font-medium">Время</p>
                                        <p className="text-neutral-700">{appointment.time}</p>
                                    </div>
                                </div>

                                {appointment.specialistName && (
                                    <div className="flex items-start">
                                        <User className="h-5 w-5 mr-2 text-primary-600" />
                                        <div>
                                            <p className="text-sm font-medium">Врач</p>
                                            <p className="text-neutral-700">{appointment.specialistName}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start">
                                    <Tag className="h-5 w-5 mr-2 text-primary-600" />
                                    <div>
                                        <p className="text-sm font-medium">Стоимость</p>
                                        <p className="text-neutral-700">
                                            {appointment.price.toLocaleString('ru-RU')} ₽
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {appointment.status === 'completed' && appointment.conclusion && (
                            <div className="border-t pt-6">
                                <div className="flex items-start mb-4">
                                    <FileText className="h-5 w-5 mr-2 text-primary-600" />
                                    <h3 className="text-lg font-semibold">Заключение врача</h3>
                                </div>
                                <div className="bg-neutral-50 rounded-lg p-4">
                                    <p className="whitespace-pre-line text-neutral-700">
                                        {appointment.conclusion}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Button onClick={onClose} variant="outline">
                            Закрыть
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetails;