import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import  { Redirect } from 'react-router-dom';


const RemoveData = () => {


    const [tmp, settmp] = useState('');

    const handleRemoveData = (event) => {
        event.preventDefault();
        fetch("http://127.0.0.1:8000/remove-data/", {
            redirect: 'follow',
            crossDomain: true,
             method: 'POST',
        }).then((response) =>  {
            console.log(response.ok)
            if (response.ok) {
                settmp('tt');
            }
        })
    }

    const handleNo = () => {
        if(tmp === ''){
            settmp('tt');
        }
    }

    return (
        tmp === '' ?
        <>
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title id='example-modal-sizes-title-lg'>Click 'yes' to clear the database</Modal.Title>
            </Modal.Header>
       <Modal.Body>
        <form>
            <button type="submit" onClick={handleRemoveData} > Yes </button>&nbsp;&nbsp;
            <button type="submit" onClick={handleNo}> No </button>
        </form>
        </Modal.Body>
        </Modal.Dialog>
        </>
        :
        <Redirect to='/' />
    );
}

export default RemoveData;