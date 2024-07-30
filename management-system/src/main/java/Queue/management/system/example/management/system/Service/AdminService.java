package Queue.management.system.example.management.system.Service;

import Queue.management.system.example.management.system.Beans.Appointment;
import Queue.management.system.example.management.system.Beans.AppointmentStatus;
import Queue.management.system.example.management.system.Beans.DoctorType;
import Queue.management.system.example.management.system.Beans.Patient;
import Queue.management.system.example.management.system.Exceptions.AdminExceptions.AdminErrMsg;
import Queue.management.system.example.management.system.Exceptions.AdminExceptions.AdminSystemException;
import Queue.management.system.example.management.system.Repo.AppointmentRepo;
import Queue.management.system.example.management.system.Repo.PatientRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AppointmentRepo appointmentRepo;
    private final PatientRepo userRepo;

    public boolean adminLogin(String email, String password) throws AdminSystemException {
        Patient user = userRepo.findByEmailAndPassword(email, password);
        if (user == null) {
            throw new AdminSystemException(AdminErrMsg.USER_NOT_FOUND);
        }
        return true;
    }

    @Transactional
    public void forceDeletePatient(int id) throws AdminSystemException {
        Patient patient = userRepo.findById(id).orElseThrow(() ->
                new AdminSystemException(AdminErrMsg.USER_NOT_FOUND));

        // This will automatically delete associated appointments due to cascading
        userRepo.delete(patient);
    }

//    @Transactional
//    public void forceDeleteAppointment(int id) throws AdminSystemException {
//        Appointment appointment = appointmentRepo.findById(id).orElseThrow(() ->
//                new AdminSystemException(AdminErrMsg.APPOINTMENT_NOT_FOUND));
//
//        // Remove the reference to the appointment from the associated patient
//        Patient patient = appointment.getPatient();
//        if (patient != null) {
//            patient.getAppointments().remove(appointment);
//            userRepo.save(patient);
//        }
//
//        appointmentRepo.deleteById(id);
//    }

    @Transactional
    public void forceDeleteAppointment(int id) throws AdminSystemException {
        Appointment appointment = appointmentRepo.findById(id).orElseThrow(() ->
                new AdminSystemException(AdminErrMsg.APPOINTMENT_NOT_FOUND));

        // Remove the reference to the appointment from the associated patient
        Patient patient = appointment.getPatient();
        if (patient != null) {
            patient.getAppointments().remove(appointment);
            appointment.setPatient(null); // Ensure the bidirectional relationship is handled
            userRepo.save(patient);
        }

        appointmentRepo.delete(appointment); // Ensure we delete the actual entity
    }



    public Patient getSinglePatient(int patientId) throws AdminSystemException {
        return userRepo.findById(patientId).orElseThrow(() ->
                new AdminSystemException(AdminErrMsg.USER_NOT_FOUND));
    }

    public void addPatients(Patient patients) throws AdminSystemException {
        if (userRepo.existsById(patients.getId())) {
            throw new AdminSystemException(AdminErrMsg.PATIENT_ALREADY_EXISTS);
        }
        userRepo.save(patients);
    }

    public void updatePatients(Patient updatedPatient) throws AdminSystemException {
        Patient existingPatient = userRepo.findById(updatedPatient.getId()).orElseThrow(() ->
                new AdminSystemException(AdminErrMsg.USER_NOT_FOUND));

        existingPatient.setFirstName(updatedPatient.getFirstName());
        existingPatient.setLastName(updatedPatient.getLastName());
        existingPatient.setEmail(updatedPatient.getEmail());
        existingPatient.setPassword(updatedPatient.getPassword());
        existingPatient.setPhone(updatedPatient.getPhone());

        userRepo.saveAndFlush(existingPatient);
    }

    public List<Patient> getAllPatients() {
        return userRepo.findAll();
    }



    // New method to cancel an appointment for a patient
    public void cancelAppointment(int patientId, int appointmentId) throws AdminSystemException {
        Patient patient = userRepo.findById(patientId).orElseThrow(() -> new AdminSystemException(AdminErrMsg.USER_NOT_FOUND));
        Appointment appointment = appointmentRepo.findById(appointmentId).orElseThrow(() -> new AdminSystemException(AdminErrMsg.APPOINTMENT_NOT_FOUND));

        if (!patient.getAppointments().contains(appointment)) {
            throw new AdminSystemException(AdminErrMsg.APPOINTMENT_NOT_FOUND);
        }

        patient.getAppointments().remove(appointment);
        userRepo.saveAndFlush(patient);

        // Update the appointment status to indicate it is canceled
        appointment.setAppointmentStatus(AppointmentStatus.CANCELLED);
        appointmentRepo.saveAndFlush(appointment);
    }

    public List<Appointment> getAllAppointments() throws AdminSystemException {
        return appointmentRepo.findAll();
    }

