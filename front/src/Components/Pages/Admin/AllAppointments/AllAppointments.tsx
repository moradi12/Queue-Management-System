import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appointment } from "../../../../Models/Appointment";
import { checkData } from "../../../../Utils/checkData";
import axiosJWT from "../../../../Utils/axiosJWT";
import { Store } from "../../../../Redux/Store";
import { allAppointmentsAction } from "../../../../Redux/AdminReducer";
import { GetSingleAppointment } from "../GetSingleAppointment/GetSingleAppointment";
import { UserType } from "../../../../Models/UserType";
import { notify } from "../../../../Utils/notif";

export function AllAppointments(): JSX.Element {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkData();

    if (Store.getState().auth.userType !== UserType.ADMIN) {
      navigate("/");
      notify.error("You are not authorized to view this page.");
      return;
    }

    const appointmentsFromStore = Store.getState().admin.appointments;
    if (appointmentsFromStore && appointmentsFromStore.length > 0) {
      setAppointments(appointmentsFromStore);
    } else {
      // Getting information from backend
      axiosJWT
        .get("http://localhost:8080/api/admin/appointments")
        .then((res) => {
          const receivedList: Appointment[] = res.data.map(
            (item: any) =>
              new Appointment(
                item.id,
                item.appointmentDate,
                item.appointmentStatus,
                item.doctorType
              )
          );
          Store.dispatch(allAppointmentsAction(receivedList));
          setAppointments(receivedList);
        })
        .catch((err) => {
          navigate("/login");
        });
    }
  }, []);

  return (
    <div className="AllAppointments">
      {appointments.map((item) => (
        <GetSingleAppointment key={item.id} appointemnt={item} />
      ))}
    </div>
  );
}
