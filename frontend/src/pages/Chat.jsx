import React, { useContext } from 'react'
import { datacontext, prevUser } from '../context/Usercontext'

const Chat = () => {
  const { input, setInput, previousInput, setPreviousInput, showresult, setShowresult ,feature,setFeature,prevFeature,setPrevFeature, genimgurl,setGenimgurl} = useContext(datacontext)

  return (
    <div className='chat-page'>
      <div className="user">
        {prevFeature=='upimg'?<> <img src={prevUser.imgUrl} alt="" /><span>{prevUser.prompt}</span></>:<span>{prevUser.prompt}</span>}
        
      </div>

      <div className="ai">
        {prevFeature=='genimg'
        ?
        <> 
        {!genimgurl?<span>Generating Image...</span>:<img src={genimgurl} alt="" />}
        </>
        :
        !showresult
        ?
        <span>Loading...</span>
        :
        <span>{showresult}</span>}
    
      </div>
    </div>
  )
}

export default Chat
