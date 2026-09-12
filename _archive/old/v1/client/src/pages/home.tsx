import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileSearch, 
  Shield, 
  Bot, 
  RefreshCw, 
  Search, 
  BookOpen, 
  Github, 
  Menu,
  AlertTriangle,
  CheckCircle,
  Folder,
  FileCode,
  GitBranch
} from "lucide-react";
import { LegalAnalyzer } from "@/components/legal-analyzer";
import { LawDatabase } from "@/components/law-database";

export default function Home() {
  const scrollToAnalyzer = () => {
    document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToLaws = () => {
    document.getElementById("laws")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-light-bg text-dark-text font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <FileSearch className="text-trust-blue text-2xl mr-3" />
                <span className="text-xl font-bold text-trust-blue" data-testid="text-app-title">
                  Law Lens
                </span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={scrollToAnalyzer}
                className="text-dark-text hover:text-trust-blue transition-colors font-medium"
                data-testid="link-analyzer"
              >
                Analyzer
              </button>
              <button 
                onClick={scrollToLaws}
                className="text-dark-text hover:text-trust-blue transition-colors font-medium"
                data-testid="link-laws"
              >
                Law Database
              </button>
              <a 
                href="#about" 
                className="text-dark-text hover:text-trust-blue transition-colors font-medium"
                data-testid="link-about"
              >
                About
              </a>
              <Button 
                asChild 
                className="bg-accent-purple text-white hover:bg-purple-700"
                data-testid="button-github"
              >
                <a href="#github">
                  <Github className="mr-2 h-4 w-4" />
                  View Source
                </a>
              </Button>
            </nav>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="text-xl" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-trust-blue to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
              See Through Laws to Understand Your Impact
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto" data-testid="text-hero-description">
              Focus your view on how current and proposed laws from the USA and India affect your personal situation with AI-powered analysis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={scrollToAnalyzer}
                className="bg-legal-green hover:bg-green-600 text-white font-semibold py-4 px-8"
                data-testid="button-hero-analyze"
              >
                <Search className="mr-2 h-5 w-5" />
                Focus Your Analysis
              </Button>
              <Button 
                onClick={scrollToLaws}
                variant="secondary"
                className="bg-white text-trust-blue hover:bg-gray-50 font-semibold py-4 px-8"
                data-testid="button-hero-browse"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Laws
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center" data-testid="trust-indicator-transparency">
              <div className="bg-trust-blue text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Transparent & Open Source</h3>
              <p className="text-gray-600">All code and AI prompts publicly available on GitHub for full transparency</p>
            </div>
            <div className="flex flex-col items-center" data-testid="trust-indicator-ai">
              <div className="bg-legal-green text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Bot className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">Advanced Gemini AI with RAG technology for comprehensive legal insights</p>
            </div>
            <div className="flex flex-col items-center" data-testid="trust-indicator-updates">
              <div className="bg-accent-purple text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <RefreshCw className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Always Updated</h3>
              <p className="text-gray-600">Weekly automated updates of current and proposed legislation</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Legal Impact Analyzer */}
        <LegalAnalyzer />

        {/* Law Database Viewer */}
        <LawDatabase />

        {/* GitHub Integration */}
        <section id="github" className="mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4" data-testid="text-github-title">
                  Open Source & Transparent
                </h2>
                <p className="text-gray-300 text-lg mb-6" data-testid="text-github-description">
                  All source code, AI prompts, and legal processing logic are publicly available on GitHub. 
                  Contribute to making legal analysis more accessible and transparent.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild
                    className="bg-white text-gray-900 hover:bg-gray-100 font-semibold"
                    data-testid="button-view-repo"
                  >
                    <a href="#">
                      <Github className="mr-2 h-4 w-4" />
                      View Repository
                    </a>
                  </Button>
                  <Button 
                    asChild
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-gray-900 font-semibold"
                    data-testid="button-contribute"
                  >
                    <a href="#">
                      <GitBranch className="mr-2 h-4 w-4" />
                      Contribute
                    </a>
                  </Button>
                </div>
              </div>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Github className="text-xl mr-3" />
                    <span className="font-mono text-sm" data-testid="text-repo-path">legal-impact-analyzer/</span>
                  </div>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex items-center">
                      <Folder className="text-yellow-400 mr-2 h-4 w-4" />
                      <span>src/prompts/</span>
                    </div>
                    <div className="flex items-center ml-4">
                      <FileCode className="text-blue-400 mr-2 h-4 w-4" />
                      <span>legal-analysis.prompt</span>
                    </div>
                    <div className="flex items-center ml-4">
                      <FileCode className="text-blue-400 mr-2 h-4 w-4" />
                      <span>impact-assessment.prompt</span>
                    </div>
                    <div className="flex items-center">
                      <Folder className="text-yellow-400 mr-2 h-4 w-4" />
                      <span>src/data-fetchers/</span>
                    </div>
                    <div className="flex items-center">
                      <Folder className="text-yellow-400 mr-2 h-4 w-4" />
                      <span>src/ai-integration/</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <FileSearch className="text-trust-blue text-2xl mr-3" />
                <span className="text-xl font-bold" data-testid="text-footer-title">Law Lens</span>
              </div>
              <p className="text-gray-400 mb-4" data-testid="text-footer-description">
                Open-source legal lens helping individuals focus on how laws affect their personal situations.
              </p>
              <Alert className="bg-red-900/20 border-red-500/30">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription>
                  <h4 className="font-semibold text-red-400 mb-2">Important Disclaimer</h4>
                  <p className="text-sm text-gray-300">
                    This tool provides educational information only and does not constitute legal advice. 
                    Always consult qualified legal professionals for specific legal matters.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">User Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contributing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal Sources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p data-testid="text-copyright">&copy; 2024 Law Lens. Open source project under Apache 2.0 License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
