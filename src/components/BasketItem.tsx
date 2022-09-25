import { Button, Stack } from "react-bootstrap"
import { useShoppingBasket } from "../context/ShoppingBasketContext"
import shopItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

type BasketItemProps = {
    id: number
    quantity: number
}

export function BasketItem({ id, quantity }: BasketItemProps) {

    const { increaseBasketQuantity, decreaseBasketQuantity, removeFromBasket } = useShoppingBasket()
    const item = shopItems.find(i => i.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        	  <img src={item.imgUrl} style={{ width: "75px", height: "55px", objectFit: "cover" }}/>
            <div className="me-auto">
                <div style={{ fontSize: ".9rem" }}>
                    {quantity}x <span>{item.name}{" "}</span>
                </div>
                <div className="text-muted" style={{ fontSize: ".7rem" }}>
                    Price per unit {formatCurrency(item.price)}
                </div>
            </div>
            <div style={{ fontSize: ".9rem" }}> {formatCurrency(item.price * quantity)}</div>
            <Button variant="success" size="sm"onClick={() => increaseBasketQuantity(item.id)}>+</Button>
            <Button variant="success" size="sm"onClick={() => decreaseBasketQuantity(item.id)}>-</Button>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromBasket(item.id)}>
                &times;
            </Button>
        </Stack>
    )
}
