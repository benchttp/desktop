import "./App.css";
import { SocketProvider } from "./engine";
import { POC } from "./views";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <header className="App-header">
          <POC />
        </header>
      </SocketProvider>
    </div>
  );
}

export default App;
