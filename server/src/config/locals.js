
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

const util = require('../util')

const fs = require('fs');
let configFilePath = './config.json'

global.localconfig = { bubbles_db_config: {}}

function reloadLocals(filepath) {
        console.log("locals.reloadLocals Reading config from " + filepath)
        const data = fs.readFileSync(filepath, 'utf8');
        // parse JSON string to JSON object
        global.localconfig = JSON.parse(data);
}

function getLocals (force_reload) {
    if( force_reload === true ) {
        configFilePath = util.get_config_file_for_environment(process.env.NODE_ENV)
        reloadLocals(configFilePath);
        console.log("using database "+global.localconfig.bubbles_db_config.database)
    }
    return (global.localconfig)
}


module.exports = {
    getLocals: getLocals,
    reloadLocals: reloadLocals
}