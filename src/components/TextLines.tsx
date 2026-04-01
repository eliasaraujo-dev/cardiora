interface TextLinesProps {
  text: string
  paragraphClassName: string
}

export default function TextLines({ text, paragraphClassName }: TextLinesProps) {
  return (
    <>
      {text.split('\n').map((paragraph, index) => {
        if (!paragraph.trim()) return null
        return (
          <p key={`${index}-${paragraph.slice(0, 16)}`} className={paragraphClassName}>
            {paragraph}
          </p>
        )
      })}
    </>
  )
}
