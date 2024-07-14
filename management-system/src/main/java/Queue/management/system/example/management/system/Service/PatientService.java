package Queue.management.system.example.management.system.Service;

import Queue.management.system.example.management.system.Beans.*;
import Queue.management.system.example.management.system.Exceptions.AdminExceptions.AdminErrMsg;
import Queue.management.system.example.management.system.Exceptions.AdminExceptions.AdminSystemException;
import Queue.management.system.example.management.system.Exceptions.PatientExceptions.PatientErrMsg;
import Queue.management.system.example.management.system.Exceptions.PatientExceptions.PatientSystemException;
import Queue.management.system.example.management.system.Repo.AppointmentRepo;
import Queue.management.system.example.management.system.Repo.PatientRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final AppointmentRepo appointmentRepo;
    private final PatientRepo patientRepo;
    private final AdminService adminService;

    public Patient patientLogin(String email, String password) throws PatientSystemException {
        Patient patient = patientRepo.findByEmailAndPassword(email, password);
        if (patient == null) {
            throw new PatientSystemException(PatientErrMsg.PATIENT_NOT_FOUND);
        }
        return patient;
    }

    public boolean isPatientExist(String email, String password) throws PatientSystemException {
        if (!patientRepo.existsByEmailAndPassword(email, password)) {
            throw new PatientSystemException(PatientErrMsg.PATIENT_NOT_FOUND);
        }
        return true;
    }

    @Transactional
    public void addPatient(Patient newPatient) throws PatientSystemException {
        if (patientRepo.existsByEmail(newPatient.getEmail())) {
            throw new PatientSystemException(PatientErrMsg.PATIENT_ALREADY_EXISTS);
        }
        patientRepo.save(newPatient);
    }

    @Transactional
    public void cancelAppointment(int patientId, int appointmentId) throws PatientSystemException {
        Patient patient = patientRepo.findById(patientId).orElseThrow(() -> new PatientSystemException(PatientErrMsg.PATIENT_NOT_FOUND));
        Appointment appointment = appointmentRepo.findById(appointmentId).orElseThrow(() -> new PatientSystemException(PatientErrMsg.APPOINTMENT_NOT_FOUND));

        if (!patient.getAppointments().contains(appointment)) {
            throw new PatientSystemException(PatientErrMsg.APPOINTMENT_NOT_FOUND);
        }

        patient.getAppointments().remove(appointment);
        patientRepo.saveAndFlush(patient);

        appointment.setAppointmentStatus(AppointmentStatus.CANCELLED);
        appointmentRepo.saveAndFlush(appointment);
    }

    @Transactional
    public void makeAppointment(int patientId, int appointmentId) throws PatientSystemException, AdminSystemException {
        Patient patient = patientRepo.findById(patientId)
                .orElseThrow(() -> new PatientSystemException(PatientErrMsg.PATIENT_NOT_FOUND));
        Appointment appointment = appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new PatientSystemException(PatientErrMsg.APPOINTMENT_NOT_FOUND));

        if (patient.getAppointments().contains(appointment)) {
            throw new PatientSystemException(PatientErrMsg.APPOINTMENT_ALREADY_EXISTS);
        }
        if (appointment.getAppointmentDate().before(Date.valueOf(LocalDate.now()))) {
            throw new PatientSystemException(PatientErrMsg.DATE_ERROR);
        }

        patient.getAppointments().add(appointment);
        patientRepo.saveAndFlush(patient);

        appointment.setPatient(patient);
        appointmentRepo.saveAndFlush(appointment);
    }

    public List<Appointment> getAllPatientAppointments(int id) throws PatientSystemException {
        Patient patient = patientRepo.findById(id).orElseThrow(() -> new PatientSystemException(PatientErrMsg.PATIENT_NOT_FOUND));
        return patient.getAppointments();
    }

    public List<Appointment> getPatientAppointmentsByDoctorType(int patientId, DoctorType doctorType) throws PatientSystemException {
        Patient patient = patientRepo.findById(patientId).orElseThrow(() -> new PatientSystemException(PatientErrMsg.PATIENT_NOT_FOUND));
        return patient.getAppointments().stream()
                .filter(appointment -> appointment.getDoctorType() == doctorType)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updatePatient(Patient updatedPatient) throws AdminSystemException {
        Patient existingPatient = patientRepo.findById(updatedPatient.getId()).orElseThrow(() ->
                new AdminSystemException(AdminErrMsg.USER_NOT_FOUND));

        existingPatient.setFirstName(updatedPatient.getFirstName());
        existingPatient.setLastName(updatedPatient.getLastName());
        existingPatient.setEmail(updatedPatient.getEmail());
        existingPatient.setPassword(updatedPatient.getPassword());
        existingPatient.setPhone(updatedPatient.getPhone());

        patientRepo.saveAndFlush(existingPatient);
    }

    @Transactional
    public void deleteAppointment(int id) throws PatientSystemException {
        Appointment appointment = appointmentRepo.findById(id).orElseThrow(() ->
                new PatientSystemException(PatientErrMsg.APPOINTMENT_NOT_FOUND));

        Patient patient = appointment.getPatient();
        if (patient != null) {
            patient.getAppointments().remove(appointment);
            patientRepo.save(patient);
        }

        appointmentRepo.delete(appointment);
    }
}
