import { Button, Card } from "react-bootstrap"
import { useShoppingBasket } from "../context/ShoppingBasketContext"
import { formatCurrency } from "../utilities/formatCurrency"

import {IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';

type ShopItemProps = {
    id: number
    name: string
    price: number
    amount: string
    description: string
    imgUrl: string
}

export function ShopItem({ id, name, price, amount, description, imgUrl }: ShopItemProps) {
    const {
        getItemQuantity,
        increaseBasketQuantity,
        decreaseBasketQuantity,
        removeFromBasket,
    } = useShoppingBasket()

    const quantity = getItemQuantity(id)

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit: "cover" }}/>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4 fs-3">
                    {name}
                </Card.Title>
                <Card.Text className="d-flex justify-content-between">
                    {amount}
                    <span className="ms-2 fw-bold">{formatCurrency(price)}</span>
                </Card.Text>
                <Card.Text className="fs-6 text-muted">
                    {description}
                </Card.Text>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" variant="warning" onClick={() => increaseBasketQuantity(id)}><AddShoppingCart /></Button>
                    ) : (
                        <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                                <Button variant="success" onClick={() => decreaseBasketQuantity(id)}>-</Button>
                                <div>
                                  <span className="fs-5">{quantity}</span> in basket
                                </div>
                                <Button variant="success" onClick={() => increaseBasketQuantity(id)}>+</Button>
                            </div>
                            <Button onClick={() => removeFromBasket(id)} variant="outline-danger" size="sm">Remove</Button>
                        </div>
                    )}
                </div>  
            </Card.Body>
        </Card>
    )
}
