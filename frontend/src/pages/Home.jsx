import React from 'react'
import "../App.css"
import { RiImageAiLine } from "react-icons/ri";
import { RiChatUploadLine } from "react-icons/ri";
import { MdOutlineChat } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa6";
import Chat from './Chat';
import { useContext } from 'react';
import { datacontext, prevUser, user } from '../context/Usercontext';
import { generateresponse } from '../gemini';
import { query } from '../hugging';

const Home = () => {
  let { startres, setStartres,popUp,setPopUp,input,setInput,feature,setFeature,showresult,setShowresult,prevFeature, setPrevFeature, genimgurl, setGenimgurl } = useContext(datacontext)
 async function handleSumbit(e) {

   setStartres(true);
   setPrevFeature(feature);
   setFeature('chat');
   setShowresult('');
   prevUser.data = user.data;
   prevUser.mime_type = user.mime_type;
   prevUser.imgUrl = user.imgUrl;
   prevUser.prompt = input
     user.data = null;
    user.mime_type = null;
    user.imgUrl = null;
   setInput('');
   let result=await generateresponse()
   setShowresult(result)
  
  
 }

 function handleImage(e){
  setFeature("upimg")
  let file=e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = (event) => {
    let base64=event.target.result.split(",")[1]
    user.data = base64;
    user.mime_type = file.type;
    user.imgUrl = `data:${user.mime_type};base64,${user.data}`;
  };
 }
//  async function handlegenerateimage(){
//    setStartres(true)
//    setPrevFeature(feature)
//    setGenimgurl('')
//    prevUser.prompt=input
//  let result =await query().then((e)=>{

// let url=URL.createObjectURL(e)


// setGenimgurl(url)
//  })
//  setInput('')
// setFeature('chat')

//  }
async function handlegenerateimage() {
  setStartres(true);
  setPrevFeature(feature);
  setGenimgurl("");
  
  // Save prompt in prevUser
  prevUser.prompt = input;

  try {
    // Pass prompt to query
    const blob = await query(prevUser.prompt);
    const url = URL.createObjectURL(blob);
    setGenimgurl(url);
  } catch (err) {
    console.error("Error generating image:", err);
  }

  setInput("");
  setFeature("chat");
}

  return (
    <div>
      <nav>
        <div className="logo" onClick={()=>{
          setStartres(false)
          setFeature('chat')
          user.data = null;
 user.mime_type = null;
    user.imgUrl = null;
    setPopUp(false);

        }}>
          BRAINWAVE bot
        </div>
      </nav>
      <input type='file' accept='image/* 'hidden id='inputimage' onChange={handleImage}/>

{!startres? <div className="hero">
        <span id='tag'>
          what can i help with?
        </span>
        <div className="cat">
          <div className="upIMG" onClick={()=>{
            document.getElementById('inputimage').click();
          }}><RiChatUploadLine />
          <span>Upload Image</span></div>
          <div className="genIMG" onClick={() => setFeature('genimg') }><RiImageAiLine />
          <span>Generate Image</span></div>
          <div className="chat" onClick={() => setFeature('chat') }><MdOutlineChat />
          <span>let's Chat</span></div>
          
        </div>
      </div>
      :<Chat />}



      <form  className="input-box" onSubmit={(e) =>{
        e.preventDefault()
        if(input){
          if(feature == 'genimg'){
            handlegenerateimage()
          }
          else{
handleSumbit(e)
          }
}
        }
      } >
<img src={user.imgUrl} alt="" id="user-img"/>

        {popUp? <div className="pop-up">
          <div className="select-up"  onClick={()=>{
            setPopUp(false)
            setFeature('chat')
            document.getElementById('inputimage').click();
          }}>
            <RiChatUploadLine />
          <span>Upload Image</span>
          </div>
          <div className="select-gen" onClick={() =>{ 
            setPopUp(false)
            setFeature('genimg')} }>
            <RiImageAiLine />
          <span>Generate Image</span>
          </div>
        </div>:null}
       
      <div id='add' onClick={() => setPopUp(prev => !prev)}>
        {feature=="genimg"?<RiImageAiLine id="genimg" />:<IoMdAdd />}
      </div>
      <input type="text" placeholder='Type your message here...'onChange={(e)=>setInput(e.target.value)} value={input} />
      {input?  <button id='submit'>
<FaArrowUp />
      </button>:null}
    
      </form>
    </div>
  )
}

export default Home