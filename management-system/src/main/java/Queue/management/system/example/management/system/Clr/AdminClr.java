package Queue.management.system.example.management.system.Clr;

import Queue.management.system.example.management.system.Beans.Appointment;
import Queue.management.system.example.management.system.Beans.AppointmentStatus;
import Queue.management.system.example.management.system.Beans.DoctorType;
import Queue.management.system.example.management.system.Beans.Patient;
import Queue.management.system.example.management.system.Service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Component
@Order(1)
@RequiredArgsConstructor
public class AdminClr implements CommandLineRunner {
    private final AdminService adminService;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("------- Admin Test -------");
        try {
            adminService.addPatients(Patient.builder()
                    .firstName("Tamir")
                    .lastName("Moradi")
                    .email("tamir.moradi@gmail.com")
                    .password("123456789")
                    .phone("0523355516")
                    .build());

            adminService.addPatients(Patient.builder()
                    .firstName("Shani")
                    .lastName("Aharonson")
                    .email("Shani.Shani@gmail.com")
                    .password("123456789")
                    .phone("0544959740")
                    .build());

            // יצירת פגישה חדשה
            Appointment appointment = Appointment.builder()
                    .appointmentDate(Timestamp.valueOf(LocalDateTime.of(2025, 12, 12, 11, 11)))
                    .doctorType(DoctorType.CARDIOLOGIST)
                    .appointmentStatus(AppointmentStatus.CONFIRMED)
                    .build();
            adminService.createAppointment(appointment);

            Appointment appointment2 = Appointment.builder()
                    .appointmentDate(Timestamp.valueOf(LocalDateTime.of(2023, 11, 11, 11, 11)))
                    .doctorType(DoctorType.FAMILY_MEDICINE)
                    .appointmentStatus(AppointmentStatus.CONFIRMED)
                    .build();

            Appointment appointment3 = Appointment.builder()
                    .appointmentDate(Timestamp.valueOf(LocalDateTime.of(2023, 10, 10, 10, 10)))
                    .doctorType(DoctorType.DERMATOLOGIST)
                    .appointmentStatus(AppointmentStatus.CONFIRMED)
                    .build();

            Appointment appointment4 = Appointment.builder()
                    .appointmentDate(Timestamp.valueOf(LocalDateTime.of(2023, 9, 9, 9, 9)))
                    .doctorType(DoctorType.NEUROLOGIST)
                    .appointmentStatus(AppointmentStatus.CONFIRMED)
                    .build();


            adminService.createAppointment(appointment2);
            adminService.createAppointment(appointment3);
            adminService.createAppointment(appointment4);
            adminService.addAppointmentToPatient(1, appointment2.getId());
            adminService.addAppointmentToPatient(2, appointment3.getId());
            adminService.addAppointmentToPatient(2, appointment4.getId());


            adminService.addAppointmentToPatient(1, appointment.getId());

            Patient patient = Patient.builder()
                    .firstName("sdsds")
                    .lastName("nanananana")
                    .email("sdsds@gmail.com")
                    .password("0555555")
                    .phone("55555")
                    .build();

            System.out.println("_________________________________________________");

            adminService.addPatients(patient);

            adminService.getAllPatients().forEach(System.out::println);

            System.out.println("all appointments");

            // הדפסת כל הפגישות
            adminService.getAllAppointments().forEach(System.out::println);

        } catch (Exception err) {
            System.out.println(err.getMessage());
        }
    }
}
