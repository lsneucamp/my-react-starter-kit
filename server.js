const os = require('os')
const express = require('express')
const session = require('express-session')
const axios = require('axios')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()



// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
const CLIENT_ID = process.env.CLIENT_ID
const SECRET = process.env.SECRET
const AUTHORIZATION = new Buffer(`${CLIENT_ID}:${SECRET}`).toString('base64')

//curl acme:acmesecret@localhost:9999/uaa/oauth/token \
//-d grant_type=authorization_code \
//-d client_id=acme \
//-d redirect_uri=http://example.com \
//-d code=$CODE -s | jq .

const options = {
    host: `http://${os.hostname()}:9999/`,
    token_path: 'oauth/token',
    authorization_path: 'oauth/authorize',
    grant_type: 'authorization_code',
    response_type: 'code',
    redirect_uri: `http://${os.hostname()}:8080/auth`,
    scope: 'read write'
}

// serve static assets normally
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: SECRET,
    name: CLIENT_ID,
    proxy: true,
    resave: true,
    saveUninitialized: true
}))

var token_key = ""

app.get('/login', function (req, res) {
    var URL =  `${options.host}${options.authorization_path}`
    URL += `?response_type=${options.response_type}&client_id=${CLIENT_ID}`
    URL += `&redirect_uri=${options.redirect_uri}&scope=${options.scope}`
    URL += `&state=${encodeBase64(req.session.id||'')}`
    console.log(URL)
    res.redirect(URL)
})

encodeBase64 = (string) => {
    console.log(string)
    console.log('----------')
    console.log(new Buffer(string,"ascii").toString('base64'))
    return  new Buffer(string,"ascii").toString('base64')
}

decodeBase64 = (string) => {
    return  new Buffer(string,'base64').toString("ascii")
}

app.get('/auth', function (req, res) {
    const state = req.query.state||''
    if(decodeBase64(state)!==req.session.id)
        return res.redirect('/error')


    axios({
        method: 'post',
        params: {
            code:req.query.code||'',
            grant_type: "authorization_code",
            scope: "read write",
            client_id: CLIENT_ID,
            redirect_uri:options.redirect_uri
        },
        headers: {
            "Authorization": `Basic ${AUTHORIZATION}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json;charset=UTF-8"
        },
        url: `${options.host}${options.token_path}`
    }) .then(function (response) {
            res.cookie('token_key', encodeBase64(JSON.stringify(response.data)), { expires: 0, httpOnly: false });
            res.redirect('/');
        })
        .catch(function (response) {
            res.redirect('/error');
        });

})

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})




app.listen(port)
console.log("server started on port " + port)