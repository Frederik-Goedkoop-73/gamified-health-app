export function useLocalCache<T>(key: string, ttlMs: number) {
  function get(): T | null {
    const cached = localStorage.getItem(key)
    if (!cached)
      return null

    try {
      const { data, timestamp } = JSON.parse(cached)
      const isValid = Date.now() - timestamp < ttlMs
      return isValid ? data : null
    }
    catch (error) {
      console.warn('Invalid cache format for', key)
      return null
    }
  }

  function set(data: T) {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }))
  }

  function clear() {
    localStorage.removeItem(key)
  }

  return { get, set, clear }
}
