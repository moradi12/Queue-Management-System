package Queue.management.system.example.management.system.Controllers;

import Queue.management.system.example.management.system.Beans.Appointment;
import Queue.management.system.example.management.system.Beans.DoctorType;
import Queue.management.system.example.management.system.Beans.Patient;
import Queue.management.system.example.management.system.Exceptions.AdminExceptions.AdminSystemException;
import Queue.management.system.example.management.system.Service.AdminService;
import Queue.management.system.example.management.system.Service.PatientService;
import Queue.management.system.example.management.system.utills.JWT;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;
    private final PatientService patientService;
    private final JWT jwtUtil;

    @PostMapping("/add/patient")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> addPatient(@RequestHeader("Authorization") String jwt, @RequestBody Patient patient) {
        try {
            HttpHeaders headers = jwtUtil.CheckTheJWT(jwt);
            adminService.addPatients(patient);
            return new ResponseEntity<>("Patient added successfully", headers, HttpStatus.CREATED);
        } catch (AdminSystemException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/update/patient")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<String> updatePatient(@RequestHeader("Authorization") String jwt, @RequestBody Patient patient) {
        try {
            HttpHeaders headers = jwtUtil.CheckTheJWT(jwt);
            adminService.updatePatients(patient);
            return new ResponseEntity<>("Patient updated successfully", headers, HttpStatus.OK);
        } catch (AdminSystemException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<Patient> getSinglePatient(@RequestHeader("Authorization") String jwt, @PathVariable int id) {
        try {
            jwtUtil.CheckTheJWT(jwt);
            Patient patient = adminService.getSinglePatient(id);
            return ResponseEntity.ok(patient);
        } catch (AdminSystemException e) {
            return ResponseEntity.status(404).build();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients(@RequestHeader("Authorization") String jwt) {
        try {
            jwtUtil.CheckTheJWT(jwt);
            List<Patient> patients = adminService.getAllPatients();
            return ResponseEntity.ok(patients);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/appointment")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> createAppointment(@RequestHeader("Authorization") String jwt, @RequestBody Appointment appointment) {
        try {
            HttpHeaders headers = jwtUtil.CheckTheJWT(jwt);
            adminService.createAppointment(appointment);
            return new ResponseEntity<>("Appointment created successfully", headers, HttpStatus.CREATED);
        } catch (AdminSystemException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<Appointment> getSingleAppointment(@RequestHeader("Authorization") String jwt, @PathVariable int appointmentId) {
        try {
            jwtUtil.CheckTheJWT(jwt);
            Appointment appointment = adminService.getSingleAppointment(appointmentId);
            return new ResponseEntity<>(appointment, HttpStatus.OK);
        } catch (AdminSystemException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }


    @PutMapping("/update/appointment")
    public ResponseEntity<String> updateAppointment(@RequestHeader("Authorization") String jwt, @RequestBody Appointment appointment) {
        try {
            HttpHeaders headers = jwtUtil.CheckTheJWT(jwt);
            System.out.println("Received update request for appointment ID: " + appointment.getId());

            Appointment updatedAppointment = adminService.updateAppointment(appointment);
            System.out.println("Appointment updated successfully with ID: " + updatedAppointment.getId());
            return new ResponseEntity<>("Appointment updated successfully", headers, HttpStatus.OK);
        } catch (AdminSystemException e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Invalid token");
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        }
    }

//
//    @PutMapping("/update/appointment")
//    public ResponseEntity<String> updateAppointment(@RequestHeader("Authorization") String jwt, @RequestBody Appointment appointment) {
//        try {
//            HttpHeaders headers = jwtUtil.CheckTheJWT(jwt);
//            adminService.updateAppointment(appointment);
//            return new ResponseEntity<>("Appointment updated successfully", headers, HttpStatus.OK);
//        } catch (AdminSystemException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        } catch (Exception e) {
//            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
//        }
//    }




    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments(@RequestHeader("Authorization") String jwt) {
        try {
            jwtUtil.CheckTheJWT(jwt);
            return new ResponseEntity<>(adminService.getAllAppointments(), HttpStatus.OK);
        } catch (AdminSystemException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/appointments/{doctorType}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctorType(@RequestHeader("Authorization") String jwt, @PathVariable DoctorType doctorType) {
        try {
            jwtUtil.CheckTheJWT(jwt);
            return new ResponseEntity<>(adminService.getAllAppointmentsByDoctorType(doctorType), HttpStatus.OK);
        } catch (AdminSystemException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/patient/{patientId}/appointment/{appointmentId}")
    public ResponseEntity<String> addAppointmentToPatient(@RequestHeader("Authorization") String jwt, @PathVariable int patientId, @PathVariable int appointmentId) {
        try {
            HttpHeaders headers = jwtUtil.CheckTheJWT(jwt);
            adminService.addAppointmentToPatient(patientId, appointmentId);
            return new ResponseEntity<>("Appointment added to patient successfully", headers, HttpStatus.OK);
        } catch (AdminSystemException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/delete/patient/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<String> deletePatient(@RequestHeader("Authorization") String jwt, @PathVariable int id) {
        try {
            HttpHeaders headers = jwtUtil.CheckTheJWT(jwt);
            adminService.forceDeletePatient(id);
            return new ResponseEntity<>("Patient and associated appointments deleted successfully", headers, HttpStatus.NO_CONTENT);
        } catch (AdminSystemException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Invalid request", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/appointment/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<String> deleteAppointment(@RequestHeader("Authorization") String jwt, @PathVariable int id) {
        try {
            HttpHeaders headers = jwtUtil.CheckTheJWT(jwt);
            adminService.forceDeleteAppointment(id);
            return new ResponseEntity<>("Appointment deleted successfully", headers, HttpStatus.NO_CONTENT);
        } catch (AdminSystemException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Invalid request", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all/doctors")
    public ResponseEntity<List<DoctorType>> getAllDoctors(@RequestHeader("Authorization") String jwt) {
        try {
            jwtUtil.CheckTheJWT(jwt);
            return ResponseEntity.ok(adminService.getAllDoctors());
        } catch (AdminSystemException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}
