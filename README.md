
Built by https://www.blackbox.ai

---

# App de Marcadores - Google Earth

## Project Overview
The **App de Marcadores** is a web application that integrates with Google Earth to allow users to navigate to predefined markers across a geographical area. Each marker provides additional information, including a name and description. The markers are displayed in a sidebar and can be selected to load their respective locations in a Google Earth map view.

## Installation
To set up this application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd app-de-marcadores
   ```

2. **Open the `index.html` file in a web browser**:
   Simply double-click on the `index.html` file to launch the application. No additional server setup is required.

## Usage
1. Upon opening the application, a list of markers will be displayed in the left sidebar.
2. Click on any marker to view its details and to load its location on the Google Earth map.
3. You can navigate through markers using the keyboard arrow keys.
4. If the map fails to load, you can retry by clicking the "Tentar novamente" button.

## Features
- Lists markers with names, descriptions, and coordinates.
- Displays the selected marker's location in Google Earth.
- Includes loading indicators and error messages for better user experience.
- Keyboard navigation for accessibility (Arrow Up/Down).
- Modular design for easy addition or removal of markers.

## Dependencies
This project does not have any external dependencies defined in a package.json file, as it primarily consists of HTML, CSS, and JavaScript files. Basic web technologies are utilized without any third-party libraries or frameworks.

## Project Structure
```
/app-de-marcadores
├── index.html         # Main HTML file
├── styles.css         # Styles for the application
└── script.js          # JavaScript file containing marker logic and functionality
```

### File Descriptions:
- **index.html**: The main structure of the web app, including layout and integration with styles and scripts.
- **styles.css**: Contains all of the CSS styles used to enhance the visual appearance of the application.
- **script.js**: Includes the logic for handling marker data, loading maps, and managing user interactions.

## Conclusion
The **App de Marcadores** provides a user-friendly interface to explore specific locations via Google Earth, making it a powerful tool for educational and operational uses. For any contributions or suggestions, please feel free to reach out.