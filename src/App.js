import React from 'react'
import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'

function App() {
  const apiKey = process.env.REACT_APP_API_KEY
  const [inputText, setInputText] = useState('')
  const [inputTextArea, setInputTextArea] = useState('')
  const [isLoading , setIsLoading] = useState(false)

  const openai = new OpenAIApi(
    new Configuration({
      apiKey,
    })
  )

  const handleClick = async () => {
    setIsLoading(true)
    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: inputText }],
    })
    setIsLoading(false)
    const answer = res.data.choices[0].message.content
    setInputTextArea(answer)
  }

  return (
    <div>
      <div>
        <input value={inputText} onChange={e => setInputText(e.target.value)} />
        <button onClick={handleClick}>Ok</button>
      </div>
      {
        isLoading?<h1>Loading....</h1> :  <textarea value={inputTextArea} disabled style={{height: '80vh', width:'100vw'}}/>
      }
     
    </div>
  )
}

export default App
