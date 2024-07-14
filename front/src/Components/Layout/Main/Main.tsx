import React from 'react';
import './Main.css';
import { MainRoute } from '../../route/MainRoute/MainRoute';

export function Main(): JSX.Element {
    return (
        <div className="Main">
            <MainRoute />
        </div>
    );
}
