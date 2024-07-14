import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { GetAllAppointments } from "../../Pages/Admin/src/Components/GetAllAppointments/GetAllAppointments";
import { AddAppointments } from "../../Pages/Admin/src/Components/AddAppointments/AddAppointments";
import { AddAppointmentToPatients } from "../../Pages/Admin/src/Components/AddAppointmentToPatients/AddAppointmentToPatients";
import { Page404 } from "../../Pages/Page404/Page404";
import { AddPatients } from "../../Pages/Admin/src/Components/AddPatients/AddPatients";
import { GetAllPatients } from "../../Pages/Admin/src/Components/GetAllPatients/GetAllPatients";
import { GetAllAppointmentsByDoctorType } from "../../Pages/Admin/src/Components/GetAllAppointmentsByDoctorType/GetAllAppointmentsByDoctorType";
import { GetSinglePatient } from "../../Pages/Admin/src/Components/GetSinglePatient/GetSinglePatient";
import { UpdateAppointments } from "../../Pages/Admin/src/Components/UpdateAppointments/UpdateAppointments";
import { DeleteAppointment } from "../../Pages/Admin/src/Components/DeleteAppointment/DeleteAppointment";
import { DeletePatients } from "../../Pages/Admin/DeletePatients/DeletePatients";

export function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<GetAllAppointments />} />
        <Route path="/add" element={<AddAppointments />} />
        <Route path="/add/appointment/to/patients" element={<AddAppointmentToPatients />} />
        <Route path="/add/patients" element={<AddPatients />} />
        <Route path="/all/patients" element={<GetAllPatients />} />
        <Route path="/all/appointments/by/doctor" element={<GetAllAppointmentsByDoctorType />} />
        <Route path="/delete/appointment/:id" element={<DeleteAppointment />} />
        <Route path="/delete/patients/:id" element={<DeletePatients />} />
        <Route path="/get/single/appointment/:id" element={<GetAllAppointments />} />
        <Route path="/get/single/patient/:id" element={<GetSinglePatient />} />
        <Route path="/update/appointments/:id" element={<UpdateAppointments />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
