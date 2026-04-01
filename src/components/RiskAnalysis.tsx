import './RiskAnalysis.css'
import TextLines from './TextLines'

interface RiskAnalysisProps {
  analysis: string
  isLoading: boolean
  onGetRecommendations: () => void
  onNewAnalysis: () => void
}

export default function RiskAnalysis({
  analysis,
  isLoading,
  onGetRecommendations,
  onNewAnalysis,
}: RiskAnalysisProps) {
  return (
    <div className="risk-analysis">
      <h2>Análise de Risco Cardiovascular</h2>
      
      <div className="analysis-content">
        <div className="analysis-text">
          <TextLines text={analysis} paragraphClassName="analysis-paragraph" />
        </div>
      </div>

      <div className="analysis-actions">
        <button 
          className="btn btn-primary"
          onClick={onGetRecommendations}
          disabled={isLoading}
        >
          {isLoading ? 'Gerando Recomendações...' : 'Obter Recomendações Personalizadas'}
        </button>
        <button 
          className="btn btn-secondary"
          onClick={onNewAnalysis}
          disabled={isLoading}
        >
          Nova Análise
        </button>
      </div>
    </div>
  )
}
