import { Appointment } from "../../../../Models/Appointment";
import "./GetSingleAppointment.css";

interface GetSingleAppointmentProps {
    appointmentData: Appointment;
}

export function GetSingleAppointment({ appointmentData }: GetSingleAppointmentProps): JSX.Element {
    return (
        <div className="GetSingleAppointment">
            <p>ID: {appointmentData.id}</p>
            <p>Date: {appointmentData.formatAppointmentDate()}</p>
            <p>Status: {appointmentData.appointmentStatus}</p>
            <p>Doctor Type: {appointmentData.doctorType}</p>
        </div>
    );
}
