import { Button } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import { LinearProgress } from "@mui/material"
import { selectProductsByName } from "../../selectors/products"
import * as api from "../../api/products"

const Migration = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [completed, setCompleted] = useState(0)
  const products = useSelector(selectProductsByName)

  const completion = Math.ceil((completed / products.length) * 100)

  const isComplete = completed === products.length

  const migrateData = () => {
    setIsLoading(true)

    const promises = products.map((product) => {
      const body = {
        ...product,
        // overwrite here
      }

      return api
        .putProduct(body)
        .then(() => {
          setCompleted((value) => (value += 1))
          console.log("Done:", body)
        })
        .catch((e) => {
          console.error(e)
        })
    })

    Promise.all(promises).finally(() => {
      setIsLoading(false)
    })
  }

  const handleClick = () => {
    if (!isStarted) {
      setIsStarted(true)
      migrateData()
    }
  }

  return (
    <div className="Migration">
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={isComplete}
        sx={{ width: "100%" }}
      >
        {isLoading
          ? `Migrating ${completed}/${products.length}`
          : isComplete
          ? "Done"
          : "Migrate data"}
      </Button>
      <LinearProgress variant="determinate" value={completion} sx={{ mt: 2 }} />
    </div>
  )
}

export default Migration
