import { Col, Row } from "react-bootstrap"
import { ShopItem } from "../components/ShopItem"
import shopItems from "../data/items.json"

export function Home() {
    return (
        <>
            <h1 style={{marginBottom:32}}>Online shop</h1>
            <Row lg={3} md={2} xs={1}  className="g-5">
                {shopItems.map(item => (
                    <Col key={item.id}>
                        <ShopItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}
