import React,{ useEffect,useState } from 'react';
import axios from 'axios';
import { Link,navigate } from '@reach/router';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [productId, setProductId] = useState(0);

    useEffect(()=>{
        loadProducts();
    }, []);
    
    const loadProducts = () => {
        axios.get('http://localhost:8000/api/products')
            .then(response=>setProducts(response.data));
    }

    const showDelete = (e,id) => {
        setShowDeleteDialog(true);
        setProductId(id);
    };

    const deleteProduct = (e) => {
        axios({
            method:'DELETE',
            url:`http://localhost:8000/api/products/${productId}`
        }).then(()=>loadProducts());
        setShowDeleteDialog(false);
    }
    
  return (
    <div>
        <div className="container">

            <section className="hero is-medium is-primary is-bold">
                <div className="hero-body">
                    <div className="container">
                    <h1 className="title">
                        Product manager
                    </h1>
                    <h2 className="subtitle">
                        Products list
                    </h2>
                    </div>
                </div>
            </section>

            <div className="is-3" style={{margin:"20px auto"}}>
                <Link to="/forms/0"><button className="button is-primary">Add</button></Link>
            </div>

            <table className="table is-bordered is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th className="row">
                            #
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            &nbsp;
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((rw,i) => 
                            <tr key={i}>
                                <td>
                                    {i+1}
                                </td>
                                <td>
                                    {rw.title}
                                </td>
                                <td>
                                    ${rw.price}
                                </td>
                                <td>
                                    {rw.description}
                                </td>
                                <td>
                                    <Link to={`/forms/${rw._id}`}>Edit</Link> &nbsp;
                                    <a onClick={e=>showDelete(e,rw._id)}>Delete</a>
                                    {/* <Link to={`/delete/${rw._id}`}>Delete</Link> */}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            
            <div className={showDeleteDialog?'modal  is-active':'modal'}>
                <div className="modal-background"></div>
                <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Delete a record</p>
                    <button className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    Do you want delete this product?
                </section>
                <footer className="modal-card-foot is-centered">
                    <button onClick={e=>deleteProduct(e)}  className="button is-danger">Delete</button>
                    <button onClick={e=>setShowDeleteDialog(false)} className="button is-narrow">Cancel</button>
                </footer>
                </div>
            </div>

        </div>
        
    </div>
  );
};

export default Products;