import React from "react";
import { Provider } from "react-redux";

import { SoundProvider } from "../components/SoundProvider";
import { store } from "../store/store";
import AppRoutes from "./routes";

const App: React.FC = () => (
  <Provider store={store}>
    <SoundProvider>
      <AppRoutes />
    </SoundProvider>
  </Provider>
);

export default App;
