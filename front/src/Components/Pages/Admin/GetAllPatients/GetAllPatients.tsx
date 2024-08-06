import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PatientModel } from "../../../../Models/PatientModel";
import { UserType } from "../../../../Models/UserType";
import { getAllPatientsAction } from "../../../../Redux/AdminReducer";
import { Store } from "../../../../Redux/Store";
import axiosJWT from "../../../../Utils/axiosJWT";
import { checkData } from "../../../../Utils/checkData";
import { notify } from "../../../../Utils/notif";
import { GetSinglePatient } from "../GetSinglePatient/GetSinglePatient";
import "./GetAllPatients.css";

export function GetAllPatients(): JSX.Element {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<PatientModel[]>([]);

  useEffect(() => {
    checkData();

    const userType = Store.getState().auth.userType;
    if (userType !== UserType.ADMIN) {
      notify.error("You are not allowed");
      navigate("/login");
      return;
    }
    if (Store.getState().admin.patients.length <= 1) {
      axiosJWT
        .get("http://localhost:8080/api/admin/patients")
        .then((res) => {
          const recievedList: PatientModel[] = res.data.map(
            (data: any) =>
              new PatientModel(
                data.id,
                data.firstName,
                data.lastName,
                data.email,
                data.phone,
                data.password
              )
          );
          Store.dispatch(getAllPatientsAction(recievedList));
          setPatients(Store.getState().admin.patients);
        })
        .catch((err) => {
          notify.error(err.message || "An error occurred");
          navigate("/login");
        });
    } else {
      setPatients(Store.getState().admin.patients);
    }
  }, []);

  return (
    <div className="AllPatients">
      {patients.map((item) => (
        <GetSinglePatient key={item.id} patient={item} />
      ))}
    </div>
  );
}
