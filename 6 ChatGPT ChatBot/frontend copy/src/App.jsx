import Chat from "./components/Chat";

function App() {
  return (
      <div className="min-h-screen bg-gray-100">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">Ask Anything</h1>
          <Chat />
        </div>
      </div>
  );
}

export default App;
