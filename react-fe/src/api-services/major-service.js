export class MajorAPI {

    static updateMajor(major_id, body) {

        const formData = new FormData();
        formData.append('major_name', body);

        return fetch(`http://127.0.0.1:8000/major/${major_id}/`, {
            crossDomain: true,
            method: 'PUT',
            body: formData
        }).then(resp => resp.json())
            .then(
                resp => {
                    console.log(resp)
                    return resp;
                },
                err => console.log(err))

    }

    static createMajor(body) {
        const formData = new FormData();
        formData.append('major_name', body);

        return fetch(`http://127.0.0.1:8000/major-list/`, {
            crossDomain: true,
            method: 'POST',
            body: formData
        }).then(resp => resp.json())
            .then(
                resp => {
                    console.log(resp)
                    return resp;
                },
                err => console.log(err))

    }

    static deleteMajor(major_id) {

        return fetch(`http://127.0.0.1:8000/major/${major_id}/`, {
            crossDomain: true,
            method: 'DELETE',
        })
    }
}

