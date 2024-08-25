'use client'

import { Toaster } from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

export default function ReactHotToaster() {

  const { isDarkMode } = useTheme()

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          borderRadius: 0,
          border: "1px solid",
          padding: "10px 20px",
          fontWeight: "500",
          fontSize: "1rem",
          backgroundColor: isDarkMode ? "#333" : "#eee",
          color: isDarkMode ? "#eee" : "#222"
        },
        duration: 5000,
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
        loading: {
          duration: Infinity,
          style: {
            border: "none"
          }
        },
        error: {
          style: {
            borderColor: "#d21",
          }
        },
        success: {
          style: {
            borderColor: "#41a800"
          }
        }
      }}
    />
  )
}