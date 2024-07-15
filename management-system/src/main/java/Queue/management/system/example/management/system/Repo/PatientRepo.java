package Queue.management.system.example.management.system.Repo;

import Queue.management.system.example.management.system.Beans.DoctorType;
import Queue.management.system.example.management.system.Beans.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatientRepo extends JpaRepository<Patient,Integer> {
    Patient findByEmailAndPassword(String email, String password);
    void deleteById(int id);
    Boolean existsByEmailAndPassword(String email, String password);
    Boolean existsByEmail(String email);
    Optional<Patient> findByEmail(String email);
}
