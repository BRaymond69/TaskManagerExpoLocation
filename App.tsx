import { View, Text, TouchableOpacity } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as ExpoLocation from "expo-location";
import { useEffect, useState } from "react";

const TASK_NAME = "location-tracking";
const LOCATION_SEND_INTERVAL = 4000; // 10 seconds

TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
    let speed = locations[0].coords.speed;
    let heading = locations[0].coords.heading;
    let accuracy = locations[0].coords.accuracy;

    // Custom logic to send data only at specific intervals
    const now = Date.now();
    if (
      !global.lastSendTime ||
      now - global.lastSendTime > LOCATION_SEND_INTERVAL
    ) {
      try {
        let response = await fetch("http://192.168.2.9:3000/location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ locations }),
        });

        if (!response.ok) {
          console.log("Failed to send location data:", response.statusText);
        } else {
          console.log(
            `${new Date(
              Date.now()
            ).toLocaleString()}: ${lat},${long} - Speed ${speed} - Precision ${accuracy} - Heading ${heading}`
          );
          console.log("Location data sent successfully");
        }
      } catch (e) {
        console.error("Error sending location data:", e);
      }
      global.lastSendTime = now;
    } else {
      console.log("Skipping location data send");
    }
  }
});
export default function App() {
  const [location, setLocation] = useState<ExpoLocation.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locationStarted, setLocationStarted] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await ExpoLocation.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    const config = async () => {
      let resf = await ExpoLocation.requestForegroundPermissionsAsync();
      let resb = await ExpoLocation.requestBackgroundPermissionsAsync();

      if (resf.status !== "granted" || resb.status !== "granted") {
        console.log("Permission to access location was denied");
      } else {
        console.log("Permission to access location granted");
      }
    };

    config();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const startLocationTracking = async () => {
    await ExpoLocation.startLocationUpdatesAsync(TASK_NAME, {
      accuracy: ExpoLocation.Accuracy.BestForNavigation,
      activityType: ExpoLocation.ActivityType.AutomotiveNavigation,
      timeInterval: LOCATION_SEND_INTERVAL,
      showsBackgroundLocationIndicator: true,
      // Android only
      foregroundService: {
        notificationTitle: "Using your location",
        notificationBody:
          "To turn off, go back to the app and switch something off.",
      },
    });

    const hasStarted = await ExpoLocation.hasStartedLocationUpdatesAsync(
      TASK_NAME
    );
    setLocationStarted(hasStarted);
    console.log("Tracking started", hasStarted);
  };

  const stopLocation = () => {
    setLocationStarted(false);
    console.log("Tracking stopped");

    TaskManager.isTaskRegisteredAsync(TASK_NAME).then((tracking) => {
      if (tracking) {
        ExpoLocation.stopLocationUpdatesAsync(TASK_NAME);
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ width: "70%" }}>Json: {text}</Text>
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: "#144C41",
          borderRadius: 5,
          marginTop: 40,
        }}
        onPress={startLocationTracking}
      >
        <Text style={{ color: "white" }}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: "#ef4444",
          borderRadius: 5,
          marginTop: 10,
        }}
        onPress={stopLocation}
      >
        <Text style={{ color: "white" }}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
}
