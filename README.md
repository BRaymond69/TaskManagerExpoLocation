# 🗺️ TaskManagerExpoLocation

**Sending location data while the app is in the background using React Native Expo**

## 📋 Prerequisites

Ensure you have the following installed before running the project:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (optional)

## 🚀 How to Run the Project

Follow these steps to set up and run the project:

### 1. Install Dependencies

#### For the Expo Project:

```bash
npm install
```

or

```
yarn
```

#### For the Expo Project:

1. Move to the location-server folder

```bash
cd location-server
```

2. Install the necessary dependencies:

```bash
npm install
```

or

```
yarn
```

### 2. Start the Project

You will need two terminal windows to run the project:

1. Terminal 1: Start the Expo project by running the following command in the root of the project:

```bash
yarn start
```

or

```bash
npm start
```

2. Terminal 2: Start the location server by running the command inside the location-server folder:

```bash
yarn start
```

or

```bash
npm start
```

## ℹ️ Additional Information

Once the project is running, you can view the location data being sent from the simulator to the server. The data will be displayed in the terminal running the location server.

Simulating Location Data
On iOS Simulator (MacBook only):

1. Open the simulator.
2. Navigate to Features > Location.
3. Change the mode to Freeway Drive or City Bicycle Ride.
   On Android Emulator:

4. Open the emulator.
5. Go to Settings > Location.
6. In the Routes tab, create a route by selecting points A and B on the map.
7. Select the Car icon and press Play Route (located at the bottom right of the window).
