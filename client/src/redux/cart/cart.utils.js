export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );
    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity +1 }
            : cartItem
        )
    };
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    );
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    };
    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
}

export const combineCarts = (cartItems, cartItemsToCombine) => {
    const cartItemsMap = Object.fromEntries(cartItems.map(cartItem => [cartItem.id, cartItem]));
    const cartItemsToCombineMap = Object.fromEntries(cartItemsToCombine.map(cartItem => [cartItem.id, cartItem]));
    for (let key in cartItemsToCombineMap) {
        if (cartItemsMap[key]) {
            cartItemsMap[key].quantity = cartItemsMap[key].quantity + cartItemsToCombineMap[key].quantity;
        }
    }
    const combine = {...cartItemsToCombineMap, ...cartItemsMap};
    const combineArray = Object.keys(combine).map(key => combine[key]);
    return combineArray;
}