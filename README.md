# Hello Metal - React Native Expo App

A polished React Native (Expo) application demonstrating core mobile development fundamentals including navigation, API integration, haptic feedback, and theme management.

## 🎯 Features

### Core Requirements
- ✅ **Hello Metal Button**: Vibrates device and shows alert
- ✅ **DOG Button**: Navigates to a new screen
- ✅ **Random Dog Images**: Fetches and displays random dog images from [Dog CEO API](https://dog.ceo/api/breeds/image/random)
- ✅ **Navigation**: React Navigation with proper back button support
- ✅ **Android Support**: Fully configured for Android builds

### Bonus Features
- 🌓 **Light/Dark Mode**: Toggle between light, dark, and automatic theme modes
- ⏳ **Loading Indicators**: Smooth loading states with user-friendly messages
- 🎨 **Button Animations**: Polished animations using react-native-animatable
- 🔄 **Pull-to-Refresh**: Swipe down to fetch a new dog image
- 🎯 **Haptic Feedback**: Enhanced user experience with haptic feedback on iOS
- 🛡️ **Error Handling**: Comprehensive error handling with retry mechanisms
- ✨ **Smooth Transitions**: Fade-in animations for images and UI elements

## 📱 Screenshots

*Add your screenshots here after building the app*

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (installed globally or via npx)
- Expo Go app on your mobile device (for development)
- Android Studio (for Android builds)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hello-metal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on Android**
   ```bash
   npm run android
   ```

   Or scan the QR code with Expo Go app on your Android device.

## 📦 Building for Android

### Using EAS Build (Recommended)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure EAS**
   ```bash
   eas build:configure
   ```

4. **Build for Android**
   ```bash
   eas build --platform android --profile preview
   ```

5. **Get QR Code**
   After the build completes, EAS will provide a QR code and download link for your APK.

### Using Expo Go (Development)

1. Start the development server:
   ```bash
   npm start
   ```

2. Scan the QR code with Expo Go app on your Android device.

## 🏗️ Project Structure

```
hello-metal/
├── App.tsx                 # Main app component with navigation
├── index.ts                # Entry point
├── app.json                # Expo configuration
├── package.json            # Dependencies
├── tsconfig.json          # TypeScript configuration
├── contexts/
│   └── ThemeContext.tsx   # Theme management context
├── components/
│   └── ThemeToggle.tsx    # Theme toggle component
└── screens/
    ├── HomeScreen.tsx      # Home screen with buttons
    └── DogScreen.tsx      # Dog image display screen
```

## 🛠️ Technologies Used

- **React Native**: 0.81.5
- **Expo SDK**: ~54.0.23
- **React Navigation**: Stack navigator for routing
- **TypeScript**: Type-safe development
- **Expo Haptics**: Enhanced haptic feedback
- **React Native Animatable**: Smooth animations
- **React Native Gesture Handler**: Pull-to-refresh support

## 📝 Key Implementation Details

### Theme Management
- Context-based theme system supporting light, dark, and automatic modes
- Automatic theme follows system preferences
- Smooth theme transitions across all screens

### Navigation
- Stack navigator with custom headers
- Theme-aware navigation styling
- Proper back button handling

### API Integration
- Fetch API for dog images
- Error handling with retry functionality
- Loading states and user feedback

### Animations
- Entrance animations for screens
- Button press animations
- Image fade-in effects
- Smooth transitions

## 🎬 Screen Recording

https://drive.google.com/file/d/1qVfjBdJwvb5XBy16Yymq9Xl4CwXP2itU/view?usp=sharing

The screen recording demonstrates:
- Development process
- Testing on device
- Building and deployment
- All features in action

## 📱 QR Code for Android Build

![Alt text](image.png)

Scan this QR code with Expo Go or download the APK directly.

## 🔧 Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

## 📄 License

This project is created for assessment purposes.

## 👤 Author

Alexander Su

## 🙏 Acknowledgments

- [Dog CEO API](https://dog.ceo/api) for providing free dog images
- Expo team for the amazing development platform
- React Navigation for robust navigation solution

---

**Note**: Make sure to update the EAS project ID in `app.json` before building with EAS.

