
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;

//server starting
app.get("/", (req, res) => {

    res.status(200).send("Engine Started, Ready to take off!");

})

//mailing the file....


app.post("/api/mail", function (request, response) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'carrie.harvey67@ethereal.email',
            pass: 'Qnv7W9JaErjhNyuhsK'
        }
    });
   
    const mail = {
        from: `${request.body.from}`, // sender address
        to: `${request.body.to}`, // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
        subject: `${request.body.sub}`, // Subject line
        attachments: [{   // stream as an attachment
          filename: 'test.docx',
          content: './storage/test.docx'
        }]
    };

    // send mail with defined transport object
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            console.log(err);
            response.json({
                message: "message not sent: an error occured; check the server's console log"
            });
        } else {
            response.json({
                message: `Leave letter has been sent successfully!`
            });
        }
    });
});



//express....
app.listen(port, () => {

    console.log(`Here we go, Engines started at ${port}.`);

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // render the error page
  res.status(err.status || 500);
  res.json({
     message: err.message,
     error: req.app.get('env') === 'development' ? err : {} 

  });
});

module.exports = app;
