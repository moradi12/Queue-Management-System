import { Route, Routes } from "react-router-dom";
import { AddAppointments } from "../../Pages/Admin/AddAppointments/AddAppointments";
import { AddAppointmentToPatients } from "../../Pages/Admin/AddAppointmentToPatients/AddAppointmentToPatients";
import { AddPatients } from "../../Pages/Admin/AddPatients/AddPatients";
import { AllAppointments } from "../../Pages/Admin/AllAppointments/AllAppointments";
import { GetAllAppointmentsByDoctorType } from "../../Pages/Admin/GetAllAppointmentsByDoctorType/GetAllAppointmentsByDoctorType";
import { GetAllPatients } from "../../Pages/Admin/GetAllPatients/GetAllPatients";
import { UpdateAppointment } from "../../Pages/Admin/UpdateAppointment/UpdateAppointment";
import { Login } from "../../Pages/Login/Login";
import { Page404 } from "../../Pages/Page404/Page404";
import { Register } from "../../Pages/Register/Register";
import "./MainRoute.css";

export function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<AllAppointments />} />
        <Route path="/add" element={<AddAppointments />} />
        <Route path="/add/appointment/to/patients/:id" element={<AddAppointmentToPatients />} />
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
