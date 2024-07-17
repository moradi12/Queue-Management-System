import React, { useState } from "react";
import { Appointment } from "../../../../Models/Appointment";
import "./UpdateAppointment.css";

interface UpdateAppointmentProps {
    appointmentData: Appointment;
    onUpdate: (updatedAppointment: Appointment) => void;
}

export function UpdateAppointment({ appointmentData, onUpdate }: UpdateAppointmentProps): JSX.Element {
    const [formData, setFormData] = useState<Appointment>(appointmentData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <div className="UpdateAppointment">
            <form onSubmit={handleSubmit}>
                <label>
                    ID:
                    <input type="text" name="id" value={formData.id} disabled />
                </label>
                <label>
                    Date:
                    <input type="text" name="appointmentDate" value={formData.formatAppointmentDate()} onChange={handleChange} />
                </label>
                <label>
                    Status:
                    <input type="text" name="appointmentStatus" value={formData.appointmentStatus} onChange={handleChange} />
                </label>
                <label>
                    Doctor Type:
                    <select name="doctorType" value={formData.doctorType} onChange={handleChange}>
                        <option value="FAMILY_MEDICINE">Family Medicine</option>
                        <option value="DERMATOLOGIST">Dermatologist</option>
                        <option value="HEMATOLOGIST">Hematologist</option>
                        <option value="CARDIOLOGIST">Cardiologist</option>
                        <option value="NEUROLOGIST">Neurologist</option>
                    </select>
                </label>
                <button type="submit">Update Appointment</button>
            </form>
        </div>
    );
}
