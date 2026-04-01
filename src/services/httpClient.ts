interface ApiErrorPayload {
  message?: string
  error?: string
}

export async function postJson<TResponse, TPayload>(
  url: string,
  payload: TPayload
): Promise<TResponse> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => ({}))) as ApiErrorPayload
    const errorMessage =
      errorPayload.message || errorPayload.error || `API error: ${response.status}`
    throw new Error(errorMessage)
  }

  return (await response.json()) as TResponse
}
