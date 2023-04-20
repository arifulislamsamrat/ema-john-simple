import { getShoppingCart } from "../utilities/fakedb";

const cartProuctsLoader =async()=>{
    const loadedProducts =await fetch('products.json');
    const products =await loadedProducts.json();

    //if cart data is in database u have to use async await

    const storedCart =getShoppingCart();
    const savedCart = [];
    console.log(storedCart)
    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity=quantity;
            savedCart.push(addedProduct);
        }
    }
    //if u need to send two things 
    // return [products,savedCart]
    // another option 
    // return {products,cart:savedCart}

    // console.log(products);
    return savedCart;

}
export default cartProuctsLoader;