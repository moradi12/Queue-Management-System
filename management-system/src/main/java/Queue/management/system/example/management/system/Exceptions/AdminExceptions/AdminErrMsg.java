package Queue.management.system.example.management.system.Exceptions.AdminExceptions;

import lombok.Getter;

@Getter
public enum AdminErrMsg {
    USER_NOT_FOUND("Patient not found"),
    INVALID_CREDENTIALS("Invalid credentials"),
    ACCESS_DENIED("Access denied"),
    OPERATION_FAILED("Operation failed"),
    ID_NOT_FOUND("ID not found"),
    APPOINTMENT_NOT_FOUND("Appointment not found"),
    APPOINTMENT_ALREADY_EXISTS("Appointment already exists"),
    PATIENT_ALREADY_EXISTS("Patient already exists"),
    DOCTOR_TYPE_NOT_FOUND("DOCTOR_TYPE_NOT_FOUND"),
    APPOINTMENT_DATE_REQUIRED("Appointment date is required"),
    APPOINTMENT_TIME_REQUIRED("Appointment time is required"),
    DOCTOR_TYPE_REQUIRED("Doctor type is required");
    ;
    private final String message;

    AdminErrMsg(String message) {
        this.message = message;
    }
}
