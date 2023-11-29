import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import { useState } from 'react'
import Header from "./Components/Header/Header";
import {Service} from "./Types";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import ServicePage from "./Pages/ServicPage/ServicePage";
import ServiceList from "./Pages/ServiceList/ServiceList";
import AboutPage from "./Pages/AboutPage/AboutPage";
import ContactsPage from "./Pages/ContactsPage/ContactsPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {
    const [selectedService, setSelectedService] = useState<Service | undefined>(undefined)

    return (
        <BrowserRouter basename="/books">

            <div className="App">

                <div className="wrapper">

                    <Header />

                    <div className={"content-wrapper"}>

                        <Breadcrumbs selectedService={selectedService} setSelectedService={setSelectedService}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/services" replace />} />

                            <Route path="/about" element={<AboutPage />} />

                            <Route path="/contacts" element={<ContactsPage />} />

                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/services" element={<ServiceList />} />

                            <Route path="/services/:id" element={<ServicePage selectedService={selectedService} setSelectedService={setSelectedService} />} />

                        </Routes>

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
