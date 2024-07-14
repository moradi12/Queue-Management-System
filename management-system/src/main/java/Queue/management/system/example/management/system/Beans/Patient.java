package Queue.management.system.example.management.system.Beans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName;

    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String password;


    @Enumerated(EnumType.STRING)
    @JsonIgnore
    @Transient
    private DoctorType doctorType;


    @ManyToMany
    @JoinTable(name = "patient_appointment", joinColumns = @JoinColumn(name = "patient_id"), inverseJoinColumns = @JoinColumn(name = "appointment_id")
    )
    private List<Appointment> appointments;
}