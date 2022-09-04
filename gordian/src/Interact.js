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

import React, {useState, useEffect} from 'react';
import {
    Grommet,
    Button,
    Table,
    TableRow,
    TextInput,
    TableCell,
    Form
} from 'grommet'

import RenderFormActions from "./FormActions";


// copyright and license inspection - no issues 4/13/22

function RenderInteract (props) {
    const [reset_button_state] = useState(false)
    const [defaults_button_state] = useState(true)
    const [apply_button_state, setApplyButtonState] = useState(false)
    let id = 0

    console.log("RenderNutesTabFunctional")

    useEffect(() => {
        const fetchData = async () => {
            applyChanges()
        }
        fetchData();
    }, []);    // eslint-disable-line react-hooks/exhaustive-deps

    function getEdge(row, index, arr) {
        return <TableRow key={index}>
            <TableCell>{row.handle}</TableCell>
            <TableCell>{row.original_author}</TableCell>
        </TableRow>
    }

    function getEdges() {
        id = 0
        let ret = props.edges.map(getEdge)
        return ret
    }

    async function applyChanges() {
        let url = 'http://localhost:4001/api/healthcheck?filename=' + props.filename
        const response = await fetch(url);
        if (response.ok) {
//            log.trace("getSite awaiting site")
            let x = await response.json();
            console.log("applyChanges Got " + JSON.stringify(x));
            props.setEdgesFromChild(x)
        } else {
            console.log("applyChanges error " + response.status)
        }
    }

    function resetChanges() {
    }

    function defaultsAction() {
    }

    let nute_rows = getEdges()
    let ret = <div>
        <Form>

        <div><RenderFormActions station={props.station} applyAction={applyChanges} resetAction={resetChanges}
                                defaultsAction={defaultsAction}
                                resetButtonState={true}
                                defaultsButtonState={true}
                                applyButtonState={true}
        />
         </div>
                   </Form>


        <hr />
        <div className="edge-list">
            <Table id="settings-tab">
                <tbody>

                <TableRow>
                    <th>Handle</th>
                    <th>Original_author</th>
                    <th></th>
                </TableRow>
                {nute_rows}
                </tbody>
            </Table>

        </div>
    </div>
    return (ret)
}

export default RenderInteract;
