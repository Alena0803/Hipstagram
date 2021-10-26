import React, {useRef} from "react";
import { actionAvaChange } from "../Actions/index";
import { connect } from "react-redux";
import {useDropzone} from 'react-dropzone'

export function Dropzone({onSend}) {
  const loading = useRef()  
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    if(acceptedFiles.length > 0 && !loading.current) {
      onSend(acceptedFiles[0])
      loading.current = true
    }
    return (
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps() }/>
          <h5>Изменить аватар</h5>
        </div>      
    );
  }

const CDrop = connect(null,{onSend:actionAvaChange})(Dropzone)
export default CDrop
