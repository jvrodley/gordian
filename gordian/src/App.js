import React, { useState} from 'react';
import {Button} from "grommet";
import './less/app.less';
import RenderInteract from "./Interact";
import MyDropzone from './Upload'
import logo from './logo.png';

import './App.css';

function App() {
    const [pageNumber, setPageNumber] = useState(0);
    const [edges, setEdges] = useState([])
    const [filename, setFname] = useState()

    function setFilename(name) {
        console.log("Got filename " + name)
        setFname(name)
        setPageNumber(2)
    }
    function setEdgesFromChild(ed) {
        setEdges(ed)
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
            <MyDropzone setFilename={setFilename}/>
        );
    } else if (pageNumber === 2) {
        {
            return (
                <RenderInteract filename={filename} edges={edges} setEdgesFromChild={setEdgesFromChild} setPageNumber={setPageNumber}/>
            );
        }
    }
}

export default App;
