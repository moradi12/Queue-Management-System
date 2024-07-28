import { useNavigate } from "react-router-dom";
import "./GetAllPatients.css";
import { PatientModel } from "../../../../Models/PatientModel";
import { useEffect, useState } from "react";
import { checkData } from "../../../../Utils/checkData";
import { Store } from "../../../../Redux/Store";
import { notify } from "../../../../Utils/notif";
import { UserType } from "../../../../Models/UserType";
import axiosJWT from "../../../../Utils/axiosJWT";
import { getAllPatientsAction } from "../../../../Redux/AdminReducer";

export function GetAllPatients(): JSX.Element {
    const navigate = useNavigate();
    const [patients, setPatients] = useState<PatientModel[]>([]);

    useEffect(() => {
        checkData();

        // Check user type and navigate if not admin
        const userType = Store.getState().auth.userType;
        if (userType !== UserType.ADMIN) {
            notify.error("You are not allowed");
            navigate("/login");
            return;
        }

        if (Store.getState().admin.patients.length <= 1) {
            // if store is empty
            axiosJWT.get("http://localhost:8080/api/admin/patients")
                .then(res => {
                    const receivedList: PatientModel[] = res.data.map((data: any) => new PatientModel(
                        data.id,
                        data.firstName,
                        data.lastName,
                        data.email,
                        data.phone,
                        data.password,
                    ));
                    // Update Redux store
                    Store.dispatch(getAllPatientsAction(receivedList));
                    setPatients(receivedList);
                })
                .catch(err => {
                    notify.error(err.message || "An error occurred");
                });
        } else {
            // Retrieve patients from Redux store
            setPatients(Store.getState().admin.patients);
        }
    }, [navigate]);

    return (
        <div className="GetAllPatients">
            {patients.length > 0 ? (
                <ul>
                    {patients.map(patient => (
                        <li key={patient.id}>
                            {patient.firstName} {patient.lastName} - {patient.email}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No patients found.</p>
            )}
        </div>
    );
}
