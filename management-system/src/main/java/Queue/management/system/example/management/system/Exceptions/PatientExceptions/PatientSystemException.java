package Queue.management.system.example.management.system.Exceptions.PatientExceptions;
import lombok.Getter;
@Getter
public class PatientSystemException extends Exception {
    public PatientSystemException(PatientErrMsg patientErrMsg) {
        super (patientErrMsg.getMessage());
    }
}