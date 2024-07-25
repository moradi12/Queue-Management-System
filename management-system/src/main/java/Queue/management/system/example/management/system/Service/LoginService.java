package Queue.management.system.example.management.system.Service;

import Queue.management.system.example.management.system.Beans.Credentials;
import Queue.management.system.example.management.system.Beans.Patient;
import Queue.management.system.example.management.system.Beans.UserDetails;
import Queue.management.system.example.management.system.Beans.UserType;
import Queue.management.system.example.management.system.Exceptions.AdminExceptions.AdminSystemException;
import Queue.management.system.example.management.system.Exceptions.PatientExceptions.PatientSystemException;
import Queue.management.system.example.management.system.utills.JWT;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;

import static Queue.management.system.example.management.system.Beans.UserType.PATIENT;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final AdminService adminService;
    private final PatientService patientService;
    private final JWT jwtUtil;

    public String register(UserDetails user) throws LoginException, PatientSystemException, AdminSystemException {
        switch (user.getUserType()) {
            case PATIENT:
                System.out.println("Registering Patient: " + user.getEmail());
                Patient patient = Patient.builder()
                        .id(0)
                        .firstName("") // Provide a default first name
                        .lastName("") // Provide a default last name
                        .email(user.getEmail())
                        .password(user.getPassword())
                        .build();
                patientService.addPatient(patient);
                break;
            default:
                throw new LoginException("Invalid user type");
        }
        String token = jwtUtil.generateToken(user);
        System.out.println("User registered successfully. Token: " + token);
        return token;
    }

    public UserDetails loginUser(Credentials credentials) throws LoginException, PatientSystemException, AdminSystemException {
        System.out.println("Attempting to log in with email: " + credentials.getEmail() + ", userType: " + credentials.getUserType());
        UserDetails userDetails;
        switch (credentials.getUserType()) {
            case ADMIN:
                userDetails = validateAdminCredentials(credentials);
                break;
            case PATIENT:
                userDetails = validatePatientCredentials(credentials);
                break;
            default:
                System.out.println("Invalid user type.");
                throw new LoginException("Invalid user type");
        }
        System.out.println("User logged in successfully: " + userDetails.getEmail());
        return userDetails;
    }

    private UserDetails validateAdminCredentials(Credentials credentials) throws LoginException {
        if ("admin@admin.com".equals(credentials.getEmail()) && "adminMed".equals(credentials.getPassword())) {
            return UserDetails.builder()
                    .email(credentials.getEmail())
                    .userName("Admin")
                    .userType(UserType.ADMIN)
                    .userId(1)
                    .password(credentials.getPassword())
                    .build();
        } else {
            throw new LoginException("Invalid admin credentials");
        }
    }

    private UserDetails validatePatientCredentials(Credentials credentials) throws LoginException, PatientSystemException {
        System.out.println("Validating Patient credentials for: " + credentials.getEmail());
        if (!patientService.isPatientExist(credentials.getEmail(), credentials.getPassword())) {
            System.out.println("Customer not found or wrong credentials: " + credentials.getEmail());
            throw new LoginException("Login failed: Wrong email or password for customer");
        } else {
            Patient patient = patientService.patientLogin(credentials.getEmail(), credentials.getPassword());
            return UserDetails.builder()
                    .email(patient.getEmail())
                    .userName(patient.getFirstName() + "_" + patient.getLastName())
                    .userType(PATIENT)
                    .userId(patient.getId())
                    .password(patient.getPassword())
                    .build();
        }
    }
}
