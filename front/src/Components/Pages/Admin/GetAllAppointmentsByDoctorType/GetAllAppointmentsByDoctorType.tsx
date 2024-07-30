import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Appointment } from "../../../../Models/Appointment";
import { getAppointmentsByDoctorAction } from "../../../../Redux/AdminReducer";
import { GetSingleAppointment } from "../GetSingleAppointment/GetSingleAppointment";
import { DoctorType } from "../../../../Models/DoctorType";
import axiosJWT from "../../../../Utils/axiosJWT";
import { Store } from "../../../../Redux/Store";
import { Button, ButtonGroup, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { checkData } from "../../../../Utils/checkData";
import { UserType } from "../../../../Models/UserType";
import { notify } from "../../../../Utils/notif";

export function GetAllAppointmentsByDoctorType(): JSX.Element {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<DoctorType>(DoctorType.FAMILY_MEDICINE);
  const [appointment, setAppointment] = useState<Appointment[]>([]);

  useEffect(() => {
    checkData();
    if (Store.getState().auth.userType !== UserType.ADMIN) {
      navigate("/all");
      notify.error("You are not authorized to view this page.");
    }
  }, [navigate]);

  const getData = () => {
    axiosJWT
      .get(`http://localhost:8080/api/admin/appointments/${doctor}`)
      .then((res) => {
        Store.dispatch(getAppointmentsByDoctorAction(res.data));
        setAppointment(res.data);
      })
      .catch((error) => {
        console.error("Failed to get appointments by doctor type:", error);
        navigate("/login");
      });
  };

  return (
    <div className="GetAllAppointmentsByDoctorType">
      <div className="Box">
        <Typography variant="h6" gutterBottom>
          Choose Doctor
        </Typography>
        <Grid item xs={12}>
          <TextField
            select
            value={doctor}
            label="Doctor Type"
            onChange={(args) => setDoctor(args.target.value as DoctorType)}
          >
            {Object.values(DoctorType).map((doctor) => (
              <MenuItem key={doctor} value={doctor}>
                {doctor}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <br /> <br />
        <hr />
        <ButtonGroup>
          <Button onClick={getData} color="primary" variant="contained">
            Search
          </Button>
          <Button onClick={() => navigate("/")} color="secondary" variant="contained">
            Cancel
          </Button>
        </ButtonGroup>
      </div>
      <hr />
      <div className="appointmentList">
        {appointment.length > 0 ? (
          appointment.map((item) => <GetSingleAppointment key={item.id} appointment={item} />) // Corrected prop name
        ) : (
          <Typography variant="body1">No appointments found for the selected doctor</Typography>
        )}
      </div>
    </div>
  );
}
