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

import React, {useState} from 'react';
import {
    Grommet,
    Button,
    Table,
    TableRow,
    TextInput,
    TableCell
} from 'grommet'

import RenderFormActions from "./FormActions";


// copyright and license inspection - no issues 4/13/22

function RenderInteract (props) {
    const [reset_button_state] = useState(false)
    const [defaults_button_state] = useState(true)
    const [apply_button_state, setApplyButtonState] = useState(false)
    const [dispensers, setDispensers] = React.useState(props.station.dispensers)

    console.log("RenderNutesTabFunctional")
    let [displaySettings] = useState({
        units: 'IMPERIAL',
        language: 'en-us',
        languageOptions: ['en-us', 'fr'],
        theme: props.theme
    }); //

    /**
     * Respond to the dispense button
     */
    function handleDispense(deviceid, dispenserid, dispenser_name, milliliters_per_millisecond, e) {
        console.log("handleDispense " + dispenserid + " " + dispenser_name + " for " + ms + " milliseconds")
        let amount = 0.0
        for( let i = 0; i < dispensers.length; i++ ) {
            if( dispensers[i].dispenserid === dispenserid ) {
                console.log("handleDispense found amount " + dispensers[i].dispenseml )
                amount = dispensers[i].dispenseml
                break
            }
        }
        let ms = Math.trunc(amount/milliliters_per_millisecond)
        console.log("Dispensing " + amount +"ml by holding valve open for " + ms + " milliseconds")
        props.dispense_function(deviceid, dispenser_name, ms)
    }

    function setMlPerMs(dispenserid, mlperms) {
        console.log("Seting mlperms amount to " + mlperms)
        setApplyButtonState(true)
    }

    function setDispenseAmount(dispenserid, amount) {
        console.log("Seting dispense amount to " + amount)
        let local_dispensers = JSON.parse(JSON.stringify(dispensers))
        for( let i = 0; i < local_dispensers.length; i++ ) {
            if( local_dispensers[i].dispenserid === dispenserid ) {
                local_dispensers[i].dispenseml = amount
                break
            }
        }
        setDispensers(local_dispensers)
    }

    function getNuterow(row, index, arr) {
        let ON = "UNDEF"
        if (props.station.dispensers[index].onoff == true) {
            ON = "ON"
        } else {
            if (row.onoff == false) {
                ON = ""
            }
        }
        if( typeof row.dispenseml === 'undefined' ) {
            row.dispenseml = 0.0
        }


        return <TableRow key={row.dispenserid}>
            <TableCell>{row.deviceid_device}</TableCell>
            <TableCell>{row.dispenser_name}</TableCell>
            <TableCell>{row.manufacturer_name}</TableCell>
            <TableCell><a rel="noopener noreferrer" target="_blank" href={row.spec_url}>{row.additive_name}</a></TableCell>
            <TableCell>{row.index}</TableCell>
            <TableCell>{row.bcm_pin_number}</TableCell>
            <TableCell><TextInput value={row.milliliters_per_millisecond}
                                  onChange={event => setMlPerMs(row.dispenserid, event.target.value)}/></TableCell>
            <TableCell><TextInput value={row.dispenseml}
                                  onChange={event => setDispenseAmount(row.dispenserid, event.target.value)}/></TableCell>
            <TableCell><Button className='Dispense-Button' color={'var(--color-button-border)'}
                               width={'medium'} round={'large'} label={'Dispense'}
                               disabled={row.onoff === true}
                               onClick={(e) => handleDispense(row.deviceid_device, row.dispenserid, row.dispenser_name, row.milliliters_per_millisecond, e)}></Button></TableCell>
            <TableCell>{ON}</TableCell>
        </TableRow>
    }

    function getNutes() {
        let ret = dispensers.map(getNuterow)
        return ret
    }

    function applyChanges() {
        alert('Apply - call out to python please??')
    }

    function resetChanges() {
    }

    function defaultsAction() {
    }

    let nute_rows = getNutes()
    let ret =
        <Grommet theme={props.theme}>
            <div className="global_container_">
                <Table id="settings-tab">
                    <tbody>

                    <TableRow>
                        <th>Device ID</th>
                        <th>Dispenser Name</th>
                        <th>Manufacturer</th>
                        <th>Additive</th>
                        <th>Index</th>
                        <th>BCM Pin #</th>
                        <th>Calibration ml/ms</th>
                        <th>Dispense ml</th>
                        <th></th>
                    </TableRow>
                    {nute_rows}
                    </tbody>
                </Table>

                <RenderFormActions station={props.station} applyAction={applyChanges} resetAction={resetChanges}
                                   defaultsAction={defaultsAction}
                                   resetButtonState={true}
                                   defaultsButtonState={true}
                                   applyButtonState={true}
                />
            </div>
        </Grommet>
    return (ret)
}

export default RenderInteract;
