import React, { useState} from 'react';
import {Button} from "grommet";
import './less/app.less';
import RenderInteract from "./Interact";
import MyDropzone from './Upload'
import logo from './logo.png';

import './App.css';

function App() {
    const [pageNumber, setPageNumber] = useState(0);

    let station = {
        dispensers: [
            {
                dispenser_name: "dispenser1",
                index: 5,
                deviceid_device: 1,
                manufacturer_name: "GH",
                bcm_pin_number: 2,
                milliliters_per_millisecond: 25,
                dispenserid: 1,
                dispenseml: 0.5,
                onoff: false
            }
        ]
    }

    /**
     * Send a "take picture" command to all the devices attached to this controller.
     */
    const startUntangling = () => {
        console.log("button: startUntangling")
        setPageNumber(1)
    }

    if (pageNumber === 0) {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p></p>
                    <p>
                        Untangle the gordian knot of OSINT data.
                    </p>
                    <div><Button color={'var(--color-button-border)'} width={'medium'} round={'large'} active={true}
                                 label={'Start Untangling'} onClick={startUntangling}/></div>

                    <a
                        className="App-link"
                        href="https://github.com/jvrodley/gordian"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit our github page
                    </a>
                </header>
            </div>
        );
    } else if (pageNumber === 1) {
        return (
            <MyDropzone setPageNumber={setPageNumber}/>
        );
    } else if (pageNumber === 2) {
        {
            return (
                <RenderInteract station={station} setPageNumber={setPageNumber}/>
            );
        }
    }
}

export default App;
