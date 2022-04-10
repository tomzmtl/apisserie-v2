import { Card, CardActionArea, CardHeader, Stack } from "@mui/material"
import { RECIPES } from "./data"

const Recipes = () => {
  const renderRecipes = () =>
    RECIPES.map((recipe) => {
      const handleCardClick = () => {}

      return (
        <Card key={recipe.id}>
          <CardActionArea onClick={handleCardClick}>
            <CardHeader title={recipe.name} />
          </CardActionArea>
        </Card>
      )
    })

  return (
    <div className="Recipes">
      <Stack spacing={1}>{renderRecipes()}</Stack>
    </div>
  )
}

export default Recipes
