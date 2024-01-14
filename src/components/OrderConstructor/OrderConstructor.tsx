import "./OrderConstructor.sass"
import {useOrder} from "../../hooks/orders/useOrder";
import {Link} from "react-router-dom";

const OrderConstructor = () => {

    const {order} = useOrder()

    if (order == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Корзина</span>
            </div>
        )
    }

    return (
        <Link to={`/orders/${order.id}`} className={"constructor-container " + (order.services.length > 0 ? " .disabled" : "")}>
            <span className="title">Корзина</span>
        </Link>
    )
}

export default OrderConstructor