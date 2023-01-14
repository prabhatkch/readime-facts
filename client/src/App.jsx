// import logo from './logo.svg';
import './normal.css'
import './App.css'
import { useState, useEffect } from 'react'

function App() {
    const BASE_URL = 'http://localhost:8080'

    // State for input and chat
    const [input, setInput] = useState('')
    // const [models, setModels] = useState([])
    const [chatLog, setChatLog] = useState([])

    // use effect run once when app loads (why is this here though?)
    // useEffect(() => {
    //     fetch(BASE_URL)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data)
    //             setModels(data)
    //         })
    // }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        let newChatLog = [...chatLog, { user: 'me', message: input }]
        setChatLog(newChatLog)
        // fetch request to backend (i.e. ChatGPT)
        // const messages = chatLogNew.map((log) => log.message).join('\n')
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // message: messages,
                query: input,
            }),
        })
        const data = await response.json()
        setChatLog([...newChatLog, { user: 'gpt', message: data.response }])
    }

    return (
        <div className="App">
            <aside className="side-menu">
                <div
                    className="side-menu-button"
                    onClick={() => setChatLog([])}
                >
                    <span>+</span>
                    New Chat
                </div>
                {/* <div className="models">
                    <select>
                        {models.map((model, index) => (
                            <option key={model.id} value={model.id}>
                                {model.id}
                            </option>
                        ))}
                    </select>
                </div> */}
            </aside>
            <section className="chat-box">
                <div className="chat-log">
                    {chatLog.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                </div>
                <div className="chat-input-holder">
                    <form onSubmit={handleSubmit}>
                        <input
                            rows="1"
                            onChange={(e) => setInput(e.target.value)}
                            className="chat-input-textarea"
                            placeholder="Enter your text here "
                        ></input>
                    </form>
                </div>
            </section>
        </div>
    )
}

const ChatMessage = ({ message }) => {
    return (
        <div className={`chat-message ${message.user === 'gpt' && 'chatgpt'}`}>
            <div className="chat-message-center">
                <div
                    className={`avatar ${message.user === 'gpt' && 'chatgpt'}`}
                ></div>
                <div className="message">{message.message}</div>
            </div>
        </div>
    )
}

export default App
