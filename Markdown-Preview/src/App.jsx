import React , { useState } from 'react'
import ReactMarkdown from "react-markdown"

function App() {
  
  const [markdown,setMarkdown] = useState('')
  return (
    <main>
      <h1 className='title'>MarkDown Preview</h1>
      <section className='markdown'>
        <textarea placeholder='Enter Markdown Syntax' className='input' value={markdown} onChange={(e)=>setMarkdown(e.target.value)}></textarea>
        <article className="result">
          <ReactMarkdown>
          {markdown}
          </ReactMarkdown>
        </article>
      </section>
    </main>
  )
}

export default App
