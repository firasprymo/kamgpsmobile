export function register(email, username, password, repassword, phoneNumber, address) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "name": username,
        "password": password,
        "role": "admin",
        "passwordConfirm": repassword,
        "phonenumber": phoneNumber,
        "address": address
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://catalogue.cubesolutions.tn:5112/api/v1/users/signup", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status == 'fail') {
                if (result.errors.statusCode == 410) {
                    return ("account already exist")
                }
                else {
                    return ('Invalid input data')
                }
            } else if (result.status == 'success') {
                return ('success')
            }

        })
        .catch(error => {
            console.log('error', error)
            return null
        });
}