package Queue.management.system.example.management.system.Repo;

import Queue.management.system.example.management.system.Beans.Appointment;
import Queue.management.system.example.management.system.Beans.DoctorType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepo extends JpaRepository<Appointment, Integer> {
    List<Appointment> findAllByDoctorType(DoctorType doctorType);
    List<Appointment> findByPatientId(int patientId);
    void deleteById(int id);
}
