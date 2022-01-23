
const fs = require('fs');

const reqHandeler = (req, res) => {
    //console.log(req);

    res.setHeader('Contnet-Type', 'text/html');

    if (req.url === '/') {
        res.write(`<html>
                <head>
                    <title> Node Form  </title>
                </head>
                <body>
                    <h1>Node Form </h1>

                    <form action="/message" method="POST" > <input type="text" name="message"> <button type="submit">Submit</button> </input> </form>
                </body>
            </html>`
        );

        return res.end();
    }
    else if (req.url.includes("message") && req.method == "POST") {
        console.log(22);
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        let message = '';
        return req.on('end', () => {
            message = Buffer.concat(body).toString();
            message = message.split('=')[1];
            console.log(message);
            fs.writeFile("message.txt", message, err => {
                res.statusCode = 302;
                res.write(`<html>
                <head>
                    <title> Node demo </title>
                </head>
                <body>
                    <h1>Congracts! form submited</h1>
                    <p> Typed in message is `+ message + `</p>
                </body>
            </html>`);
                res.end();
            });



        })



        //res.setHeader('Location', '/')
        return res.end();
    }
    res.write(`<html>
                <head>
                    <title> Node demo </title>
                </head>
                <body>
                    <h1>Hello World! Welcome to Node Demo</h1>
                </body>
            </html>`);
    return res.end();
    console.log(req.url);
}

module.exports = reqHandeler;