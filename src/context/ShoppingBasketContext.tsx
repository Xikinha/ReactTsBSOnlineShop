import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingBasket } from "../components/ShoppingBasket"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingBasketProviderProps = {
    children: ReactNode
}

type BasketItem = {
    id: number
    quantity: number
}

type ShoppingBasketContext = {
    openBasket: () => void
    closeBasket: () => void
    getItemQuantity: (id: number) => number
    increaseBasketQuantity: (id: number) => void
    decreaseBasketQuantity: (id: number) => void
    removeFromBasket: (id: number) => void
    basketQuantity: number
    basketItems: BasketItem[]
}

const ShoppingBasketContext = createContext({} as ShoppingBasketContext)

export function useShoppingBasket() {
    return useContext(ShoppingBasketContext)
}
export function ShoppingBasketProvider({ children }: ShoppingBasketProviderProps) {
    
    const [isOpen, setIsOpen] = useState(false)
    const [basketItems, setBasketItems] = useLocalStorage<BasketItem[]>("shopping-cart", [])

    const basketQuantity = basketItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

    const openBasket = () => setIsOpen(true)
    const closeBasket = () => setIsOpen(false)

    const getItemQuantity = (id: number) => {
        return basketItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseBasketQuantity = (id: number) => {
        setBasketItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, { id, quantity: 1 }]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseBasketQuantity = (id: number) => {
        setBasketItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromBasket = (id: number) => {
        setBasketItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingBasketContext.Provider
            value={{
                getItemQuantity,
                increaseBasketQuantity,
                decreaseBasketQuantity,
                removeFromBasket,
                openBasket,
                closeBasket,
                basketItems,
                basketQuantity,
            }}
        >
            {children}
            <ShoppingBasket isOpen={isOpen} />
        </ShoppingBasketContext.Provider>
    )
}
