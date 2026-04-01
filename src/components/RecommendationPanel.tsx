import './RecommendationPanel.css'
import TextLines from './TextLines'

interface RecommendationPanelProps {
  recommendations: string
  onNewAnalysis: () => void
}

export default function RecommendationPanel({
  recommendations,
  onNewAnalysis,
}: RecommendationPanelProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([recommendations], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `cardiora-recomendacoes-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="recommendation-panel">
      <h2>Recomendações Preventivas Personalizadas</h2>

      <div className="recommendation-content">
        <div className="recommendation-text">
          <TextLines
            text={recommendations}
            paragraphClassName="recommendation-paragraph"
          />
        </div>
      </div>

      <div className="recommendation-actions">
        <button className="btn btn-print" onClick={handlePrint}>
          🖨️ Imprimir
        </button>
        <button className="btn btn-download" onClick={handleDownload}>
          📥 Baixar Relatório
        </button>
        <button className="btn btn-new" onClick={onNewAnalysis}>
          ➕ Nova Análise
        </button>
      </div>

      <div className="medical-disclaimer">
        <h3>⚠️ Aviso Importante</h3>
        <p>
          Este relatório foi gerado por sistema de inteligência artificial e destina-se apenas 
          para fins informativos. <strong>Não constitui aconselhamento médico profissional.</strong>
        </p>
        <p>
          Por favor, consulte um médico qualificado ou cardiologista para:
        </p>
        <ul>
          <li>Diagnóstico definitivo</li>
          <li>Recomendações personalizadas baseadas em seu histórico completo</li>
          <li>Plano de tratamento individualizado</li>
          <li>Acompanhamento contínuo</li>
        </ul>
      </div>
    </div>
  )
}
