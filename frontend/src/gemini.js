import { prevUser } from "./context/Usercontext"

const Api_Url= "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyD2NxpG2rkzMl9zkM4HDBftz3hhTMOrk6I"

export async function generateresponse(){
  let requestOption={
    method: 'POST',
    Headers:{'Content-Type' : 'application/json'},
    body: JSON.stringify({
       "contents": [
    {
      "parts": [ 
        {
          "text": prevUser.prompt
        },
        prevUser.data?[
              {
          "inline_data": {
            "mime_type": prevUser.mime_type,
            "data": prevUser.data
          }
        }
        ]:[]
      ]
    }
  ]
    })
  }
try{
  let response = await fetch(Api_Url,requestOption)
  let data = await response.json()
  let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1').trim()
   console.log(apiResponse)
  return apiResponse

}

catch{

}
} 