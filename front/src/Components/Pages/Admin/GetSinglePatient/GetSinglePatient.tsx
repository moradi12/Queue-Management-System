import { Typography } from "@mui/material";
import { PatientModel } from "../../../../Models/PatientModel";
import "./GetSinglePatient.css";
interface pattientProps{
    patient: PatientModel;
}

export function GetSinglePatient(props:pattientProps): JSX.Element {
    return (
        <div className="GetSinglePatient Box">
            <Typography variant="h5">{props.patient.firstName}{props.patient.lastName}</Typography>
            <p><b>Email:</b> {props.patient.email}</p>
            <p><b>phone:</b> {props.patient.phone}</p>

			
        </div>
    );
}
