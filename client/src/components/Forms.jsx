import React,{ useEffect,useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

const Forms = props => {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [errValid, setErrValid] = useState({});
    const [cmd, setCmd] = useState('add');

    useEffect(()=>{
        if(props.id!=='0') {
            setCmd('edit');
            axios.get(`http://localhost:8000/api/products/${props.id}`)
                .then(response=>{
                    setTitle(response.data.title);
                    setPrice(response.data.price);
                    setDescription(response.data.description);
                });
        }
    }, []);

    const submit = e => {
        e.preventDefault();
        axios({
            method: cmd==='add'?'post':'put',
            url: `http://localhost:8000/api/products/${(cmd==='add')?'':props.id}`,
            data: {
                title: title,
                price: price,
                description: description
            }
        }).then(resp=>{
            if(resp.data.errors){
                setErrValid(resp.data.errors);
            } else {
                navigate('/');
            }}
        );

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
                        {cmd==='add'?'Add':'Edit'} a product
                    </h2>
                    </div>
                </div>
            </section>


            <form onSubmit={submit} style={{margin:"20px auto"}}>
                
                <div className="field">
                    <div className="control">
                        <label htmlFor="title">Title</label>
                        <input className="input is-primary" onChange={e=>setTitle(e.target.value)} id="title" value={title} type="text" placeholder="Title"/>
                        {errValid.title?<p className="has-text-danger">{errValid.title.message}</p>:''}
                    </div>
                </div>
            
                <div className="field">
                    <div className="control">
                        <label htmlFor="price">Price</label>
                        <input className="input is-primary" type="number" onChange={e=>setPrice(e.target.value)} id="price" value={price} placeholder="Price"/>
                        {errValid.price?<p className="has-text-danger">{errValid.price.message}</p>:''}
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <label htmlFor="description">Description</label>
                        <input className="input is-primary" onChange={e=>setDescription(e.target.value)} id="description" value={description} type="text" placeholder="Description"/>
                        {errValid.description?<p className="has-text-danger">{errValid.description.message}</p>:''}
                    </div>
                </div>

                <div className="is-3" style={{margin:"20px auto"}}>
                    <button type="submit" className="button is-primary">Save</button> &nbsp;

                    <Link to="/">
                        <button className="button is-warning">Cancel</button>
                    </Link>
                </div>
            </form>

        </div>
        
    </div>
  );
};

export default Forms;