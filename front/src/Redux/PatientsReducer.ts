import { Appointment } from "../Models/Appointment";
import { PatientModel } from "../Models/PatientModel";

export class PatientState {
  public allPatients: PatientModel[] = [];
  public patient: PatientModel = {
    id: -1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  };

  public allPatientAppointments: Appointment[] = [];
}

export enum PatientActionType {
  deleteAppointment = "deleteAppointment",
  updatePatient = "updatePatient",
  makingAppointment = "makingAppointment",
  allPatientAppointments = "allPatientAppointments",
  patientAppointmentsByDoctorType = "patientAppointmentsByDoctorType",
  singlePatient = "singlePatient",
}

export interface PatientAction {
  type: PatientActionType;
  payload?: any;
}

export function deleteAppointmentAction(id: number): PatientAction {
  return { type: PatientActionType.deleteAppointment, payload: id };
}

export function updatePatientAction(
  patientToUpdate: PatientModel
): PatientAction {
  return { type: PatientActionType.updatePatient, payload: patientToUpdate };
}

export function makingAppointmentAction(
  newAppointment: Appointment
): PatientAction {
  return { type: PatientActionType.makingAppointment, payload: newAppointment };
}

export function allPatientAppointmentsAction(): PatientAction {
  return { type: PatientActionType.allPatientAppointments };
}

export function patientAppointmentsByDoctorTypeAction(
  appointments: Appointment[]
): PatientAction {
  return {
    type: PatientActionType.patientAppointmentsByDoctorType,
    payload: appointments,
  };
}

export function singlePatientAction(patient: PatientModel): PatientAction {
  return { type: PatientActionType.singlePatient, payload: patient };
}

export function PatientReducer(
  currentState: PatientState = new PatientState(),
  action: PatientAction
): PatientState {
  let newState = { ...currentState };
  switch (action.type) {
    case PatientActionType.deleteAppointment:
      newState.allPatientAppointments = [
        ...newState.allPatientAppointments,
      ].filter((item) => item.id !== action.payload);
      break;
    case PatientActionType.updatePatient:
      newState.allPatients = [...newState.allPatients].filter(
        (item) => item.id !== action.payload.id
      );
      newState.allPatients = [...newState.allPatients, action.payload];
      break;
    case PatientActionType.makingAppointment:
      newState.allPatientAppointments = [
        ...newState.allPatientAppointments,
        action.payload,
      ];
      break;
    case PatientActionType.allPatientAppointments:
      newState.allPatientAppointments = action.payload;
      break;
    case PatientActionType.patientAppointmentsByDoctorType:
      newState.allPatientAppointments = [
        ...newState.allPatientAppointments,
      ].filter((appointment) => appointment.doctorType === action.payload);
      break;
    case PatientActionType.singlePatient:
      newState.patient = action.payload;
      break;
  }
  return newState;
}
