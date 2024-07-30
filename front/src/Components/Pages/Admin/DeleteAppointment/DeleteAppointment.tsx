import { useEffect, useState } from "react";
import "./DeleteAppointment.css";
import { useNavigate } from "react-router-dom";
import { Store } from "../../../../Redux/Store";
import { UserType } from "../../../../Models/UserType";
import { checkData } from "../../../../Utils/checkData";
import { TextField, Typography, Button, ButtonGroup } from "@mui/material";
import axiosJWT from "../../../../Utils/axiosJWT";
import { deleteAppointmentAction } from "../../../../Redux/AdminReducer";
import { notify } from "../../../../Utils/notif";

export function DeleteAppointment(): JSX.Element {
  const [appointmentId, setAppointmentId] = useState(""); // Use a descriptive name for state
  const navigate = useNavigate();

  useEffect(() => {
    // Check user authorization and navigate if not admin
    try {
      checkData();
      if (Store.getState().auth.userType !== UserType.ADMIN) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during data check:", error);
      notify.error("Authorization check failed.");
    }
  }, [navigate]);

  const handleDelete = () => {
    // Delete appointment using promises
    checkData(); // Ensure valid session before proceeding
    axiosJWT
      .delete(`http://localhost:8080/api/admin/delete/appointment/${appointmentId}`)
      .then(() => {
        Store.dispatch(deleteAppointmentAction(Number(appointmentId)));
        notify.success("Appointment deleted successfully");
        navigate("/");
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        notify.error("Failed to delete appointment");
      });
  };

  return (
    <div className="DeleteAppointment">
      <Typography variant="h6" gutterBottom>
        Delete Appointment
      </Typography>
      <br />
      <TextField
        label="Appointment ID"
        variant="outlined"
        value={appointmentId}
        onChange={(e) => setAppointmentId(e.target.value)} // Update state with input value
        fullWidth
      />
      <br />
      <ButtonGroup variant="contained" fullWidth>
        <Button type="button" color="success" onClick={handleDelete}>
          Delete Appointment
        </Button>
        <Button type="button" color="error" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  );
}
