import React from 'react';
var Modal = require('react-bootstrap').Modal;

//https://5c507d49471426000887a6a7--react-bootstrap.netlify.com/components/modal/

export default class GenericModal extends React.Component {

    onSubmit = () => {
        this.props.okFunction();
        // this.props.onHide();
    }
    onCancel = () => {
        this.props.cancelFunction();
        // this.props.onHide();
    }
    render() {
        return (
            <div className={this.props.divClass && this.props.divClass}>
                
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    bsSize="large" // sm || lg (width only) default is medium but now parameter
                    backdrop='static' //to control outside click
                    keyboard={!!this.props.offEscKey ? false : true} //on ESC key close
                    enforceFocus = {false}
                >
                    <Modal.Header closeButton= 'true' className = {this.props.headerClass}>
                        <Modal.Title componentClass='h2'>
                            { this.props.modalTitle}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body componentClass='div' bsClass={this.props.bodyClass}>
                    { this.props.body}
                    </Modal.Body>
                    {this.props.isFooterVisible && 
                        <Modal.Footer className =  {this.props.footerClass}> 
                        <button id="cancelModal" className="btn cancel-button-view" onClick={this.onCancel}>{this.props.cancelBtnLable}</button>
                        <button id="submitModal" className="btn btn-warning" onClick={this.onSubmit}>{this.props.actionBtnlabel}</button>
                    </Modal.Footer>
                    }
                    
                </Modal>
            </div>
        )
        }
}  

