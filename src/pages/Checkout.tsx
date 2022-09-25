import { useNavigate } from 'react-router-dom';
import { Stack, Button } from "react-bootstrap";
import { useShoppingBasket } from "../context/ShoppingBasketContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CheckoutItem } from "../components/CheckoutItem";
import shopItems from "../data/items.json";

export function Checkout() {

    const { basketItems, basketQuantity } = useShoppingBasket();

    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    };

    const subtotal = basketItems.reduce((total, basketItem) => {
        const item = shopItems.find(i => i.id === basketItem.id)
        return total + (item?.price || 0) * basketItem.quantity
    }, 0)

    let shipping = 6.90;
    if(subtotal > 50) {
        shipping -= 6.90;
    }  

    const total = subtotal + shipping;

    return (
        <>
            <h1>Checkout</h1>
            <div className="d-flex flex-column align-items-center">
                <h4 className="w-50">Order summary</h4>
                {basketQuantity == 0 && (
                    <div className="w-50">
                        <p>Your shopping basket is empty.</p>
                    </div>
                )}
                {basketQuantity > 0 && (
                    <div className="w-50">
                        <Stack gap={2}>
                            {basketItems.map(item => (
                                <CheckoutItem key={item.id} {...item} />
                            ))}
                            <div className="ms-auto fs-6">
                                Subtotal{" "}
                                {formatCurrency(subtotal)}
                            </div>
                            <div className="ms-auto fs-6">Shipping costs{" "}
                                {formatCurrency(shipping)}
                            </div>
                            <div className="ms-auto fw-bold fs-5">TOTAL incl. VAT{" "}
                                {formatCurrency(total)}
                            </div>
                        </Stack>
                        <div className="mt-4 text-center">
                            <Button variant="warning" onClick={navigateHome}>Order</Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
