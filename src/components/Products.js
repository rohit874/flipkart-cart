import ProductData from '../data.json';
import Product from './Product';

function Products() {
    let products = ProductData;
       
    return (
        <div className="products_parent">
            <div>
            <h3 className="products_heading">Clothing And Accessories</h3>
            <div className="products">
                {
                    products.length ? products.map((data)=>{
                        return(
                            <Product key={data.id} data={data} />
                        )
                    })

                :<h3 className="no_product">No Product found</h3>}
            </div>
            </div>
        </div>
    )
}

export default Products
