import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addAppointmentToPatientAction } from "../../../../Redux/AdminReducer";
import { Store } from "../../../../Redux/Store";
import axiosJWT from "../../../../Utils/axiosJWT";
import { notify } from "../../../../Utils/notif";
import { GetAllPatients } from "../GetAllPatients/GetAllPatients";
import "./AddAppointmentToPatients.css";


export function AddAppointmentToPatients(): JSX.Element {

  const [patientId, setId] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const getData = () => {

    if (id) {
      const appointment = Store.getState().admin.appointments.find(
        (item) => item.id === +id );
      if (appointment) {
        axiosJWT
          .post(  `http://localhost:8080/api/admin/patient/appointment/${patientId}/${appointment.id}`
          )
          .then((res) => {
            Store.dispatch(addAppointmentToPatientAction(res.data));
            notify.success("Appointment added to Patient");
          })
          .catch((err) => {
            notify.error("Cannot add appointment to patient");
            navigate("/login");
          });
      } else {
        console.log("Appointment not found for ID:", id);
      }
    } else {
      console.log("No ID provided for the appointment");
    }
    navigate("/");
  };

  return (
    <div className="AddAppointmentToPatient Box">
      <TextField
        label="Patient ID"
        onChange={(args) => setId(+args.target.value)}
      />
      <Button variant="contained" onClick={getData}>
        submit
      </Button>
      <hr />
      {<GetAllPatients />}
    </div>
  );
}
