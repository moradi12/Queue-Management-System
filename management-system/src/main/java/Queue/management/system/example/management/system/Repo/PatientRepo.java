package Queue.management.system.example.management.system.Repo;

import Queue.management.system.example.management.system.Beans.DoctorType;
import Queue.management.system.example.management.system.Beans.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepo extends JpaRepository<Patient,Integer> {
    Patient findByEmailAndPassword(String email, String password);
    List<Patient> findByEmail(String email);
    void deleteById(int id);
    Boolean existsByEmailAndPassword(String email, String password);
    Boolean existsByEmail(String email);

}
