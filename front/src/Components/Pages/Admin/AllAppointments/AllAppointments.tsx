import { useNavigate } from "react-router-dom";
import { Appointment } from "../../../../Models/Appointment";
import "./AllAppointments.css";
import { useEffect, useState } from "react";
import axiosJWT from "../../../../Utils/axiosJWT";
import { Store } from "../../../../Redux/Store";
import { checkData } from "../../../../Utils/checkData";

export function AllAppointments(receivedList: Appointment[]): JSX.Element {
    const [appointments, setAppointment] = useState<Appointment[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        checkData();
        if (Store.getState().admin.appointments.length === 0) {
            axiosJWT.get(`http://localhost:8080/api/admin/appointments`)
                .then(res => {
                    let receivedList: Appointment[] = [];
                    for (let counter = 0; counter < res.data.length; counter++) {
                        receivedList.push(new Appointment(
                            res.data[counter].id,
                            res.data[counter].appointmentDate,
                            res.data[counter].appointmentStatus,
                            res.data[counter].doctorType));
                    }
                    setAppointment(receivedList);
                    Store.dispatch(AllAppointments(receivedList));
                })
                .catch(err => {
                    navigate("/login");
                });
        } else {
            setAppointment(Store.getState().admin.appointments);
        }
    }, [navigate]);

    return (
        <div className="AllAppointments">
            {/* Add your JSX code here */}
        </div>
    );
}
