import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { AddAppointmentToPatients } from "../../Pages/Admin/AddAppointmentToPatients/AddAppointmentToPatients";
import { Page404 } from "../../Pages/Page404/Page404";
import { AddPatients } from "../../Pages/Admin/AddPatients/AddPatients";
import { GetAllPatients } from "../../Pages/Admin/GetAllPatients/GetAllPatients";
import { DeleteAppointment } from "../../Pages/Admin/DeleteAppointment/DeleteAppointment";
import { DeletePatients } from "../../Pages/Admin/DeletePatients/DeletePatients";
import { AddAppointments } from "../../Pages/Admin/AddAppointments/AddAppointments";
import { AllAppointments } from "../../Pages/Admin/AllAppointments/AllAppointments";
import { Register } from "../../Pages/Register/Register";
import { Login } from "../../Pages/Login/Login";
import { GetAllAppointmentsByDoctorType } from "../../Pages/Admin/GetAllAppointmentsByDoctorType/GetAllAppointmentsByDoctorType";
import { UpdateAppointment } from "../../Pages/Admin/UpdateAppointment/UpdateAppointment";

export function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<AllAppointments />} />
        <Route path="/add" element={<AddAppointments />} />
        <Route path="/add/appointment/to/patients" element={<AddAppointmentToPatients />} />
        <Route path="/add/patients" element={<AddPatients />} />
        <Route path="/all/patients" element={<GetAllPatients />} />
        <Route path="/all/appointments/by/doctor" element={<GetAllAppointmentsByDoctorType />} />
        <Route path="/update/appointment/:id" element={<UpdateAppointment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
