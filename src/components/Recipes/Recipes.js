import { Add } from "@mui/icons-material"
import { Card, CardActionArea, CardHeader, Stack } from "@mui/material"
import { RECIPES } from "./data"

const Recipes = () => {
  // const { zoneEditComponents, openZoneEdit } = useZoneEdit()

  const renderRecipes = () => RECIPES.map(recipe => {
    const handleCardClick = () => {
      // openZoneEdit(recipe.id)
    }

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
      <Stack spacing={1}>
        {renderRecipes()}
      </Stack>
      {/* <Card key="zone-dd" sx={{ mt: 3 }}>
        <CardActionArea onClick={() => null}>
          <CardHeader avatar={<Add color="secondary" />} title="Ajouter une recette..." />
        </CardActionArea>
      </Card> */}
      {/* {zoneEditComponents} */}
    </div>
  )
}

export default Recipes
