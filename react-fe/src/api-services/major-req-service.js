export class MRAPI {

    static updateMajorReq(major_req_id, body) {

        const formData = new FormData();
        formData.append('description', body.description);
        formData.append('major_id', body.major_id);

        return fetch(`http://127.0.0.1:8000/major-requirement/${major_req_id}/`, {
            crossDomain: true,
            method: 'PUT',
            body: formData
        }).then(resp => resp.json())
    }

    static createMajorReq(body) {
        const formData = new FormData();
        formData.append('description', body.description);
        formData.append('major_id', body.major_id);

        return fetch(`http://127.0.0.1:8000/major-requirement-list/`, {
            crossDomain: true,
            method: 'POST',
            body: formData
        }).then(resp => resp.json())

    }

    static deleteMajorReq(major_req_id) {

        return fetch(`http://127.0.0.1:8000/major-requirement/${major_req_id}/`, {
            crossDomain: true,
            method: 'DELETE',
        })
    }
}

