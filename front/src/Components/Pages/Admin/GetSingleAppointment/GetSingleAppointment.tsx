import { Appointment } from "../../../../Models/Appointment";
import logo from "../../../../../Asset/doctor.jpg";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import "./GetSingleAppointment.css";

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
            <div className="updateAppointment Box" onClick={()=>{
                navigate(`/update/appointment/${props.appointemnt.id}`); }}>
                    <Typography variant="h6">Update Appointment</Typography>
            </div>
            </div>
        </div>
    );
}