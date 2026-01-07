import { useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/atom-one-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)

const [review, setResponse] = useState('');

async function reviewCode() {
  const response = await axios.post('http://localhost:3000/ai/get-review', { code })
  setResponse(response.data);
}

  return (
   <>
   <main>
        <div className="left">
          <div className="code">
            <CodeMirror
              value={code}
              height="100%"
              theme={oneDark}
              extensions={[javascript()]}
              onChange={(value) => setCode(value)}
              style={{
                fontSize: 16,
                height: "100%",
                width: "100%"
              }}
            />
          </div>
      <button onClick={reviewCode} className="review">Review Code</button>
    </div>
    <div className="right"> {
      <Markdown rehypePlugins={[rehypeHighlight]}>
        {review}
    </Markdown>} </div>
   </main>
   </>
  )
}

export default App;
