import React, { createContext, useState } from 'react';

export const datacontext = createContext();


export let user = {
  data:null,
  mime_type:null,
  imgUrl:null
}
export let prevUser = {
  data:null,
  mime_type:null,
  prompt:null,
  imgUrl:null
};

const Usercontext = ({ children }) => {
  let [startres, setStartres] = useState(false); 
  let [popUp, setPopUp] = useState(false);
  let [input, setInput] = useState('');
  let [feature, setFeature] = useState('chat');
  let [showresult, setShowresult] = useState('');
  let[prevFeature, setPrevFeature] = useState('chat');
  let [genimgurl, setGenimgurl] = useState('');
  let value = {
    startres,
    setStartres,
    popUp,
    setPopUp,
    input,
    setInput,
    feature,
    setFeature,
    showresult,
    setShowresult,
    prevFeature,
    setPrevFeature,
    genimgurl,
    setGenimgurl
  };

  return (
    <datacontext.Provider value={value}>
      {children}
    </datacontext.Provider>
  );
};

export default Usercontext;
