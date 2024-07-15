import React, { useEffect, useState } from 'react';
import './Main.css';
import { MainRoute } from '../../route/MainRoute/MainRoute';
import { Appointment } from '../../../Models/Appointment';
import axios from 'axios';

export function Main(): JSX.Element {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/admin/appointments")
            .then(response => response.data)
            .then(data => setAppointments(data))
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="Main">
            <MainRoute />
        </div>
    );
}
