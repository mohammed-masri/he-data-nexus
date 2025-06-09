import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Shield,
  Users,
  Database,
  Brain,
  Globe,
  ChevronRight,
  LogIn,
  BookOpen,
  GraduationCap,
  FileText,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import ServiceCard from "@/components/ServiceCard";
import HorizontalServiceCard from "@/components/HorizontalServiceCard";
import { Link } from "react-router-dom";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-ds-bg">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-ds-border"
            : "bg-[#FAFAF9]/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src="https://ec.shj.ae/wp-content/themes/sec/assets/images/logo.svg"
                alt="Government of Sharjah Logo"
                className="h-8 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-ds-text-primary">
                  Government of Sharjah
                </h1>
                <p className="text-xs text-ds-text-secondary hidden md:block">
                  Sharjah's Council for Higher Education and Scientific Research
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-sm text-ds-text-secondary hover:text-ds-primary transition-colors">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">EN</span>
              </button>
              <Button
                variant="outline"
                size="sm"
                className="border-ds-primary text-ds-primary hover:bg-ds-primary hover:text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ds-text-primary mb-6 leading-tight">
            Smart Education
            <br />
            <span className="text-ds-primary">Governance Platform</span>
          </h1>

          <div className="max-w-4xl mx-auto space-y-6 mb-12">
            <p className="text-lg sm:text-xl lg:text-2xl text-ds-text-secondary font-medium">
              Aligned with the vision of the Sharjah Council for Higher
              Education and Scientific Research to elevate academic quality and
              institutional excellence
            </p>
            <p className="text-base sm:text-lg text-ds-text-muted leading-relaxed">
              Transform higher education data management and governance in
              Sharjah through intelligent automation, evidence-based decision
              making, and seamless institutional integration.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 space-y-4 sm:space-y-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-ds-text-primary">
              Featured Services
            </h2>
            <div className="flex space-x-3">
              <button className="w-10 h-10 rounded-full border border-ds-border flex items-center justify-center hover:bg-ds-secondary/50 transition-colors">
                <ArrowLeft className="w-5 h-5 text-ds-text-secondary" />
              </button>
              <button className="w-10 h-10 rounded-full bg-ds-primary flex items-center justify-center text-white hover:bg-ds-primary-dark transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Link to="/institution/onboarding">
                <HorizontalServiceCard
                  title="Request Institution Onboarding"
                  icon={Users}
                  onCardClick={() =>
                    console.log("Institution onboarding clicked")
                  }
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-16 bg-ds-bg-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-ds-text-primary mb-4">
              Platform Objectives
            </h2>
            <p className="text-base sm:text-lg text-ds-text-secondary max-w-3xl mx-auto">
              Our comprehensive platform is designed to transform higher
              education data management and governance in Sharjah through four
              key strategic objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border border-ds-border hover:shadow-lg transition-shadow bg-white hover-lift">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-active-blue-50 flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-active-blue-500" />
                </div>
                <CardTitle className="text-xl text-ds-text-primary">
                  Strengthen Decision-Making
                </CardTitle>
                <CardDescription className="text-ds-text-secondary">
                  Policy formulation and institutional improvement using
                  accurate, comprehensive, and timely data
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-ds-border hover:shadow-lg transition-shadow bg-white hover-lift">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-active-purple-50 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-active-purple-500" />
                </div>
                <CardTitle className="text-xl text-ds-text-primary">
                  High-Quality Data Standards
                </CardTitle>
                <CardDescription className="text-ds-text-secondary">
                  Promote data excellence to meet local and international
                  academic benchmarks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-ds-border hover:shadow-lg transition-shadow bg-white hover-lift">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-active-teal-50 flex items-center justify-center mb-4">
                  <Database className="w-8 h-8 text-active-teal-500" />
                </div>
                <CardTitle className="text-xl text-ds-text-primary">
                  Seamless Integration
                </CardTitle>
                <CardDescription className="text-ds-text-secondary">
                  Institution-friendly data sharing that works autonomously with
                  existing systems—eliminating redundancy and minimizing manual
                  effort
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-ds-border hover:shadow-lg transition-shadow bg-white hover-lift">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-active-orange-50 flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-active-orange-500" />
                </div>
                <CardTitle className="text-xl text-ds-text-primary">
                  Actionable Intelligence
                </CardTitle>
                <CardDescription className="text-ds-text-secondary">
                  Transform data into insights—enabling evidence-based policy
                  and enhanced institutional decision-making, performance
                  tracking, and academic planning
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-ds-text-primary mb-6">
            Ready to Transform Your Institution's Data Governance?
          </h2>
          <p className="text-base sm:text-lg text-ds-text-secondary mb-8">
            Join the Smart Education Governance Platform and be part of
            Sharjah's vision for academic excellence through intelligent data
            management and evidence-based decision making.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-ds-primary hover:bg-ds-primary-dark text-white px-8 py-3 rounded-lg text-lg"
              asChild
            >
              <Link to="/regulator">
                Governance Portal
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-ds-primary text-ds-primary hover:bg-ds-primary hover:text-white px-8 py-3 rounded-lg text-lg"
              asChild
            >
              <Link to="/institution">Institution Portal</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ds-text-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://ec.shj.ae/wp-content/themes/sec/assets/images/logo.svg"
                  alt="Government of Sharjah Logo"
                  className="h-8 w-auto filter brightness-0 invert"
                />
                <span className="text-xl font-bold">Government of Sharjah</span>
              </div>
              <p className="text-ds-text-muted text-sm">
                Smart Education Governance Platform for advancing academic
                excellence in Sharjah.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform Services</h3>
              <ul className="space-y-2 text-sm text-ds-text-muted">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Institution Onboarding
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Data Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Performance Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Compliance Monitoring
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support & Resources</h3>
              <ul className="space-y-2 text-sm text-ds-text-muted">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Training Resources
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-ds-border mt-8 pt-8 text-center text-sm text-ds-text-muted">
            © 2025 Government of Sharjah. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
