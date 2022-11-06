import { Routes, Route } from "react-router-dom"
import "./normalize.css"
import "./styles.scss"
import "./theme.scss"
import Menu from "../Menu"
import ShoppingList from "../ShoppingList"
import Inventory from "../Inventory"
import Zones from "../Zones"
import Recipes from "../Recipes"
import { useLoadProducts } from "../../hooks/products"
import { useLoadZones } from "../../hooks/zones"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useEffect } from "react"
import Migration from "../Migration"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6e62f6",
    },
    secondary: {
      main: "#e5ff00",
    },
  },
})

const App = ({ ts }) => {
  const { load: loadProducts } = useLoadProducts(ts)
  const { load: loadZones } = useLoadZones(ts)

  useEffect(() => {
    loadProducts()
    loadZones()
  }, [ts, loadProducts, loadZones])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className="App__content">
          <Routes>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/zones" element={<Zones />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/migrate" element={<Migration />} />
            <Route path="/" element={<ShoppingList />} />
          </Routes>
        </div>
        <Menu />
      </ThemeProvider>
    </div>
  )
}

export default App
