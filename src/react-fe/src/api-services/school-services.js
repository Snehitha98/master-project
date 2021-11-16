export class API {

    static updateSchool(school_id, body) {

        const formData = new FormData();
        formData.append('school_name', body.school_name);
        formData.append('state_name', body.state_name);

        return fetch(`http://127.0.0.1:8000/school/${school_id}/`, {
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

    static createSchool(body) {
        const formData = new FormData();
        formData.append('school_name', body.school_name);
        formData.append('state_name', body.state_name);

        return fetch(`http://127.0.0.1:8000/school-list/`, {
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

    static deleteSchool(school_id) {

        return fetch(`http://127.0.0.1:8000/school/${school_id}/`, {
            crossDomain: true,
            method: 'DELETE',
        })
    }
}

