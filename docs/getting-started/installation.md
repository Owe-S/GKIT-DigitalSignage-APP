# Installation Guide

Complete installation guide for the GKIT Digital Signage App.

## System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.15+, or Linux
- **Node.js**: Version 18.0 or higher
- **RAM**: 4GB minimum
- **Storage**: 500MB free space

### Recommended
- **Node.js**: Version 20.x LTS
- **RAM**: 8GB or more
- **Browser**: Chrome, Firefox, or Edge (latest versions)

## Installation Steps

### 1. Install Node.js

If you don't have Node.js installed:

**Windows/macOS:**
Download from [nodejs.org](https://nodejs.org/)

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify installation:
```bash
node --version
npm --version
```

### 2. Clone the Repository

**Using HTTPS:**
```bash
git clone https://github.com/Owe-S/GKIT-DigitalSignage-APP.git
```

**Using SSH:**
```bash
git clone git@github.com:Owe-S/GKIT-DigitalSignage-APP.git
```

Navigate to the project:
```bash
cd GKIT-DigitalSignage-APP
```

### 3. Install Project Dependencies

```bash
npm install
```

This installs:
- React and React DOM
- React Router
- Firebase SDK
- TypeScript
- Vite (build tool)
- Lucide React (icons)

### 4. Verify Installation

Run the development server:
```bash
npm run dev
```

You should see output like:
```
VITE v5.1.4  ready in 432 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

## Optional: Install MkDocs (for documentation)

If you want to build/edit documentation locally:

```bash
pip install mkdocs mkdocs-material
```

Build docs:
```bash
mkdocs build
```

Serve docs locally:
```bash
mkdocs serve
```

## Next Steps

- [Quick Start Guide](quickstart.md)
- [Configuration](configuration.md)
- [Deployment](../deployment/overview.md)

## Common Issues

### npm install fails

**Solution**: Clear npm cache and retry:
```bash
npm cache clean --force
npm install
```

### Port 5173 already in use

**Solution**: Kill the process or use a different port:
```bash
npm run dev -- --port 3000
```

### Permission errors on Linux/macOS

**Solution**: Don't use sudo. Fix npm permissions:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```
