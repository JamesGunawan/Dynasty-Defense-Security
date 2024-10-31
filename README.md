# Dynasty Defense Security
Dynasty Defense Security - Business case

Wireframe link : https://www.figma.com/design/apiRqwUQ7A4uDVWWhbMPnw/Dynasty-Defense-Security-Wireframe?node-id=0-1&t=AliTYaMrh380279m-1

# Dynasty Defense Security System

A web-based security management system for managing building alarms and security configurations.

## Features

### User Authentication
- User registration with email and password
- Secure login system with password requirements
- User session management
- Password requirements enforcement:
  - Minimum 16 characters
  - Must include capital letter
  - Must include special character
- Guest mode access option

### Admin Features
- Create an admin account by typing !AdminAccount:#**username**
- Dedicated admin dashboard
- User management capabilities:
  - View all users
  - Delete user accounts
  - Monitor user status
- Admin-specific interface
- Special admin account creation with prefix system
- Protected admin routes

### User Account Management
- User settings panel
- Account deletion functionality
- Logout capability
- Username display
- Individual user data storage
- Guest mode management
- User status tracking (online/offline)

### Building Management
- Add multiple buildings
- Customize building names
- Delete buildings
- Data persistence for each user's buildings
- Real-time building status monitoring

### Floor Management
- Add multiple floors to each building
- Edit floor names with inline editing
- Delete floors
- Expandable/collapsible floor sections
- Floor-specific configurations

### Alarm System
- Add multiple alarms to each floor
- Configure alarm settings:
  - Alarm type
  - Time settings
  - Delay settings
  - Location specification
- Real-time status monitoring:
  - Online (green) - All fields completed
  - Incomplete (yellow) - Partial configuration with warning indicator
  - Offline (red) - No configuration
- Delete individual alarms
- Refresh capability for alarm status
- Visual warning indicators

### Data Persistence
- Local storage implementation
- User-specific data saving
- Automatic data saving on changes
- Data loading on login
- Separate data storage for admin and regular users

### User Interface
- Responsive sidebar navigation
- Clean and intuitive design
- Warning indicators for incomplete configurations
- Easy-to-use input fields
- Visual status indicators
- Red and black theme with shadow effects
- Custom scrollbars
- Animated elements
- Responsive design elements

### Security Features
- Individual data storage per user
- Protected routes
- Session management
- Secure password requirements
- Admin/User role separation

### Navigation Features
- Sidebar menu
- Back navigation
- Home button functionality
- User settings accessibility
- Quick access menu

## Technical Features
- Responsive design
- Modern CSS styling with animations
- Dynamic DOM manipulation
- Event delegation for efficient event handling
- Local storage management
- Real-time status updates
- Input validation
- Error handling
- Custom scrollbar implementation
- Shadow effects and visual feedback
- Modular code structure

## Installation

### Prerequisites
- Git installed on your local machine
- Modern web browser (Chrome recommended)
- Local development environment

### Clone the Repository
1. Open your terminal/command prompt
2. Clone the repository
```bash
git clone https://github.com/yourusername/Dynasty-Defense-Security.git

## Dependencies
- Modern web browser
- Local storage capability
- JavaScript enabled
- CSS3 support
- HTML5 support

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
