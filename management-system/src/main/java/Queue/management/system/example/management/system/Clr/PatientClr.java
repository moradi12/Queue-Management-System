package Queue.management.system.example.management.system.Clr;

import Queue.management.system.example.management.system.Exceptions.AdminExceptions.AdminSystemException;
import Queue.management.system.example.management.system.Exceptions.PatientExceptions.PatientSystemException;
import Queue.management.system.example.management.system.Service.AdminService;
import Queue.management.system.example.management.system.Service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

//@Component
@Order(2)
@RequiredArgsConstructor
public class PatientClr implements CommandLineRunner {

    private final AdminService adminService;
    private final PatientService patientService;

    @Override
    public void run(String... args) throws Exception {
        try {
            // Making an appointment
//            patientService.MakingAppointment(2, 1);
//            System.out.println("Appointment added successfully.");
            patientService.makeAppointment(2, 4);


            patientService.getAllPatientAppointments(2).forEach(System.out::println);


        } catch (PatientSystemException | AdminSystemException e) {
            System.err.println("Error occurred: " + e.getMessage());
        }


    }
}
