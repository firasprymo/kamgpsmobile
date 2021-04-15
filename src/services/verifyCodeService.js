export const verifyCode = (phoneNumber, code) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "phonenumber": phoneNumber, "code": code });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://catalogue.cubesolutions.tn:5112/api/v1/users/codeVerification", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.message == "votre compte est confirme!") {
                return ('valid')
            }
            else {
                return ('invalid')
            }
        })
        .catch(error => {
            return null
            console.log('error', error)
        });
}