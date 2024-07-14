package Queue.management.system.example.management.system.Controllers;

import Queue.management.system.example.management.system.Beans.Appointment;
import Queue.management.system.example.management.system.Beans.DoctorType;
import Queue.management.system.example.management.system.Beans.Patient;
import Queue.management.system.example.management.system.Exceptions.AdminExceptions.AdminSystemException;
import Queue.management.system.example.management.system.Exceptions.PatientExceptions.PatientSystemException;
import Queue.management.system.example.management.system.Service.PatientService;
import Queue.management.system.example.management.system.utills.JWT;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;
    private final JWT jwtUtil; // Inject JWT utility class

    @DeleteMapping("/{patientId}/appointments/{appointmentId}")
    public ResponseEntity<Void> cancelAppointment(@RequestHeader("Authorization") String jwt, @PathVariable int patientId, @PathVariable int appointmentId) {
        try {
            jwtUtil.CheckTheJWT(jwt);
            patientService.cancelAppointment(patientId, appointmentId);
            return ResponseEntity.ok().build();
        } catch (PatientSystemException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/{patientId}/appointments/{appointmentId}")
    public ResponseEntity<Void> makeAppointment(@RequestHeader("Authorization") String jwt, @PathVariable int patientId, @PathVariable int appointmentId) {
        try {
            jwtUtil.CheckTheJWT(jwt);
            patientService.makeAppointment(patientId, appointmentId);
            return ResponseEntity.ok().build();
        } catch (PatientSystemException | AdminSystemException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/{patientId}/appointments")
    public ResponseEntity<List<Appointment>> getAllPatientAppointments(@RequestHeader("Authorization") String jwt, @PathVariable int patientId) {
        try {
            jwtUtil.CheckTheJWT(jwt);
            List<Appointment> appointments = patientService.getAllPatientAppointments(patientId);
            return ResponseEntity.ok(appointments);
        } catch (PatientSystemException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/{patientId}/appointments/doctorType")
    public ResponseEntity<List<Appointment>> getPatientAppointmentsByDoctorType(@RequestHeader("Authorization") String jwt, @PathVariable int patientId, @RequestParam DoctorType doctorType) {
        try {
            jwtUtil.CheckTheJWT(jwt);
            List<Appointment> appointments = patientService.getPatientAppointmentsByDoctorType(patientId, doctorType);
            return ResponseEntity.ok(appointments);
        } catch (PatientSystemException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping("/{patientId}")
    public ResponseEntity<Void> updatePatient(@RequestHeader("Authorization") String jwt, @RequestBody Patient updatedPatient) {
        try {
            jwtUtil.CheckTheJWT(jwt);
            patientService.updatePatient(updatedPatient);
            return ResponseEntity.ok().build();
        } catch (AdminSystemException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
