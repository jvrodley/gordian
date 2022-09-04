import React from 'react';
import {useMemo} from 'react'
import {useDropzone} from 'react-dropzone';
import RenderFormActions from "./FormActions";


const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function MyDropzone(props) {
  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

    function action() {
        props.setFilename(acceptedFiles[0].name)
    }

    let station = {
        dispensers: [
            {
                dispenser_name: "dispenser1",
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

    return (
        <div className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here</p>
                <button type="button" onClick={open}>
                    Open File Dialog
                </button>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
            <RenderFormActions station={station} applyAction={action} resetAction={action}
                               defaultsAction={action}
                               resetButtonState={true}
                               defaultsButtonState={true}
                               applyButtonState={true}
            />

        </div>
    );
}

export default MyDropzone