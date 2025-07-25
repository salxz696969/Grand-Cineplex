import React, { useState } from 'react';
import Sidebar from '../../components/manager/Sidebar';
import Header from '../../components/manager/Header';
import Dashboard from '../../components/manager/Dashboard';
import Movies from '../../components/manager/Movies';
import Screenings from '../../components/manager/Screenings';
import Staff from '../../components/manager/Staff';
import Bookings from '../../components/manager/Bookings';
import Theaters from '../../components/manager/Theaters';



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
            case 'theaters':
                return <Theaters />;
            default:
                return <Dashboard />;
        }
    }
    return (
        <div className='bg-gray-950'>
            <Header />
            <div className="relative flex flex-row min-h-screen w-screen overflow-y-auto overflow-x-hidden">
                <Sidebar tab={tab} setTab={setTab} />
                <div className="w-full  lg:pl-88 lg:pt-30   lg:pr-6 px-4 pt-26 pb-28">
                    {getTabContent()}
                </div>
            </div>
        </div>
    );
}