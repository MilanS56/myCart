import { Toaster } from "react-hot-toast"
import Providers from "./provider"
import Navbar from "@/components/Navbar"
import './globals.css'

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html>
      <body>
        <Providers>
          <Toaster position="top-right" />
          <Navbar/>
            {children}
        </Providers>
        <div id="modal-root"></div>
      </body>
    </html>
  )
}