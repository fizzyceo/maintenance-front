import React, { useState } from "react";
// AOS Import
import Aos from "aos";
import "aos/dist/aos.css";
//import Scss
// import "./assets/scss/themes.scss";
// import "./assets/scss/themesRTL.scss";

//imoprt Route
import Route from "./Routes";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// Fake Backend
import fakeBackend from "./helpers/AuthType/fakeBackend";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

// Activating fake backend
fakeBackend();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

// init AOS  Animate On Scroll
Aos.init();

function App() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const isRtl = localStorage.getItem("I18N_LANGUAGE") === "ar";
    if (isRtl) {
      import("./assets/scss/themesRTL.scss")
        .then(() => {
          // The Sass file has been loaded
          setIsReady(true);
        })
        .catch((error) => {
          // Handle the error if the Sass file failed to load
        });
    } else {
      import("./assets/scss/themes.scss")
        .then(() => {
          // The Sass file has been loaded
          setIsReady(true);
        })
        .catch((error) => {
          // Handle the error if the Sass file failed to load
        });
    }
    // Fetch your data or update the state as needed
  }, []);
  return (
    <React.Fragment>
      {isReady && <Route />}
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
