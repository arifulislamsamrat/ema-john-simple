import React, { useEffect, useState } from 'react';
import  './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const  [products,setProducts] = useState([]);
    const [cart,setCart]=useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(res=>res.json())
        .then(data=>setProducts(data))

    },[]);
  useEffect(() => {
    const storedCart =getShoppingCart();

    const savedCart =[];

    //step 1: get id of the added Product
    for(const id in storedCart){
        // step02: get the products state by using id 
        const addedProduct =products.find(product => product.id ===id);
        console.log('added product',addedProduct)
        if(addedProduct){
            //step 03 :add quantity
            const quantity =storedCart[id];
            addedProduct.quantity =quantity;
            //step4 :: add the added product to the saved cart
            savedCart.push(addedProduct);
        }
    }
    //step 05 set the cart
    setCart(savedCart)
  },[products])
    const handleAddToCart=(product)=>{
        // cart.push(product)
        const newCart =[...cart,product];
        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    ></Product>)
                }
                

            </div>
            <div className="cart-container">
                <Cart
                cart={cart}
                ></Cart>
                
            </div>
            
        </div>
    );
};

export default Shop;