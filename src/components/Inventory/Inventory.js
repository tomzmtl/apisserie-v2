import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import {
  InputAdornment,
  TextField,
  Card,
  CardActionArea,
  Stack,
  CardHeader,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material"
import { Add, Close, MenuBook } from "@mui/icons-material"
import removeAccents from "remove-accents"
import { selectProductsByName } from "../../selectors/products"
import "./styles.scss"
import { useProductEdit } from "../Product/hooks"
import ProductCard from "../ProductCard"
import { RECIPES } from "../Recipes/data"

const matchStrings = (str1, str2) => {
  return removeAccents(str1.toLowerCase()).includes(
    removeAccents(str2.toLowerCase())
  )
}

const searchProducts = (products, query) =>
  products.filter((product) => {
    const directMatch = matchStrings(product.name, query)

    if (directMatch) {
      return true
    }

    return product.tags.some((tag) => matchStrings(tag, query))
  })

const Inventory = () => {
  const { productEditComponents, openProductEdit } = useProductEdit()
  const products = useSelector(selectProductsByName)
  const [query, setQuery] = useState("")
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const menuRef = useRef(null)

  const selectedRecipeProductIds = selectedRecipe
    ? RECIPES.find((recipe) => recipe.id === selectedRecipe.id).products.map(
        (product) => product.id
      )
    : []

  const productsToDisplay = query
    ? searchProducts(products, query)
    : selectedRecipe
    ? products.filter((product) =>
        selectedRecipeProductIds.includes(product.id)
      )
    : products

  const handleChangeQuery = (e) => {
    setQuery(e.target.value)
  }

  const renderProducts = () => {
    if (!productsToDisplay.length && query.length) {
      return (
        <Card>
          <CardActionArea
            onClick={() => {
              openProductEdit(null, query)
            }}
            component="div"
          >
            <CardHeader
              avatar={<Add color="secondary" />}
              title={`Ajouter "${query}"...`}
            />
          </CardActionArea>
        </Card>
      )
    }

    return productsToDisplay.map((product) => {
      const cardProps = {
        key: product.id,
        product,
        onClickEdit: () => openProductEdit(product.id),
      }

      return <ProductCard {...cardProps} />
    })
  }

  const [open, setOpen] = useState(false)

  const handleCloseRecipes = () => {
    setOpen(false)
  }

  const menuProps = {
    open,
    anchorEl: menuRef.current,
    onClose: handleCloseRecipes,
    transformOrigin: { horizontal: "left", vertical: "top" },
    anchorOrigin: { horizontal: "left", vertical: "top" },
    BackdropProps: { invisible: false },
    sx: { width: "100%" },
  }

  const handleRecipesClick = () => {
    setOpen(!open)
  }

  const makeRecipeItemProps = (recipe) => {
    return {
      key: recipe.id,
      value: recipe.id,
      onClick: () => {
        setQuery("")
        setOpen(false)
        setSelectedRecipe(RECIPES.find(({ id }) => recipe.id === id))
      },
    }
  }

  const handleClickClear = () => {
    setQuery("")
    setSelectedRecipe(null)
  }

  const textFieldProps = {
    ref: menuRef,
    value: selectedRecipe ? selectedRecipe.name : query,
    onChange: handleChangeQuery,
    placeholder: "Chercher...",
    disabled: selectedRecipe !== null,
    InputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <IconButton
            onClick={handleRecipesClick}
            className="Inventory__recipesBtn"
          >
            <MenuBook color={selectedRecipe ? "secondary" : undefined} />
          </IconButton>
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end" sx={{ right: "8px", opacity: 0.5 }}>
          <IconButton onClick={handleClickClear}>
            <Close />
          </IconButton>
        </InputAdornment>
      ),
    },
    sx: { width: "100%", boxShadow: "0 1px 10px rgba(0, 0, 0, 0.2)" },
  }

  return (
    <div className="Inventory">
      <div className="Inventory__search">
        <TextField {...textFieldProps} />
        <Menu {...menuProps}>
          {RECIPES.map((recipe) => (
            <MenuItem {...makeRecipeItemProps(recipe)}>{recipe.name}</MenuItem>
          ))}
        </Menu>
      </div>
      <Stack spacing={1}>{renderProducts()}</Stack>
      {productEditComponents}
    </div>
  )
}

export default Inventory
