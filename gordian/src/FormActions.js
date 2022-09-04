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

import {Button, Grid} from "grommet";
import React, {useState} from "react";

// copyright and license inspection - no issues 4/13/22

function RenderFormActions (props) {
    let [state] = useState(props.state);

    function defaultsAction() {
        props.defaultsAction()
    }
    function resetAction() {
        props.resetAction();
    }
    function applyAction() {
        props.applyAction(state);
    }
    let applyDisabled = false
    if( props.applyButtonState === false ) {
        applyDisabled=true
    }
    let resetDisabled = false
    if( props.resetButtonState === false ) {
        resetDisabled=true
    }
    let defaultsDisabled = false
    if( props.defaultsButtonState === false ) {
        defaultsDisabled=true
    }
    // The color supplied to the button is the only way to make a border appear.
    let ret = <>
            <Grid
                margin={"medium"}
                justify={'center'}
                round={'xxsmall'}
                direction={'horizontal'}
                fill
                areas={[
                    { name: 'apply', start: [0, 0], end: [0, 0] },
                    { name: 'reset', start: [1, 0], end: [1, 0] },
                    { name: 'defaults', start: [2, 0], end: [2, 0] },
                ]}
                columns={['small','small','small']}
                rows={['40px']}
                gap={"small"}
            >

                <Button gridArea={'apply'} color={'var(--color-button-border)'} disabled={applyDisabled} width={'medium'} round={'large'} active={props.applyButtonState} label={'Apply'} onClick={applyAction} />
                <Button gridArea={'reset'} color={'var(--color-button-border)'} disabled={resetDisabled} width={'medium'} round={'large'} type={'reset'} active={props.resetButtonState} label={'Reset'} onClick={resetAction}/>
                <Button gridArea={'defaults'} color={'var(--color-button-border)'} disabled={defaultsDisabled} width={'medium'} round={'large'} active={props.defaultsButtonState} label={'Defaults'} onClick={defaultsAction}/>
         </Grid>
   </>
    return(ret);
}

export default RenderFormActions;

