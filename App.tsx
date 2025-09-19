import React, { useState, useEffect, useCallback } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Header from './components/Header';
import { Page, AnalysisResult } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(loggedIn);
    const storedHistory = localStorage.getItem('analysisHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  const handleNavigation = (page: Page) => {
    setSelectedAnalysis(null);
    setCurrentPage(page);
  };
  
  const addAnalysisToHistory = useCallback((analysis: AnalysisResult) => {
    const newHistory = [analysis, ...history.slice(0, 9)]; // Keep last 10
    setHistory(newHistory);
    localStorage.setItem('analysisHistory', JSON.stringify(newHistory));
  }, [history]);

  const viewAnalysisFromHistory = (analysis: AnalysisResult) => {
    setSelectedAnalysis(analysis);
    setCurrentPage(Page.DASHBOARD);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <Header onLogout={handleLogout} onNavigate={handleNavigation} />
      <main className="p-4 sm:p-6 lg:p-8">
        {currentPage === Page.DASHBOARD && <Dashboard addAnalysisToHistory={addAnalysisToHistory} initialAnalysis={selectedAnalysis} />}
        {currentPage === Page.HISTORY && <History history={history} onViewAnalysis={viewAnalysisFromHistory} />}
      </main>
    </div>
  );
};

export default App;