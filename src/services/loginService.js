
// the function returns token if login is valid
// else returns message if phonenumber or password is wrong
// else returns null if there's error with the request

    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ "phonenumber": phoneNumber, "password": password });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      const login = fetch("http://catalogue.cubesolutions.tn:5112/api/v1/users/login", requestOptions)
        .then(response => response.json())

export default login