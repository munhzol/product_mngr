import React,{ useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

import Dialog from './Dialog'

const Products = () => {

    const [products, setProducts] = useState([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [productId, setProductId] = useState(0);

    const [showProductDetailDialog, setShowProductDetailDialog] = useState(false);
    const [productDetail, setProductDetail] = useState({});

    useEffect(()=>{
        loadProducts();
    }, []);
    
    const loadProducts = () => {
        axios.get('http://localhost:8000/api/products')
            .then(response=>setProducts(response.data));
    }

    const showDelete = (e,id) => {
        e.preventDefault();
        setShowDeleteDialog(true);
        setProductId(id);
    };

    const deleteProduct = (e) => {
        axios({
            method:'DELETE',
            url:`http://localhost:8000/api/products/${productId}`
        }).then(()=>loadProducts());
        setShowDeleteDialog(false);
    };

    const viewDetail = (e,product) => {
        e.preventDefault();
        setShowProductDetailDialog(true);
        setProductDetail(product);
    };
    
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
                                    <a href="!#" onClick={e=>viewDetail(e,rw)}>{rw.title}</a>
                                </td>
                                <td>
                                    ${rw.price}
                                </td>
                                <td>
                                    {rw.description}
                                </td>
                                <td>
                                    <Link to={`/forms/${rw._id}`}>Edit</Link> &nbsp;
                                    <a href="!#" onClick={e=>showDelete(e,rw._id)}>Delete</a>
                                    {/* <Link to={`/delete/${rw._id}`}>Delete</Link> */}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            
                
            <Dialog title="Confirm delete?" btnClass="is-danger" cancel="true" btnTitle="" btnAction={deleteProduct} active={showDeleteDialog} setActive={setShowDeleteDialog}>
                Do you really want delete this product?
            </Dialog>

            <Dialog title="Product Detail" btnClass="is-info" active={showProductDetailDialog} setActive={setShowProductDetailDialog}>
                <p>
                {productDetail.title}
                </p>
                <p>
                {productDetail.price}
                </p>
                <p>
                {productDetail.description}
                </p>
            </Dialog>


        </div>
        
    </div>
  );
};

export default Products;