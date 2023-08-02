## Fairdrive Architecture
The Fairdrive application is built using React and Next.js. Here is a high-level overview of the application architecture based on the files I analyzed:

*_app.tsx*: This is the main application component in Next.js. It's used to initialize pages. It can be used to keep state when navigating between pages, for example.

*_document.tsx*: This is a custom Document in Next.js. It's used to augment the application's <html> and <body> tags.

*Contexts*: The application uses the Context API for state management. There are several contexts defined, each encapsulating a different part of the application state:
- **UserContext.tsx**: Manages the state related to the user.
- **PodContext.tsx**: Manages the state related to the pod.
- **FdpStorageContext.tsx**: Manages the state related to the FDP storage.
- **ThemeContext.tsx**: Manages the state related to the application theme.
- **SearchContext.tsx**: Manages the state related to search functionality.
- **Matomo.tsx**: Manages the state related to Matomo, a web analytics platform.


**APIs**: The application interacts with the backend through several APIs, encapsulated in the api directory:
- **customAxios.ts**: Defines a custom instance of Axios for making HTTP requests.
- **directory.ts**: Contains functions for interacting with directories.
- **files.ts**: Contains functions for interacting with files.
- **pod.ts**: Contains functions for interacting with pods.
- **user.ts**: Contains functions for interacting with user data.

The application's architecture follows a modular design, with clear separation of concerns. State management is handled using the Context API, and interaction with the backend is encapsulated in API modules. This makes the codebase easier to maintain and extend.

## Getting Help

If you need help using Fairdrive, check out our [User Guide](USER-GUIDE.md) and [FAQ](FAQ.md). 
Start [here](GETTING-STARTED.md) or see [Design](DESIGN.md), [Functionality](FUNCTIONALITY.md) or [Architecture](ARCHITECTURE.md).
Developers can check [Development Instructions](DEVELOPMENT.md).

If you can't find the answer to your question, feel free to [contact us](CONTACT.md).
