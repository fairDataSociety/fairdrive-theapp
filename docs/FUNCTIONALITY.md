# Fairdrive Functionality 

The Fairdrive application is a decentralized personal data storage system that allows users to manage their data in a secure and private manner. Here's a more detailed breakdown of the functionalities based on the file analysis:

**User Management**: The application allows users to manage their profiles. This includes functionalities like login, logout, and user profile management. This is primarily handled in the *UserContext.tsx* file.

**Pod Management**: Pods are the basic unit of storage in Fairdrive. Users can create, delete, and manage their pods. This is handled in the *PodContext.tsx* file and the *pod.ts* file in the api directory.

**File and Directory Management**: Users can create, delete, and manage files and directories within their pods. This is handled in the *files.ts* and *directory.ts* files in the api directory.

**FDP Storage**: The FairDataProtocol (FDP) storage is the underlying storage system. Users can interact with the FDP storage through the application. This is handled in the FdpStorageContext.tsx file.

**Search Functionality**: Users can search their pods, files, and directories. This is handled in the *SearchContext.tsx* file.

**Theme Management**: The application allows users to switch between different themes. This is handled in the *ThemeContext.tsx* file.

**Analytics**: The application uses Matomo for web analytics. This is handled in the *Matomo.tsx* file.

## Getting Help

If you need help using Fairdrive, check out our [User Guide](USER-GUIDE.md) and [FAQ](FAQ.md). 
Start [here](GETTING-STARTED.md) or see [Design](DESIGN.md), [Functionality](FUNCTIONALITY.md) or [Architecture](ARCHITECTURE.md). 
Developers can check [Development Instructions](DEVELOPMENT.md).

If you can't find the answer to your question, feel free to [contact us](CONTACT.md).
