import React from 'react';
import { useDropzone } from "react-dropzone";
import "./DropzoneComponent.css";

const DropzoneComponent = ({ onDrop, accept }) => {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        multiple: false
    });

    const getClassName = (className, isActive) => {
        if (!isActive) return className;
        return `${className} ${className}-active`;
    };

    return (
        <div className="dropzone-box" {...getRootProps()}>
            <input className={getClassName("dropzone-input", isDragActive)} {...getInputProps()} />
            <div className="text-center">
                {isDragActive ? (
                    <p className="dropzone-content">Release to drop the files here</p>
                ) : (
                    <p className="dropzone-content">
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
            </div>
        </div>
    );
};

export default DropzoneComponent;