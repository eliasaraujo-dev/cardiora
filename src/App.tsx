import { useState } from 'react'
import './App.css'
import PatientForm from './components/PatientForm'
import RiskAnalysis from './components/RiskAnalysis'
import RecommendationPanel from './components/RecommendationPanel'
import { PatientData } from './types'
import { analyzeRisk, getRecommendations } from './services/cardioApi'

function App() {
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const [riskAnalysis, setRiskAnalysis] = useState<string>('')
  const [recommendations, setRecommendations] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'form' | 'analysis' | 'recommendations'>('form')

  const handlePatientSubmit = async (data: PatientData) => {
    setPatientData(data)
    setIsLoading(true)
    setActiveTab('analysis')
    
    try {
      const result = await analyzeRisk(data)
      setRiskAnalysis(result.analysis)
    } catch (error) {
      console.error('Error analyzing risk:', error)
      const message = error instanceof Error ? error.message : 'Erro desconhecido'
      setRiskAnalysis(`Erro ao analisar risco: ${message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetRecommendations = async () => {
    if (!patientData) return
    
    setIsLoading(true)
    setActiveTab('recommendations')
    
    try {
      const result = await getRecommendations(patientData)
      setRecommendations(result.recommendations)
    } catch (error) {
      console.error('Error getting recommendations:', error)
      const message = error instanceof Error ? error.message : 'Erro desconhecido'
      setRecommendations(`Erro ao obter recomendações: ${message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewAnalysis = () => {
    setPatientData(null)
    setRiskAnalysis('')
    setRecommendations('')
    setActiveTab('form')
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🫀 Cardiora AI</h1>
          <p>Sistema de Análise Preditiva para Riscos Cardiovasculares</p>
        </div>
      </header>

      <nav className="app-nav">
        <button 
          className={`nav-btn ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          Dados do Paciente
        </button>
        {patientData && (
          <>
            <button 
              className={`nav-btn ${activeTab === 'analysis' ? 'active' : ''}`}
              onClick={() => setActiveTab('analysis')}
            >
              Análise de Risco
            </button>
            <button 
              className={`nav-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
              onClick={() => setActiveTab('recommendations')}
            >
              Recomendações
            </button>
          </>
        )}
      </nav>

      <main className="app-main">
        {activeTab === 'form' && (
          <PatientForm onSubmit={handlePatientSubmit} isLoading={isLoading} />
        )}
        
        {activeTab === 'analysis' && riskAnalysis && (
          <RiskAnalysis 
            analysis={riskAnalysis} 
            isLoading={isLoading}
            onGetRecommendations={handleGetRecommendations}
            onNewAnalysis={handleNewAnalysis}
          />
        )}
        
        {activeTab === 'recommendations' && recommendations && (
          <RecommendationPanel 
            recommendations={recommendations}
            onNewAnalysis={handleNewAnalysis}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>⚠️ <strong>Aviso Importante:</strong> As análises fornecidas por este sistema não substituem o aconselhamento médico profissional. Sempre consulte um médico para decisões de saúde.</p>
      </footer>
    </div>
  )
}

export default App
