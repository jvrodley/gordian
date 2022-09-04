/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


var express = require('express');
var router = express.Router();

const { spawn } = require('child_process');


/**
 * @api {get} /status/:userid/:deviceid Get the last reported status from specified device
 * @apiName GetStatus
 * @apiGroup Status
 *
 * @apiParam {Number} userid User's unique ID.
 * @apiParam {Number} deviceid Device's unique ID.
 *
 * @apiSuccess {XXXX} XXXX XXXX
 */
function getStatus(req,res,next) {
    console.log("getStatus");
    res.json({"status": "ok" });

}

router.get("/", function (req, res, next) {

    console.log("req.query.filename = " + req.query.filename )
    const pyProg = spawn('python', ['./nodetest.py', req.query.filename]);
    let x = {}
    pyProg.stdout.on('data', function (data) {
        z = data.toString()
        y = z.replaceAll("'", "\"")

//        console.log(y)
        x = JSON.parse(y)
//        console.log(JSON.stringify(x));
         res.status(200).json(x);
        console.log("Finished returning json")
   });
    pyProg.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    pyProg.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });


});

router.post("/apply", function (req, res, next) {

    const pyProg = spawn('python', ['./nodetest.py']);

    pyProg.stdout.on('data', function (data) {
        console.log(data.toString());
        res.write(data);
        res.end('end');
    });
    pyProg.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    pyProg.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    getStatus(req, res, next)
});

module.exports = {
    getStatus,
    router
};
