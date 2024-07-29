import { Appointment } from "../../../../Models/Appointment";
import logo from "../../../../../Asset/doctor.jpg";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import "./GetSingleAppointment.css";
import axiosJWT from "../../../../Utils/axiosJWT";
import { deleteAppointmentAction } from "../../../../Redux/AdminReducer";
import { Store } from "../../../../Redux/Store";
import { notify } from "../../../../Utils/notif";

interface appointmentProps{
    appointemnt:Appointment;
}

export function GetSingleAppointment(props:appointmentProps): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="SingleAppointment Box">
            <div className="Grid-Parent">          
			<div className="Grid-Child">
                {/* <img src={logo} width={100}/> */}
            </div>
            <div className="Grid-Child"> 
                <h1>{props.appointemnt.doctorType}</h1>
                <p> When? {props.appointemnt.appointmentDate.toString()}</p>
                <p> Status? {props.appointemnt.appointmentStatus}</p>
            </div>
            <div className="updateAppointment " onClick={()=>{
                <br/>
                navigate(`/update/appointment/${props.appointemnt.id}`); }}>
                    <Button variant="contained" color="info">Update Appointment</Button>
                    </div>
            <div className="delete" onClick={()=>axiosJWT.delete(`http://localhost:8080/delete/appointment/${props.appointemnt.id}`)
        .then(res=>{
            Store.dispatch(deleteAppointmentAction(res.data))
            notify.success("Appointment deleted successfully.");
            navigate("/all");
        })
        .catch(err=>{notify.error("cannot delete appointment")})}>
                    <Button variant="contained" color="error">Delete Appointment</Button>
            </div>
            </div>
        </div>
    );
}