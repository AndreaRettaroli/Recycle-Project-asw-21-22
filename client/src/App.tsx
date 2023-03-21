import Router from "./routes/Router";
import store from "./redux/store";
import { Provider } from "react-redux";
import SocketContextProvider from "./components/SocketContext";

function App() {
  return (
    <Provider store={store}>
      <SocketContextProvider>
        <Router />
      </SocketContextProvider>
    </Provider>
  );
}

export default App;
