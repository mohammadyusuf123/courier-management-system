# 🚚 Courier & Parcel Management System

A comprehensive, modern courier and parcel management system built with Next.js 15, featuring real-time tracking, role-based dashboards, and Google Maps integration.

![Courier Management System](https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&h=600&fit=crop)

## 🌟 Features

### 🔐 **Multi-Role Authentication System**
- **Admin Panel**: Complete system oversight and management
- **Delivery Agent Dashboard**: Route optimization and parcel management
- **Customer Portal**: Parcel booking and real-time tracking

### 📦 **Parcel Management**
- Create, edit, and delete parcels
- Real-time status updates
- Barcode/QR code generation
- Automated pricing calculation
- Bulk operations and export functionality

### 🗺️ **Advanced Tracking & Maps**
- Real-time GPS tracking simulation
- Google Maps integration
- Route optimization for delivery agents
- Interactive tracking timeline
- Delivery proof with photos

### 📊 **Analytics & Reporting**
- Revenue and performance dashboards
- Delivery analytics and KPIs
- Custom report generation
- Data export capabilities
- Interactive charts and visualizations

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Dark/Light theme support
- Smooth animations and transitions
- Professional gradient designs
- Accessibility-first approach

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Modern component library
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization

### **Backend & APIs**
- **Next.js API Routes** - Server-side functionality
- **WebSocket** - Real-time updates
- **Google Maps API** - Location services
- **Geolocation API** - GPS tracking

### **State Management**
- **React Context** - Global state management
- **React Hooks** - Local state and effects
- **Custom Hooks** - Reusable logic

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Maps API key (optional for full functionality)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/yourusername/courier-management-system.git
cd courier-management-system
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your environment variables:
\`\`\`env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

4. **Run the development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Demo Accounts

### Admin Access
- **Email**: admin@courier.com
- **Password**: admin123
- **Features**: Full system access, user management, analytics

### Delivery Agent Access
- **Email**: agent@courier.com
- **Password**: agent123
- **Features**: Parcel management, route optimization, delivery updates

### Customer Access
- **Email**: customer@courier.com
- **Password**: customer123
- **Features**: Parcel booking, tracking, history

## 📱 Usage Guide

### For Administrators
1. **Dashboard Overview**: Monitor system-wide metrics and KPIs
2. **Manage Parcels**: Create, assign, and track all parcels
3. **User Management**: Add/edit delivery agents and customers
4. **Analytics**: View detailed reports and performance metrics
5. **System Settings**: Configure system parameters and preferences

### For Delivery Agents
1. **View Assigned Parcels**: See all parcels assigned for delivery
2. **Route Optimization**: Get optimized delivery routes via Google Maps
3. **Update Status**: Mark parcels as picked up, in transit, or delivered
4. **Delivery History**: View past deliveries and performance metrics

### For Customers
1. **Book Parcels**: Create new parcel delivery requests
2. **Track Parcels**: Real-time tracking with GPS location
3. **View History**: Access complete booking and delivery history
4. **Profile Management**: Update personal information and preferences

## 🏗️ Project Structure

\`\`\`
courier-management-system/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin panel pages
│   ├── agent/                    # Agent dashboard pages
│   ├── customer/                 # Customer portal pages
│   ├── auth/                     # Authentication pages
│   ├── api/                      # API routes
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── ui/                       # UI components (shadcn/ui)
│   ├── layouts/                  # Layout components
│   ├── charts/                   # Chart components
│   ├── tracking/                 # Tracking components
│   └── providers/                # Context providers
├── lib/                          # Utility functions
├── hooks/                        # Custom React hooks
├── types/                        # TypeScript type definitions
└── public/                       # Static assets
\`\`\`

## 🎨 Key Features Showcase

### Real-time Tracking
- Live GPS simulation with moving markers
- Interactive timeline showing delivery progress
- Estimated delivery time calculations
- Push notifications for status updates

### Advanced Analytics
- Revenue tracking and forecasting
- Delivery performance metrics
- Agent productivity analysis
- Customer satisfaction insights

### Route Optimization
- Google Maps integration for optimal routes
- Traffic-aware routing suggestions
- Multi-stop delivery planning
- Distance and time calculations

### Modern UI Components
- Responsive data tables with sorting/filtering
- Interactive charts and graphs
- Modal dialogs for CRUD operations
- Toast notifications for user feedback

## 🔧 Configuration

### Google Maps Setup
1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API
   - Directions API
3. Add the API key to your `.env.local` file

### Customization
- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Animations**: Adjust animation settings in `globals.css`
- **Layout**: Customize layouts in the `components/layouts/` directory

## 📊 Performance Features

- **Server-Side Rendering** for optimal SEO and performance
- **Code Splitting** for faster page loads
- **Image Optimization** with Next.js Image component
- **Lazy Loading** for improved user experience
- **Responsive Design** for all device sizes

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 🐛 Known Issues & Roadmap

### Current Limitations
- Demo data is used (no persistent database)
- Google Maps requires API key for full functionality
- Real-time features are simulated

### Upcoming Features
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Email/SMS notifications
- [ ] Mobile app version
- [ ] Payment gateway integration
- [ ] Advanced reporting features
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons
- [Recharts](https://recharts.org/) - Composable charting library

## 📞 Support

For support, email support@courier-system.com or join our [Discord community](https://discord.gg/courier-system).

---

**Built with ❤️ by the Courier Management Team**

[Live Demo](https://courier-management-demo.vercel.app) | [Documentation](https://docs.courier-system.com) | [API Reference](https://api.courier-system.com)
