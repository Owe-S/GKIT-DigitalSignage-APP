# GKIT Digital Signage App

Welcome to the **GKIT Digital Signage App** documentation! This platform provides a modern, multi-tenant digital signage solution specifically designed for golf clubs.

## 🎯 Overview

The GKIT Digital Signage App is a cloud-native, Firebase-powered application that allows golf clubs to display dynamic content on screens throughout their facilities. Built with React and TypeScript, it offers a flexible widget system and customizable slide layouts.

## ✨ Key Features

- **🔥 Firebase-Powered**: Real-time updates using Firestore
- **🎨 Customizable Layouts**: Multiple slide layouts (Fullscreen, Sidebar, Grid)
- **🧩 Widget System**: Modular widgets for tee times, weather, news, and more
- **🏢 Multi-Tenant**: Single codebase, multiple clubs
- **📱 Responsive**: Works on any screen size
- **🔐 Secure Admin**: Protected admin dashboard for configuration
- **⚡ Real-Time**: Live content updates without page refresh

## 🚀 Quick Start

Get started in 3 simple steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Owe-S/GKIT-DigitalSignage-APP.git
   cd GKIT-DigitalSignage-APP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Update `services/firebaseConfig.ts` with your Firebase credentials
   - Set `USE_FIREBASE = true`

4. **Run locally**
   ```bash
   npm run dev
   ```

Visit [Getting Started](getting-started/quickstart.md) for detailed instructions.

## 🏗️ Architecture

The app follows a modern, scalable architecture:

- **Frontend**: React + TypeScript + Vite
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting
- **Deployment**: GitHub Actions (optional)

Learn more in the [Architecture](architecture/overview.md) section.

## 📖 Documentation Sections

- **[Getting Started](getting-started/quickstart.md)** - Installation and setup
- **[Deployment](deployment/overview.md)** - Deploy to production
- **[Architecture](architecture/overview.md)** - Technical architecture
- **[Features](features/display.md)** - Feature documentation
- **[API Reference](api/overview.md)** - API documentation
- **[Contributing](contributing/guidelines.md)** - Contribution guidelines

## 🎓 Use Cases

Perfect for:

- **Clubhouse Entrances**: Welcome screens with tee times
- **Pro Shop**: Display special offers and promotions
- **Restaurant**: Daily menu and event announcements
- **Practice Range**: Live tournament leaderboards
- **Locker Rooms**: Weather forecasts and course conditions

## 🤝 Support

Need help? Here are your options:

- 📧 Email: support@golfklubb-it.com
- 🐛 Issues: [GitHub Issues](https://github.com/Owe-S/GKIT-DigitalSignage-APP/issues)
- 📚 Documentation: You're reading it!

## 📄 License

This project is proprietary software owned by Golfklubb-IT.

---

**Ready to get started?** Head over to the [Quick Start Guide](getting-started/quickstart.md)!
