import { UserDetails } from '../Models/UserDetails';
import { Appointment } from '../Models/Appointment';
import { AppointmentStatus } from '../Models/AppointmentStatus';
import { PatientModel } from '../Models/PatientModel';
import { DoctorType } from '../Models/DoctorType';
import { AdminActionType } from '../Models/AdminActionType';

const initialState = {
  users: [] as UserDetails[],
  appointments: [] as Appointment[],
  appointmentStatuses: [] as AppointmentStatus[],
  doctorTypes: [] as DoctorType[],
  patients: [] as PatientModel[],
  singleAppointment: null as Appointment | null,
  singlePatient: null as PatientModel | null,
};

// Define action interfaces
interface AddAppointmentAction {
  type: AdminActionType.ADD_APPOINTMENT;
  payload: Appointment;
}

interface AddAppointmentToPatientAction {
  type: AdminActionType.ADD_APPOINTMENT_TO_PATIENT;
  payload: { patientId: number; appointment: Appointment };
}

interface AddPatientAction {
  type: AdminActionType.ADD_PATIENT;
  payload: PatientModel;
}

interface AllAppointmentsAction {
  type: AdminActionType.ALL_APPOINTMENTS;
  payload: Appointment[];
}

interface GetAppointmentsByDoctorAction {
  type: AdminActionType.GET_APPOINTMENTS_BY_DOCTOR;
  payload: { doctorType: DoctorType; appointments: Appointment[] };
}

interface GetAllPatientsAction {
  type: AdminActionType.GET_ALL_PATIENTS;
  payload: PatientModel[];
}

interface DeleteAppointmentAction {
  type: AdminActionType.DELETE_APPOINTMENT;
  payload: number;
}

interface DeletePatientsAction {
  type: AdminActionType.DELETE_PATIENTS;
  payload: number[];
}

interface GetSingleAppointmentAction {
  type: AdminActionType.GET_SINGLE_APPOINTMENT;
  payload: Appointment;
}

interface GetSinglePatientAction {
  type: AdminActionType.GET_SINGLE_PATIENT;
  payload: PatientModel;
}

interface UpdateAppointmentAction {
  type: AdminActionType.UPDATE_APPOINTMENT;
  payload: Appointment;
}

interface UpdatePatientAction {
  type: AdminActionType.UPDATE_PATIENT;
  payload: PatientModel;
}

interface GetAllAppointmentsByDoctorTypeAction {
  type: AdminActionType.GET_ALL_APPOINTMENTS_BY_DOCTOR_TYPE;
  payload: { doctorType: DoctorType; appointments: Appointment[] };
}

type AdminActions =
  | AddAppointmentAction
  | AddAppointmentToPatientAction
  | AddPatientAction
  | AllAppointmentsAction
  | GetAppointmentsByDoctorAction
  | GetAllPatientsAction
  | DeleteAppointmentAction
  | DeletePatientsAction
  | GetSingleAppointmentAction
  | GetSinglePatientAction
  | UpdateAppointmentAction
  | UpdatePatientAction
  | GetAllAppointmentsByDoctorTypeAction;

// Action creators
export const addAppointment = (appointment: Appointment): AddAppointmentAction => ({
  type: AdminActionType.ADD_APPOINTMENT,
  payload: appointment,
});

export const addAppointmentToPatient = (patientId: number, appointment: Appointment): AddAppointmentToPatientAction => ({
  type: AdminActionType.ADD_APPOINTMENT_TO_PATIENT,
  payload: { patientId, appointment },
});

export const addPatient = (patient: PatientModel): AddPatientAction => ({
  type: AdminActionType.ADD_PATIENT,
  payload: patient,
});

export const allAppointments = (appointments: Appointment[]): AllAppointmentsAction => ({
  type: AdminActionType.ALL_APPOINTMENTS,
  payload: appointments,
});

export const getAppointmentsByDoctor = (doctorType: DoctorType, appointments: Appointment[]): GetAppointmentsByDoctorAction => ({
  type: AdminActionType.GET_APPOINTMENTS_BY_DOCTOR,
  payload: { doctorType, appointments },
});

export const getAllPatients = (patients: PatientModel[]): GetAllPatientsAction => ({
  type: AdminActionType.GET_ALL_PATIENTS,
  payload: patients,
});

export const deleteAppointment = (appointmentId: number): DeleteAppointmentAction => ({
  type: AdminActionType.DELETE_APPOINTMENT,
  payload: appointmentId,
});

export const deletePatients = (patientIds: number[]): DeletePatientsAction => ({
  type: AdminActionType.DELETE_PATIENTS,
  payload: patientIds,
});

export const getSingleAppointment = (appointment: Appointment): GetSingleAppointmentAction => ({
  type: AdminActionType.GET_SINGLE_APPOINTMENT,
  payload: appointment,
});

export const getSinglePatient = (patient: PatientModel): GetSinglePatientAction => ({
  type: AdminActionType.GET_SINGLE_PATIENT,
  payload: patient,
});

export const updateAppointment = (appointment: Appointment): UpdateAppointmentAction => ({
  type: AdminActionType.UPDATE_APPOINTMENT,
  payload: appointment,
});

export const updatePatient = (patient: PatientModel): UpdatePatientAction => ({
  type: AdminActionType.UPDATE_PATIENT,
  payload: patient,
});

export const getAllAppointmentsByDoctorType = (doctorType: DoctorType, appointments: Appointment[]): GetAllAppointmentsByDoctorTypeAction => ({
  type: AdminActionType.GET_ALL_APPOINTMENTS_BY_DOCTOR_TYPE,
  payload: { doctorType, appointments },
});

// Reducer function
const adminReducer = (state = initialState, action: AdminActions) => {
  switch (action.type) {
    case AdminActionType.ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
    case AdminActionType.ADD_APPOINTMENT_TO_PATIENT:
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.id === action.payload.patientId
            ? { ...patient, appointments: [...patient.appointments, action.payload.appointment] }
            : patient
        ),
      };
    case AdminActionType.ADD_PATIENT:
      return {
        ...state,
        patients: [...state.patients, action.payload],
      };
    case AdminActionType.ALL_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
      };
    case AdminActionType.GET_APPOINTMENTS_BY_DOCTOR:
      return {
        ...state,
        appointments: action.payload.appointments.filter(
          appointment => appointment.doctorType === action.payload.doctorType
        ),
      };
    case AdminActionType.GET_ALL_PATIENTS:
      return {
        ...state,
        patients: action.payload,
      };
    case AdminActionType.DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(appointment => appointment.id !== action.payload),
      };
    case AdminActionType.DELETE_PATIENTS:
      return {
        ...state,
        patients: state.patients.filter(patient => !action.payload.includes(patient.id)),
      };
    case AdminActionType.GET_SINGLE_APPOINTMENT:
      return {
        ...state,
        singleAppointment: action.payload,
      };
    case AdminActionType.GET_SINGLE_PATIENT:
      return {
        ...state,
        singlePatient: action.payload,
      };
    case AdminActionType.UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map(appointment =>
          appointment.id === action.payload.id ? action.payload : appointment
        ),
      };
    case AdminActionType.UPDATE_PATIENT:
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.id === action.payload.id ? action.payload : patient
        ),
      };
    case AdminActionType.GET_ALL_APPOINTMENTS_BY_DOCTOR_TYPE:
      return {
        ...state,
        appointments: action.payload.appointments.filter(
          appointment => appointment.doctorType === action.payload.doctorType
        ),
      };
    default:
      return state;
  }
};

export default adminReducer;
