import React, { useState } from 'react';
import Sidebar from '../../components/manager/Sidebar';
import Header from '../../components/manager/Header';
import Dashboard from '../../components/manager/Dashboard';
import Movies from '../../components/manager/Movies';
import Screenings from '../../components/manager/Screenings';
import Staff from '../../components/manager/Staff';
import Bookings from '../../components/manager/Bookings';



const tabs = {
    dashboard: 'dashboard',
    movies: 'movies',
    screenings: 'screenings',
    staff: 'staff'
}

export default function Main() {
    const [tab, setTab] = useState(tabs.dashboard);
    const getTabContent = () => {
        switch (tab) {
            case 'dashboard':
                return <Dashboard />;
            case 'movies':
                return <Movies />;
            case 'screenings':
                return <Screenings />;
            case 'staff':
                return <Staff />;
            case 'bookings':
                return <Bookings />;
            default:
                return <Dashboard />;
        }
    }
    return (
        <div>
            <Header />
            <div className="relative flex flex-row h-screen w-screen">
                <Sidebar tab={tab} setTab={setTab} />
                <div className="w-full h-full lg:pl-82 lg:pt-22 pt-20 ">
                    {getTabContent()}
                </div>
            </div>
        </div>
    );
}