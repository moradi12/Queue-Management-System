import { AppointmentStatus } from './AppointmentStatus';
import { DoctorType } from './DoctorType';

export class Appointment {
  public id: number;
  public appointmentDateTime: Date; // Use Date to represent both date and time
  public appointmentStatus: AppointmentStatus;
  public doctorType: DoctorType;

  constructor(
    id: number,
    appointmentDateTime: Date, // Changed to appointmentDateTime
    appointmentStatus: AppointmentStatus,
    doctorType: DoctorType
  ) {
    this.id = id;
    this.appointmentDateTime = appointmentDateTime; // Updated variable name
    this.appointmentStatus = appointmentStatus;
    this.doctorType = doctorType;
  }

  // Method to format the appointment date and time
  public formatAppointmentDateTime(): string {
    return this.appointmentDateTime.toISOString().replace('T', ' ').substring(0, 16); // Format as YYYY-MM-DD HH:mm
  }

  // Static method to parse a date string and create an Appointment instance
  public static parseDateTimeString(
    id: number,
    dateTimeString: string,
    appointmentStatus: AppointmentStatus,
    doctorType: DoctorType
  ): Appointment {
    const dateTime = new Date(dateTimeString);
    return new Appointment(id, dateTime, appointmentStatus, doctorType);
  }
}
