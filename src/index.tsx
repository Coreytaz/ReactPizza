import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { applyTheme, getPreferredTheme } from './utils/theme';

applyTheme(getPreferredTheme());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </Provider>
);
