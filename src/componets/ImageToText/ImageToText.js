import React, { useState } from 'react';
import './ImageToText.css';

var Tesseract = window.Tesseract;

export default function ImageToText() {
  const [uploads, setUploads] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [documents, setDocuments] = useState([])



  const handleChange = (event) => {
    if (event.target.files[0]) {
      var uploads = []
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key]
        uploads.push(URL.createObjectURL(upload))
      }
      setUploads(uploads);
    } else {
      setUploads([]);
    }
  }

  const generateText = () => {
    // let uploads = uploads
    console.log('generateText');
    for(var i = 0; i < uploads.length; i++) {
      Tesseract.recognize(uploads[i], {
        lang: 'eng'
      })
      .catch(err => {
        console.error(err)
      })
      .then(result => {
        console.log(result);
        // Get Confidence score
        let confidence = result.confidence
  
        // Get full output
        let text = result.text
  
        // Get codes
        let pattern = /\b\w{10,10}\b/g
        let patterns = result.text.match(pattern);
        
        // Update state
        setPatterns(currentPatterns => [...currentPatterns, patterns]);
        setDocuments(currentDocuments => [...currentDocuments, {
            pattern: patterns,
            text: text,
            confidence: confidence
          }
        ]);
      })
    }
  }

    return (
      <div className="container">
        { /* File uploader */ }
        <section className="hero">
          <label className="fileUploaderContainer">
            Click here to upload documents
            <input type="file" id="fileUploader" onChange={(event)=> handleChange(event)} multiple />
          </label>

          <div>
            { uploads.map((value, index) => {
              return <img alt="" key={index} src={value} width="100px" />
            }) }
          </div>

          { uploads.length !== 0 &&  <button onClick={()=>generateText()} className="button">Generate</button> }
        </section>

        { /* Results */ }
        <section className="results">
          { documents.map((value, index) => {
            return (
              <div key={index} className="results__result">
                <div className="results__result__image">
                  <img alt="" src={uploads[index]} width="250px" />
                </div>
                <div className="results__result__info">
                  <div className="results__result__info__codes">
                    <small><strong>Confidence Score:</strong> {value.confidence}</small>
                  </div>
                  <div className="results__result__info__text">
                    <small><strong>Full Output:</strong> {value.text}</small>
                  </div>
                </div>
              </div>
            )
          }) }
        </section>
      </div>
    )

}