//    public void updateAppointment(Appointment appointment) throws AdminSystemException {
//        if (!appointmentRepo.existsById(appointment.getId())) {
//            throw new AdminSystemException(AdminErrMsg.APPOINTMENT_NOT_FOUND);
//        }
//        appointmentRepo.saveAndFlush(appointment);
//    }


//    @Transactional
//    public void updateAppointment(Appointment appointment) throws AdminSystemException {
//        Appointment existingAppointment = appointmentRepo.findById(appointment.getId()).orElseThrow(() ->
//                new AdminSystemException(AdminErrMsg.APPOINTMENT_NOT_FOUND));
//
//        // Update the fields of the existing appointment
//        existingAppointment.setAppointmentDate(appointment.getAppointmentDate());
//        existingAppointment.setAppointmentStatus(appointment.getAppointmentStatus());
//        existingAppointment.setDoctorType(appointment.getDoctorType());
//
//        appointmentRepo.saveAndFlush(existingAppointment);
//    }

    public Appointment updateAppointment(Appointment appointment) throws AdminSystemException {
        Optional<Appointment> existingAppointmentOpt = appointmentRepo.findById(appointment.getId());
        if (!existingAppointmentOpt.isPresent()) {
            throw new AdminSystemException(AdminErrMsg.APPOINTMENT_NOT_FOUND);
        }

        Appointment existingAppointment = existingAppointmentOpt.get();
        existingAppointment.setAppointmentDateTime(appointment.getAppointmentDateTime());
        existingAppointment.setAppointmentStatus(appointment.getAppointmentStatus());
        existingAppointment.setDoctorType(appointment.getDoctorType());

        return appointmentRepo.saveAndFlush(existingAppointment);
    }




    public void createAppointment(Appointment appointment) throws AdminSystemException {
        if (appointmentRepo.existsById(appointment.getId())) {
            throw new AdminSystemException(AdminErrMsg.APPOINTMENT_ALREADY_EXISTS);
        }
        appointmentRepo.save(appointment);
    }

    public List<Appointment> getAllAppointmentsByDoctorType(DoctorType doctorType) throws AdminSystemException {
        try {
            return appointmentRepo.findAllByDoctorType(doctorType);
        } catch (Exception e) {
            throw new AdminSystemException(AdminErrMsg.APPOINTMENT_NOT_FOUND);
        }
    }

    public void addAppointmentToPatient(int patientId, int appointmentId) throws AdminSystemException {
        Patient patient = userRepo.findById(patientId).orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        Appointment appointment = appointmentRepo.findById(appointmentId).orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
        patient.getAppointments().add(appointment);
        userRepo.saveAndFlush(patient);
    }

    public Appointment getSingleAppointment(int appointmentId) throws AdminSystemException {
        return appointmentRepo.findById(appointmentId).orElseThrow(() ->
                new AdminSystemException(AdminErrMsg.APPOINTMENT_NOT_FOUND));
    }

    public List<DoctorType> getAllDoctors() throws AdminSystemException {
        try {
            return Arrays.asList(DoctorType.values());
        } catch (Exception e) {
            throw new AdminSystemException(AdminErrMsg.DOCTOR_TYPE_NOT_FOUND);
        }
    }
}
