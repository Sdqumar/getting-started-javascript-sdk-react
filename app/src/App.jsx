import axios from "axios";
import Smartcar from "@smartcar/auth";

import Connect from "./components/Connect";
import Vehicle from "./components/Vehicle";
import { useState } from "react";

const App = () => {
  const [vehicle, setVehicle] = useState({});

  function onComplete(err, code, state) {
    return axios
      .get(`${process.env.REACT_APP_SERVER}/exchange?code=${code}`)
      .then((_) => {
        return axios.get(`${process.env.REACT_APP_SERVER}/vehicle`);
      })
      .then((res) => {
        setVehicle({ vehicle: res.data });
      });
  }

  const smartcar = new Smartcar({
    clientId: "a9be171e-3e4e-4b83-bcad-3ab9df9e1474",
    redirectUri:
      " https://javascript-sdk.smartcar.com/redirect-2.0.0?app_origin=http://localhost:3000",
    scope: ["read_vehicle_info"],
    testMode: true,
    onComplete: onComplete(),
  });
  function authorize() {
    smartcar.openDialog({ forcePrompt: true });
  }

  return Object.keys(vehicle).length !== 0 ? (
    <Vehicle info={vehicle} />
  ) : (
    <Connect onClick={authorize} />
  );
};

export default App;
