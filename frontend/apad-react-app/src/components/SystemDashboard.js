import '../App.css';
import React, { useState} from "react";
import Table from './Table';

export const SystemDashboard = () => {
    return (
        <>
            <div className="App">
                <header className="App-header">    
                    <h1>System Dashboard</h1>
                    <Table/> 
                </header>
            </div>
        </>
    )
}

