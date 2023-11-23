import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';
import AtmProvider from './context/AtmContext';
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <BrowserRouter>
    <AtmProvider>
    <App />
    </AtmProvider>
    </BrowserRouter>
    </Provider>
);
