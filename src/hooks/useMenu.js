import { useState, useCallback } from 'react'

function useMenu() {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)

  const handleMenuOpen = useCallback(event => {
    setMenuAnchorEl(event.currentTarget)
  }, [])

  const handleMenuClose = useCallback(() => {
    setMenuAnchorEl(null)
  }, [])

  return {
    isMenuOpen: Boolean(menuAnchorEl),
    menuAnchorEl,
    handleMenuOpen,
    handleMenuClose,
  }
}
export default useMenu
