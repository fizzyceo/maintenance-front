import { create } from "zustand";
import { axiosHelper } from "./helpers";
import { filterNonFalseValues } from "./helpers/Utlis";
// import mqtt from "async-mqtt";

// // MQTT setup
// const protocol = "mqtt";
// const host = "185.98.137.190";
// const port = "1883";
// const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
// const connectUrl = `${protocol}://${host}:${port}`;
// // MQTT client instance
// const mqttClient = mqtt.connect(connectUrl, {
//   clientId,
//   clean: true,
//   connectTimeout: 4000,
//   username: "device",
//   password: "hamid$123",
//   reconnectPeriod: 1000,
//});
export const useAxisHistoryStore = create((set, get) => ({
  history: [],
  historyForReports: [],
  isLoading: false,
  isError: false,
  error: undefined,
  filters: {
    code: "",
    DestProv: "",
    dateFrom: "",
    dateTo: "",
    access: "",
    driverId: "",
    charger: false,
  },
  filtersForReports: {
    code: "",
  },
  // Methods
  getAxisHistory: async (filters) => {
    set({ filters: filterNonFalseValues(filters) });
    console.log(filterNonFalseValues(filters));
    const body = {
      // search: filterNonFalseValues(filters) || "",
      ...filters,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      sortDirection: "desc",
    };
    set({ isLoading: true });
    let response = await axiosHelper.post("/system/history/get", body);
    console.log(response);
    if (!response.result) {
      return;
    }
    // console.log(response.data);
    set({ history: response.data, isLoading: false });

    set({ isLoading: false });
    return response.data;
  },
  getAxisHistoryForReports: async (filtersForReports) => {
    set({ filtersForReports: filterNonFalseValues(filtersForReports) });

    console.log(filtersForReports);
    const body = {
      // search: filterNonFalseValues(filtersForReports) || "",
      ...filtersForReports,
      page: filtersForReports?.page || 1,
      limit: filtersForReports?.limit || 10,
      sortDirection: "desc",
    };
    set({ isLoading: true });
    let response = await axiosHelper.post("/system/history/get", body);
    console.log(response);
    if (!response.result) {
      return;
    }
    // console.log(response.data);
    set({ historyForReports: response.data, isLoading: false });

    set({ isLoading: false });
    return response.data;
  },

  refreshHistory: () => {
    //refresh alerts every minute
    setInterval(async () => {
      try {
        let response = await axiosHelper.post(
          "/system/history/get",
          get().filters
        );

        if (!response.result) {
          return;
        }

        set({ history: response.data, isLoading: false });
      } catch (error) {
        console.log(error);
      }
      //log
    }, 30000);
  },
}));

// const subscribe = async () => {
//   // Subscribe to MQTT topic and handle incoming messages

//   try {
//     console.log("Connected to mqtt");
//     await mqttClient.subscribe("algemb/iot/backend");
//     mqttClient.on("message", async (topic, message) => {
//       // Handle incoming MQTT messages here
//       console.log("Received message:", message.toString());
//       // Trigger the refresh of history data
//       await useAxisHistoryStore.getState().getAxisHistory(useAxisHistoryStore.getState().filters);
//     });
//   } catch (error) {
//     console.log("error establishing connection", error);
//     console.error(JSON.stringify(error));
//   }
// };

// mqttClient.on("connect", subscribe);
// // disconnecting to handle the EOF ISSUE
// mqttClient.on("error", (error) => console.error(JSON.stringify(error)));
// mqttClient.on("reconnect", (error) => console.error(JSON.stringify(error)));

//TODO: add condition to check user logged in first
//refresh alerts
useAxisHistoryStore.getState().refreshHistory();
