// This is the API service class to DIY different front end function calls
export default class APIService{

    //API service call for user sign up
    static AddUsers(body){
        var address ="/api/adduser"
        return fetch(address, {
            'method': 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        }).then(response=>response.json())
        .catch(error => console.log(error))
    }

    static CreateProject(body){
        var address = "/api/makeproject"
        return fetch(address, {
            'method': 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        }).then(response=>response.json())
        .catch(error => console.log(error))
    }

    static GetResources() {
        var address = "/api/getresources"
        return (fetch(address)
        .then(response=> response.json())
        .catch(error => console.log(error))
        )
    }

    static CheckIn(body){
        var address = "/api/checkin"
        return fetch(address, {
            'method':'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        }).then(response=>response.json())
        .catch(error => console.log(error))
    }

    static CheckOut(body){
        var address = "/api/checkout"
        return fetch(address, {
            'method':'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        }).then(response=>response.json())
        .catch(error => console.log(error))
    }

    static AccessProject(proj_id){
        var address = "/api/getproj"
        return fetch(address+"/"+proj_id)
        .then(response=>response.json())
        .catch(error => console.log(error))
    }

}