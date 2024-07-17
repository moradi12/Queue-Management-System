import { DoctorType } from './DoctorType';
import { Appointment } from './Appointment';

export class PatientModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public password: string;
  public appointments: Appointment[];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    appointments: Appointment[],
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.appointments = appointments;
  }

}
