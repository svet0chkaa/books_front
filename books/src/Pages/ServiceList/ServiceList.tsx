import "./ServiceList.sass"
import SearchBar from "./SearchBar/SearchBar";
import {useEffect, useState} from "react";
import ServiceCard from "./ServiceList/ServiceCard";
import {iServicesMock, requestTime} from "../../Consts";
import {Service} from "../../Types";

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

            const services: Service[] = await response.json()

            setServices(services)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setServices(iServicesMock)

    }

    useEffect(() => {
        searchServices()
    }, [query])

    const cards = services.map(service  => (
        <ServiceCard service={service} key={service.id} isMock={isMock}/>
    ))

    return (
        <div className="cards-list-wrapper">

            <div className="top">

                <h2>Поиск сервисов</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </div>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default ServiceList;