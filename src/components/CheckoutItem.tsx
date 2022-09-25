import { Button, Stack } from "react-bootstrap"
import { useShoppingBasket } from "../context/ShoppingBasketContext"
import shopItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

type BasketItemProps = {
    id: number
    quantity: number
}

export function CheckoutItem({ id, quantity }: BasketItemProps) {

    const { removeFromBasket } = useShoppingBasket()
    const item = shopItems.find(i => i.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={3} className="d-flex align-items-center">
        	  {/* <img src={item.imgUrl} style={{ width: "95px", height: "75px", objectFit: "cover" }}/> */}
            <div className="me-auto">
                <div>
                    {quantity}x <span>{item.name}{" "}</span>
                </div>
                <div className="text-muted" style={{ fontSize: ".8rem" }}>
                    Price per unit {formatCurrency(item.price)}
                </div>
            </div>
            <div> {formatCurrency(item.price * quantity)}</div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromBasket(item.id)}>
                &times;
            </Button>
        </Stack>
    )
}
