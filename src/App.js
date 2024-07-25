import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShukkaIchiran from './components/page/shukka/list/ShukkaIchiran.js';
import ShukkaEntry from './components/page/shukka/create/ShukkaEntry.js';
import ShukkaSuccess from './components/page/shukka/success/ShukkaSuccess.js';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (

    <div className="App">
      <>

        {/* HEADER */}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />

        <Routes>
          <Route path='/' element={<ShukkaIchiran />} />
          <Route path="/shukka-entry" element={<ShukkaEntry />} />
          <Route path="/shukka-success" element={<ShukkaSuccess />} />
        </Routes>

      </>

    </div>

  );

}

export default App;
