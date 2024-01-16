import "./ServiceList.sass"
import React, {useEffect, useState} from "react";
import ServiceCard from "./ServiceCard/ServiceCard";
import {iServicesMock, requestTime} from "../../Consts";
import {Service} from "../../Types";
import {FaSearch} from "react-icons/fa";

const ServiceList = () => {

    const [services, setServices] = useState<Service[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchServices = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8000/api/services/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const services = raw.services

            setServices(services)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setServices(iServicesMock.filter(service => service.name.toLowerCase().includes(query)))

    }

    useEffect(() => {
        searchServices()
    }, [])

    const cards = services.map(service  => (
        <ServiceCard service={service} key={service.id} isMock={isMock}/>
    ))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await searchServices()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={handleSubmit}>

                <h2>Поиск работ издательства</h2>

                <div className="right-container">
                    <input
                        type="text"
                        placeholder="Поиск..."
                        name="query"
                        autoComplete="off"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <button type="submit">
                        <FaSearch className={"search-icon"}/>
                    </button>
                </div>

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default ServiceList;