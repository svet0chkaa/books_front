import "./ServicePage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iServicesMock, requestTime} from "../../Consts";
import {Service} from "../../Types";
import mockImage from "/src/assets/mock.png"

const ServicePage = ({ selectedService, setSelectedService }: { selectedService:Service | undefined, setSelectedService: Dispatch<Service| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/services/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const service: Service = await response.json()

            setSelectedService(service)

            setIsMock(false)
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedService(iServicesMock.find((service:Service) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/services/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img} />

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{selectedService?.name}</h2>

                    <br />

                    <span className="description">{selectedService?.description}</span>

                </div>

            </div>

        </div>
    )
}

export default ServicePage;