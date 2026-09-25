# Caravanas App

Caravanas is a mobile application built with **React Native and Expo**.

The project was developed to provide a mobile interface for managing and accessing caravan-related information. The application consumes a local database and was designed with a focus on reliability, maintainability, and a simple user experience.

> **Note:** This project was made for a local company and is primarily focused on the application and its integration with a local database.

---

## Features

* . Android mobile application using React Native
* . Built with Expo
* . Integration with local database (offline usage)
* . Data retrieval and management
* . Android APK support
* . Modular project structure

---

## Tech Stack

### Mobile

* **React Native**
* **Expo**
* **JavaScript (only for Services) & TypeScript**
* **Expo Modules**

### Backend

The mobile application communicates with a local database

* SQLite

### Development Tools

* xlsx (Data export to Excel)
* npm

---

## Architecture

The application follows a client-server architecture:

```text
┌──────────────────────┐
│                      │
│    Caravanas App     │
│   React Native/Expo  │
│                      │
└──────────┬───────────┘
           │
           │ Query via Services
           ▼
┌────────────────────────────┐
│                            │
│       Local Database       │
│                            │
└────────────────────────────┘
```

The mobile application is responsible for the presentation layer and communication with the backend.

---

## Getting Started

### Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* Expo CLI
* Expo Go (if you want to run the App locally, install it in your phone)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/HttpsSebas/App_Caravanas.git
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

Start the Expo development server:

```bash
npx expo start
```

You can then run the application using:

* Android Emulator
* Physical Android device
* Expo development tools

For Android:

```bash
npx expo start --android
```

For Expo Go (Android):
```bash
npx expo start
```

---

## Android APK

The project can also be compiled into an Android APK for direct installation on an Android device.

Using Expo Application Services:

```bash
eas build -p android --profile preview
```

Depending on the EAS configuration, this can generate an APK suitable for testing and direct installation.

> The APK is intended for direct distribution outside the Google Play Store.

---

## Backend Integration

Caravanas App communicates with the backend through DB queries.

The mobile application acts as the client while the backend handles the application's core business logic and data management.

---

---

## Testing

To run the project locally:

```bash
npm install
npx expo start
```

Then test the application using an Android emulator or physical device.

---

Also make sure that:

* The phone and computer are connected to the same network.

---

---

## Future Improvements

Possible future improvements will be attached to customer needs

---

## What I Learned

This project provided practical experience working with:

* React Native application development
* Expo
* Mobile-to-database communication
* Android builds and APK generation
* Debugging Android applications
* Working with physical Android devices
* Managing dependencies in a JavaScript project
* Working with local databases (offline)

---

## Author

**Sebastian Infante**

Backend Developer in training, focused on building practical applications and learning how to design and develop reliable backend systems.

---

## License

This project is available for educational and portfolio purposes.

If you intend to use or distribute this project commercially, please contact the author.
