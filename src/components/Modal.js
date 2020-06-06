import React from 'react';

const Modal = ({content,type,closeModal}) => {
        return (
            <div className="modal">
               <div className="modal-content">
                <div className="modal-body">
                    <i className="fa fa-times modal-close-icon" onClick={() => closeModal()}/>
                    {type ?
                        <React.Fragment>
                            <div className="modal-icon">
                                {type === "success" ?
                                    <i className="fa fa-check success"/>
                                    :
                                    <i className="fa fa-times failure"/>
                                }
                            </div>
                            <div className="modal-text">
                                {type}
                            </div>
                        </React.Fragment>
                        :
                        <div className="viewFile">
                            <div>
                                <h5>File Name: - </h5>
                                <span> {content.name}</span>
                            </div>
                            <div>

                            Link :
                                <a href={`http://localhost:8080/ipfs/`+content.fileHash} target={"_blank"} >View File</a>
                            </div>

                        </div>
                    }
                </div>
               </div>
            </div>
        );
}

export default Modal;