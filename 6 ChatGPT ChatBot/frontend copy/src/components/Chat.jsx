import { useRef, useState } from "react";
import MessageList from "./MessageList";

const Chat = () => {
  const [conversation, setConversation] = useState(null);
  const messageInputRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let url = "http://localhost:3000/api/conversation";
    if (conversation) {
      url = `${url}/${conversation._id}`;
    }
    fetch(url, {
      method: conversation ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: messageInputRef.current.value,
        model: "gemini-1.5-flash",
      }),
    })
    .then((res) => res.json())
    .then((conversation) => {
      setConversation(conversation);
      messageInputRef.current.value = '';
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
  <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg shadow-xl overflow-hidden">
    <div className="border-b border-gray-300 p-6 flex justify-between items-center bg-white">
      <h2 className="text-2xl font-semibold text-gray-800">
        {conversation?.title || "Chat with AI"}
      </h2>
      <button 
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-md transition duration-200 transform hover:scale-105 flex items-center gap-2"
        onClick={() => setConversation(null)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        New Chat
      </button>
    </div>

    <div className="h-[500px] overflow-y-auto p-6 bg-gray-50 rounded-lg shadow-inner">
      <MessageList conversation={conversation} />
    </div>

    <div className="p-6 border-t border-gray-300">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          placeholder="Type your message here..."
          ref={messageInputRef}
          disabled={loading}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 disabled:bg-gray-100 shadow-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-colors duration-200 disabled:bg-indigo-300 flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              Send
            </>
          )}
        </button>
      </form>
    </div>
  </div>
</div>

  )
}

export default Chat