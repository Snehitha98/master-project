import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import  { Redirect } from 'react-router-dom';

const ImportFile = () => {

    const [file, setFile] = useState('');
    const [tmp, settmp] = useState('');

    const onFileChange = event => { setFile(event.target.files[0]) }


    const handleUploadfile = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', file );
        fetch("http://127.0.0.1:8000/import", {
            redirect: 'follow',
            crossDomain: true,
             method: 'POST',
             body: data
        }).then((response) =>  {
            console.log(response.ok)
            if (response.ok) {
                settmp('tt');
            }
        })
    }

    return (
        tmp === '' ?
        <>
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title id='example-modal-sizes-title-lg'>Import a spreadsheet</Modal.Title>
            </Modal.Header>
       <Modal.Body>
        <form>
            <input type="file" name="document" onChange={onFileChange}/>
            <button type="submit" onClick={handleUploadfile} > Import </button>
        </form>
        </Modal.Body>
        </Modal.Dialog>
        </>
        :
        <Redirect to='/' />
    );
}

export default ImportFile;