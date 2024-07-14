package Queue.management.system.example.management.system.Exceptions.PatientExceptions;

public enum PatientErrMsg {
    PATIENT_NOT_FOUND("Patient not found"),
    PATIENT_ALREADY_EXISTS("Patient already exists"),
    INVALID_PATIENT_DATA("Invalid patient data"),
    APPOINTMENT_ALREADY_EXISTS("Appointment already exists"),
    APPOINTMENT_NOT_FOUND("Appointment not found"),
    APPOINTMENT_DATE_REQUIRED("Appointment date is required"),
    APPOINTMENT_TIME_REQUIRED("Appointment time is required"),
    DOCTOR_TYPE_REQUIRED("Doctor type is required"),
    DATE_ERROR("Invalid appointment date");

    private final String message;

    PatientErrMsg(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
