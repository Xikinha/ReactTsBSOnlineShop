import { useNavigate } from 'react-router-dom';
import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingBasket } from "../context/ShoppingBasketContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { BasketItem } from "./BasketItem";
import shopItems from "../data/items.json";

type ShoppingBasketProps = {
    isOpen: boolean
}

export function ShoppingBasket({ isOpen }: ShoppingBasketProps) {

    const { closeBasket, basketItems } = useShoppingBasket();

    const navigate = useNavigate();
    const navigateToCheckout = () => {
        navigate('/checkout');
        closeBasket();
    };
    
    return (
        <Offcanvas show={isOpen} onHide={closeBasket} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping basket</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={2}>
                    {basketItems.map(item => (
                        <BasketItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Subtotal{" "}
                        {formatCurrency(
                            basketItems.reduce((total, basketItem) => {
                                const item = shopItems.find(i => i.id === basketItem.id)
                                return total + (item?.price || 0) * basketItem.quantity
                            }, 0)
                        )}
                    </div>
                    <div className="ms-auto text-muted" style={{ fontSize: ".7rem" }}><span className="fw-bold">Free delivery</span> from {formatCurrency(50)} in Belgium</div>
                </Stack>
                <div className="mt-3 text-center">
                    <Button variant="warning" onClick={navigateToCheckout}>Proceed to Checkout</Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
