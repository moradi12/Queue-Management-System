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
  public doctorType: DoctorType;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    appointments: Appointment[],
    doctorType: DoctorType
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.appointments = appointments;
    this.doctorType = doctorType;
  }

  public getId(): number {
    return this.id;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getPassword(): string {
    return this.password;
  }

  public getAppointments(): Appointment[] {
    return this.appointments;
  }

  public setAppointments(appointments: Appointment[]): void {
    this.appointments = appointments;
  }

  public getDoctorType(): DoctorType {
    return this.doctorType;
  }

  public setDoctorType(doctorType: DoctorType): void {
    this.doctorType = doctorType;
  }
}
