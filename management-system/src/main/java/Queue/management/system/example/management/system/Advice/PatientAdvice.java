package Queue.management.system.example.management.system.Advice;

import Queue.management.system.example.management.system.Exceptions.PatientExceptions.PatientSystemException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class PatientAdvice {

    @ExceptionHandler(PatientSystemException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrDetails handlePatientSystemException(PatientSystemException e) {
        return new ErrDetails("Error", e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();

        exception.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return errors;
    }
}
