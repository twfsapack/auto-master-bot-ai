import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to determine if the current viewport width is considered "mobile".
 * It checks if the window width is less than a predefined `MOBILE_BREAKPOINT` (768px).
 * The hook initially sets the state based on the current window width and updates it
 * if the viewport is resized across the breakpoint.
 *
 * @returns {boolean} True if the current viewport width is less than the mobile breakpoint, false otherwise.
 *                    Returns `false` during server-side rendering or if `window` is not available before hydration.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
