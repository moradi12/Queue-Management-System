import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { AddAppointmentToPatients } from "../../Pages/Admin/AddAppointmentToPatients/AddAppointmentToPatients";
import { Page404 } from "../../Pages/Page404/Page404";
import { AddPatients } from "../../Pages/Admin/AddPatients/AddPatients";
import { GetAllPatients } from "../../Pages/Admin/GetAllPatients/GetAllPatients";
import { GetAllAppointmentsByDoctorType } from "../../Pages/Admin/GetAllAppointmentsByDoctorType/GetAllAppointmentsByDoctorType";
import { GetSinglePatient } from "../../Pages/Admin/GetSinglePatient/GetSinglePatient";
import { DeleteAppointment } from "../../Pages/Admin/DeleteAppointment/DeleteAppointment";
import { DeletePatients } from "../../Pages/Admin/DeletePatients/DeletePatients";
import { AddAppointments } from "../../Pages/Admin/AddAppointments/AddAppointments";
import { Login } from "../../Pages/Login/Login"; // Importing the Login component
import { AllAppointments } from "../../Pages/Admin/AllAppointments/AllAppointments";

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
        <Route path="/delete/appointment/:id" element={<DeleteAppointment />} />
        {/* <Route path="/update/appointment/:id" element={<UpdateAppointment />} /> */}
        <Route path="/delete/patients/:id" element={<DeletePatients />} />
        <Route path="/get/single/patient/:id" element={<GetSinglePatient />} />
        <Route path="/login" element={<Login />} /> {/* Added the Login route */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
