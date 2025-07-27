import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  BarChart3,
  MapPin,
  Shield,
  Smartphone,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  Globe,
  HeadphonesIcon,
  TrendingUp,
  Users,
  Award,
  Truck,
  Building2,
  Play,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-sm opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                CourierPro
              </span>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Features
              </a>
              <a href="#solutions" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Solutions
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Pricing
              </a>
              <a href="#customers" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Customers
              </a>
              <a href="#resources" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Resources
              </a>
            </nav>
            <div className="flex items-center space-x-3">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 font-medium">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 text-sm font-medium">
                  <Award className="w-4 h-4 mr-2" />
                  Trusted by 50,000+ businesses globally
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                  Enterprise Courier
                  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Management Platform
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Transform your logistics operations with AI-powered routing, real-time visibility, and
                  enterprise-grade security. Deliver operational excellence at scale.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 h-14 shadow-xl shadow-blue-500/25 font-semibold"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 h-14 border-2 hover:bg-gray-50 font-semibold group bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600 font-medium">Uptime SLA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">40%</div>
                  <div className="text-sm text-gray-600 font-medium">Cost Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-3xl"></div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 backdrop-blur-sm">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Live Operations Dashboard</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600 font-medium">Live</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <Truck className="h-5 w-5 text-blue-600" />
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-900">2,847</div>
                        <div className="text-sm text-blue-700 font-medium">Active Deliveries</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-xs text-green-700 font-semibold">+12%</span>
                        </div>
                        <div className="text-2xl font-bold text-green-900">98.7%</div>
                        <div className="text-sm text-green-700 font-medium">Success Rate</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-900">Package delivered to Manhattan</span>
                        </div>
                        <span className="text-xs text-gray-500">2m ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-900">Route optimized for 15 stops</span>
                        </div>
                        <span className="text-xs text-gray-500">5m ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-900">New agent assigned to Brooklyn</span>
                        </div>
                        <span className="text-xs text-gray-500">8m ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Trusted by industry leaders worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
            {["TechCorp", "GlobalShip", "FastTrack", "LogiPro", "QuickSend", "DeliverNow"].map((company, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-400">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <div className="text-gray-600 font-medium">Global Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                10M+
              </div>
              <div className="text-gray-600 font-medium">Deliveries Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                150+
              </div>
              <div className="text-gray-600 font-medium">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <div className="text-gray-600 font-medium">Platform Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-blue-50 text-blue-700 border-blue-200 mb-6 px-4 py-2 text-sm font-medium">
              Platform Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Enterprise-Grade Logistics Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Built for scale, designed for efficiency. Our comprehensive platform delivers the tools you need to
              optimize every aspect of your courier operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-3">Intelligent Route Optimization</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  AI-powered algorithms reduce delivery time by up to 40% while minimizing fuel costs and maximizing
                  driver efficiency across your entire fleet.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-3">Advanced Analytics Suite</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Comprehensive dashboards with real-time KPIs, predictive analytics, and automated reporting to drive
                  data-driven decision making.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-3">Enterprise Security</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  SOC 2 Type II certified with end-to-end encryption, role-based access controls, and comprehensive
                  audit trails for complete data protection.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-3">Mobile-First Experience</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Native iOS and Android applications with offline capabilities, real-time synchronization, and
                  intuitive interfaces for all user roles.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-3">Global Scale & Integration</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Multi-region deployment with 99.9% uptime SLA, extensive API ecosystem, and seamless integration with
                  existing enterprise systems.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-3">Real-Time Operations</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Live tracking, instant notifications, and real-time collaboration tools that keep your entire
                  operation synchronized and responsive.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-green-50 text-green-700 border-green-200 mb-6 px-4 py-2 text-sm font-medium">
              Industry Solutions
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Tailored for Your Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Purpose-built solutions that address the unique challenges and requirements of different industries and
              business models.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:border-blue-200 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Enterprise Logistics</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Comprehensive solutions for large-scale operations with advanced fleet management, multi-location
                  coordination, and enterprise integrations.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Multi-tenant architecture
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Advanced workflow automation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Custom reporting & analytics
                  </li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:border-green-200 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">E-commerce Fulfillment</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Optimized for online retailers with same-day delivery, inventory integration, and customer experience
                  tools that drive satisfaction.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    E-commerce platform integration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Same-day delivery optimization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Customer notification system
                  </li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 hover:border-purple-200 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">On-Demand Services</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Perfect for food delivery, grocery services, and on-demand logistics with real-time matching and
                  dynamic pricing capabilities.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Dynamic driver matching
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Real-time demand forecasting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Flexible pricing models
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="customers" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-purple-50 text-purple-700 border-purple-200 mb-6 px-4 py-2 text-sm font-medium">
              Customer Success
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See how leading companies are transforming their logistics operations and achieving measurable results
              with CourierPro.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg">
                  "CourierPro has revolutionized our delivery operations. We've achieved a 45% reduction in delivery
                  times and our customer satisfaction scores have never been higher."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    JS
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">James Sullivan</div>
                    <div className="text-gray-600">VP Operations, GlobalShip Inc.</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg">
                  "The analytics and reporting capabilities have given us unprecedented visibility into our operations.
                  We can now make data-driven decisions that directly impact our bottom line."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    MR
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">Maria Rodriguez</div>
                    <div className="text-gray-600">COO, FastTrack Logistics</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg">
                  "Implementation was seamless and the support team is exceptional. CourierPro has become an integral
                  part of our daily operations and growth strategy."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    DK
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">David Kim</div>
                    <div className="text-gray-600">Founder, QuickSend Solutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-orange-50 text-orange-700 border-orange-200 mb-6 px-4 py-2 text-sm font-medium">
              Pricing Plans
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Transparent, Scalable Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your business needs. All plans include our core features with no hidden fees or
              setup costs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Professional</CardTitle>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <CardDescription className="mt-4 text-gray-600">Perfect for growing businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Up to 1,000 deliveries/month</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Real-time tracking & notifications</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Basic analytics dashboard</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Email support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Mobile apps included</span>
                  </div>
                </div>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 font-semibold">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative hover:border-blue-600 transition-all duration-300 shadow-lg bg-white">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-4 py-1 font-semibold">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Enterprise</CardTitle>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-gray-900">$299</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <CardDescription className="mt-4 text-gray-600">For scaling operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Up to 10,000 deliveries/month</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Advanced route optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Comprehensive analytics suite</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Priority support & phone</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">API access & integrations</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 font-semibold">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Custom</CardTitle>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-gray-900">Let's Talk</span>
                </div>
                <CardDescription className="mt-4 text-gray-600">For enterprise organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited deliveries</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Custom feature development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">24/7 premium support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">SLA guarantees</span>
                  </div>
                </div>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 font-semibold">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of businesses already using CourierPro to deliver operational excellence. Start your free
            trial today with full access to all enterprise features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 h-14 font-semibold shadow-xl"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 h-14 font-semibold bg-transparent"
            >
              <HeadphonesIcon className="mr-2 h-5 w-5" />
              Schedule Demo
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-8 text-blue-100 text-sm">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              No setup fees
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-sm opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className="ml-3 text-2xl font-bold">CourierPro</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                The most advanced courier management platform for modern logistics operations. Trusted by industry
                leaders worldwide.
              </p>
              <div className="flex space-x-4">
                {["LinkedIn", "Twitter", "Facebook", "YouTube"].map((social) => (
                  <div
                    key={social}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors"
                  >
                    <span className="text-sm font-medium">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-white">Product</h3>
              <div className="space-y-3 text-gray-400">
                <div className="hover:text-white cursor-pointer transition-colors">Features</div>
                <div className="hover:text-white cursor-pointer transition-colors">Pricing</div>
                <div className="hover:text-white cursor-pointer transition-colors">API Documentation</div>
                <div className="hover:text-white cursor-pointer transition-colors">Integrations</div>
                <div className="hover:text-white cursor-pointer transition-colors">Security</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-white">Solutions</h3>
              <div className="space-y-3 text-gray-400">
                <div className="hover:text-white cursor-pointer transition-colors">Enterprise</div>
                <div className="hover:text-white cursor-pointer transition-colors">E-commerce</div>
                <div className="hover:text-white cursor-pointer transition-colors">On-Demand</div>
                <div className="hover:text-white cursor-pointer transition-colors">Healthcare</div>
                <div className="hover:text-white cursor-pointer transition-colors">Food Delivery</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-white">Support</h3>
              <div className="space-y-3 text-gray-400">
                <div className="hover:text-white cursor-pointer transition-colors">Help Center</div>
                <div className="hover:text-white cursor-pointer transition-colors">Contact Support</div>
                <div className="hover:text-white cursor-pointer transition-colors">System Status</div>
                <div className="hover:text-white cursor-pointer transition-colors">Community</div>
                <div className="hover:text-white cursor-pointer transition-colors">Training</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col lg:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 CourierPro. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 lg:mt-0 text-gray-400">
              <div className="hover:text-white cursor-pointer transition-colors">Privacy Policy</div>
              <div className="hover:text-white cursor-pointer transition-colors">Terms of Service</div>
              <div className="hover:text-white cursor-pointer transition-colors">Cookie Policy</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
