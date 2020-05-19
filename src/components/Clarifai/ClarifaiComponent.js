import React, { useCallback, useState, useEffect } from 'react';
import Clarifai from 'clarifai';
import DropzoneComponent from "../DropZone/DropzoneComponent";

const app = new Clarifai.App({
    apiKey: '6fadf97f55a548e9bdb649178e2c9c2b'
});

const ClarifaiComponent = () => {

    const [state, setState] = useState({
        file: null,
        outputs: null
    });

    useEffect(() => {

        FixStringToBase64();

    }, [state.file]);

    const onDrop = useCallback(acceptedFiles => {

        let file = acceptedFiles[0];
        toBase64(file);

        // app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
        //     .then(generalModel => {
        //         return generalModel.predict(file);
        //         console.log('aaa');
        //     })
        //     .then(response => {
        //         var concepts = console.log(response)
        //     })

    }, []);

    const toBase64 = (file) => new Promise((resolve, reject) => {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setState(prevState => ({...prevState, file: reader.result }))
        };
        reader.onerror = error => reject(error);

    });

    const FixStringToBase64 = () => {

        if (state.file !== null) {
            let base = state.file;

            if (base !== null) {
                base = base.replace(/^data:image\/jpeg;base64,/, '');
            }

            ClarifaiImage(base);
        }

    };

    const ClarifaiImage = (file) => {

        app.models
            .predict(
                "aaa03c23b3724a16a56b629203edc62c",
                {
                    base64: file
                })
            .then( response => outputConcepts(response))
            .catch(err => console.log(err))

    };

    const outputConcepts = (outputs) => {
        setState(prevState => ({...prevState, outputs: outputs['outputs'][0]['data']['concepts'] }))
    };

    return (
        <main className="App">
            <DropzoneComponent onDrop={onDrop} accept={"image/*"}/>

            <img src={state.file} alt=""/>

            {state.outputs ? state.outputs.map(item => (
                <p key={item.id}>{item.name}</p>
            )) : <p>still empty!</p>}
        </main>
    );
};

export default ClarifaiComponent;