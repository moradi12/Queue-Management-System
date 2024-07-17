import { Appointment } from "../Models/Appointment";
import { AppointmentStatus } from "../Models/AppointmentStatus";
import { DoctorType } from "../Models/DoctorType";
import { PatientModel } from "../Models/PatientModel";
import { UserDetails } from "../Models/UserDetails";

export class AdminState {
    appointments: Appointment[] = [];
    patients: PatientModel[] = [];
    userDetails: UserDetails | null = null;
    // Add other state properties as needed
        patient: PatientModel = new PatientModel(
            0, // id
            "", // firstName
            "", // lastName
            "", // email
            "", // phone
            "", // password
            []  // appointments
        );

        appointment: Appointment = new Appointment(
            0, // id
            new Date(), // appointmentDate
            AppointmentStatus.PENDING, // appointmentStatus (הגדרה ראשונית)
            DoctorType.FAMILY_MEDICINE // doctorType (הגדרה ראשונית)
        );
    }

// Define action types as an enum
export enum AdminActionType {
    addAppointment = "addAppointment",
    addAppointmentToPatient = "addAppointmentToPatient",
    addPatient = "addPatient",
    allAppointments = "allAppointments",
    getAppointmentsByDoctor = "getAppointmentsByDoctor",
    getAllPatients = "getAllPatients",
    deleteAppointment = "deleteAppointment",
    deletePatients = "deletePatients",
    getSingleAppointment = "getSingleAppointment",
    getSinglePatient = "getSinglePatient",
    updateAppointment = "updateAppointment",

}

// Define the AdminAction interface
export interface AdminAction {
    type: AdminActionType;
    payload?: any;
}

// Define action creators
export function addAppointmentAction(newAppointment: Appointment): AdminAction {
    return { type: AdminActionType.addAppointment, payload: newAppointment};
}

export function addAppointmentToPatientAction(appointment: Appointment): AdminAction {
    return {type: AdminActionType.addAppointmentToPatient,payload:appointment};
}

export function addPatientAction(newPatient: PatientModel): AdminAction {
    return {type: AdminActionType.addPatient, payload: newPatient};
}

export function allAppointmentsAction(appointments: Appointment[]): AdminAction {
    return { type: AdminActionType.allAppointments, payload: appointments,
    };
}

export function getAppointmentsByDoctorAction(appointment: Appointment[]): AdminAction {
    return {type: AdminActionType.getAppointmentsByDoctor, payload: appointment};
}

export function getAllPatientsAction(patients: PatientModel[]): AdminAction {
    return {type: AdminActionType.getAllPatients, payload: patients,
    };
}

export function deleteAppointmentAction(appointmentId: number): AdminAction {
    return {type: AdminActionType.deleteAppointment, payload: appointmentId};
}

export function deletePatientsAction(patientId: number): AdminAction {
    return {type: AdminActionType.deletePatients,payload: patientId};
}

export function getSingleAppointmentAction(appointment: Appointment): AdminAction {
    return {type: AdminActionType.getSingleAppointment, payload: appointment};
}

export function getSinglePatientAction(patient: PatientModel): AdminAction {
    return {type: AdminActionType.getSinglePatient, payload: patient};
}

export function updateAppointmentAction(updatedAppointment: Appointment): AdminAction {
    return {type: AdminActionType.updateAppointment, payload: updatedAppointment};
}

export function updatePatientAction(updatedPatient: PatientModel): AdminAction {
    return {type: AdminActionType.updateAppointment, payload: updatedPatient};
}

export function getAllAppointmentsByDoctorTypeAction(Appointments: Appointment[]): AdminAction {
    return {type: AdminActionType.getAppointmentsByDoctor, payload: Appointments};
}

// Define the reducer function
export function AdminReducer(currentState: AdminState = new AdminState(), action: AdminAction): AdminState {
    const newState = { ...currentState };
    switch (action.type) {
        case AdminActionType.addAppointment:
            newState.appointments = [...newState.appointments, action.payload];
            break;     
        case AdminActionType.addAppointmentToPatient:
            newState.appointments = [...newState.appointments, action.payload];
            break;
        case AdminActionType.addPatient:
            newState.patients = [...newState.patients, action.payload];
            break;
        case AdminActionType.allAppointments:
            newState.appointments = action.payload;
            break;
        case AdminActionType.getAppointmentsByDoctor:
            newState.appointments = [...newState.appointments].filter((item) => item.doctorType ===action.payload);
            break;
        case AdminActionType.getAllPatients:
            newState.patients = action.payload;
            break;
        case AdminActionType.deleteAppointment:
            newState.appointments = newState.appointments.filter(app => app.id !== action.payload);
            break;
        case AdminActionType.deletePatients:
            newState.patients = newState.patients.filter(patient => patient.id !== action.payload);
            break;
        case AdminActionType.getSingleAppointment:
            newState.appointment = action.payload;
            break;
        case AdminActionType.getSinglePatient:
            newState.patient = action.payload;
            break;
        case AdminActionType.updateAppointment:
            newState.appointments = newState.appointments.map(app => 
                app.id === action.payload.id ? action.payload : app
            );
            break;
       
    }
    return newState;
}