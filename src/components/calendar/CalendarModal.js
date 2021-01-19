import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const CalendarModal = () => {
    const [isOpen, setIsOpen] = useState(true)
    const closeModal = () => {
        console.log('closinggg');
        setIsOpen(false)
    }
    return (
        <Modal 
        isOpen={isOpen}
        //onAfterOpen={}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="ola"
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-background"

        >
            <h1>hola</h1>
            <span onClick={() => setIsOpen(false)}>&times;</span>
            <hr/>
        </Modal>
    )
};

export default CalendarModal;
