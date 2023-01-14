// import logo from './logo.svg';
import './normal.css'
import './App.css';
import { useState, useEffect } from 'react';


function App() {

// use effect run once when app loads
  useEffect(() =>{
    getEngines();
  }, [])

  // add state  for input and chat
  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can i help you now?"
  },
  {
    user: "me",
    message: "I Love You"
  }
]);

// clear chats
function clearChat(){
  setChatLog([]);
}

function getEngines(){
  fetch("https://localhost:3000")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    setModels(data)
  })
}

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}`}]
    setInput("");
    setChatLog(chatLogNew)
    // fetch request to api combining the chat log array of messages and sending it as a message to localhost:3000 as a post  
    const messages = chatLogNew.map((message) => message.message).join("\n")
    const response = await fetch ("https://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    });
    const data = await response.json();
    setChatLog({
    user: "gpt",
    message: data
  })
  }

  return (
    <div className="App">
      <aside className="side-menu">
        
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
        <div className="models">
          <select>
            {models.map((model, index) => (
              <option key={model.id} value={model.id}>{model.id}</option>
            ))}
          </select>
        </div>
      </aside>
      <section className="chat-box">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message}/>
          ))}

          
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            
          <input rows="1" 
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          className="chat-input-textarea" placeholder="Enter your text here "></input>
          </form>
        </div>
      </section>
      
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return(
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
            <div className="chat-message-center">
              <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
                
            </div>
            <div className="message"> 
                {message.message}
            </div>
            </div>
          </div>
  )
  }

export default App;
