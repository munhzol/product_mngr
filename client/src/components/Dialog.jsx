import React from 'react';

const Dialog = props => {
    const cancel = e => {
        props.setActive(false);
    }
    return(
        <div className={props.active?"modal is-active":"modal" } >
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                <p className="modal-card-title">{props.title?props.title:''}</p>
                <button className="delete" aria-label="close" onClick={e=>props.setActive(false)} ></button>
                </header>
                <section className="modal-card-body">
                    {props.children}
                </section>
                <footer className="modal-card-foot">
                    <button className={props.btnClass?`button ${props.btnClass}`:'button'} onClick={props.btnAction?props.btnAction:cancel}>
                        {props.btnTitle?props.btnTitle:'OK'}
                    </button>
                    {props.cancel?<button className="button" onClick={e=>props.setActive(false)} >Cancel</button>:''}
                </footer>
            </div>
        </div>
    );
};

export default Dialog;