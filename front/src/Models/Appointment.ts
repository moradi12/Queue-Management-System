import { AppointmentStatus } from './AppointmentStatus';
import { DoctorType } from './DoctorType';

export class Appointment {
  public id: number;
  public appointmentDate: Date;
  public appointmentStatus: AppointmentStatus;
  public doctorType: DoctorType;

  constructor(
    id: number,
    appointmentDate: Date,
    appointmentStatus: AppointmentStatus,
    doctorType: DoctorType
  ) {
    this.id = id;
    this.appointmentDate = appointmentDate;
    this.appointmentStatus = appointmentStatus;
    this.doctorType = doctorType;
  }

  // Method to format the appointment date
  public formatAppointmentDate(): string {
    return this.appointmentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  // Static method to parse a date string and create an Appointment instance
  public static parseDateString(
    id: number,
    dateString: string,
    appointmentStatus: AppointmentStatus,
    doctorType: DoctorType
  ): Appointment {
    const date = new Date(dateString);
    return new Appointment(id, date, appointmentStatus, doctorType);
  }
}
