import React from 'react';

const Modal = ({type,closeModal}) => {
        return (
            <div className="modal">
               <div className="modal-content">
                <div className="modal-body">
                    <i className="fa fa-times modal-close-icon" onClick={() => closeModal()} />
                    <div className="modal-icon">
                        {type === "success" ?
                        <i className="fa fa-check success" />
                        :
                        <i className="fa fa-times failure" />
                        }
                    </div>
                    <div className="modal-text">
                        {type}
                    </div>
                </div>
               </div>
            </div>
        );
}

export default Modal;