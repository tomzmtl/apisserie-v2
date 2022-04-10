import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { InputAdornment, TextField, Card, CardActionArea, Stack, CardHeader, IconButton, SpeedDial, SpeedDialAction, Drawer, Box, MenuList, MenuItem, ListItemText, ListItemIcon, ListSubheader, Select, Menu as MuiMenu } from '@mui/material'
import { Add, Close, DisplaySettings, SortByAlpha, Storefront, Check, MenuBook } from '@mui/icons-material'
import removeAccents from "remove-accents"
import { selectProductsByName } from '../../selectors/products'
import "./styles.scss"
import { useProductEdit } from '../Product/hooks';
import { useUpdateProduct } from '../../hooks/products'
import { without } from 'lodash-es'
import ProductCard from '../ProductCard'
import { RECIPES } from '../Recipes/data'
// import Menu from '../Menu'

const matchStrings = (str1, str2) => {
  return removeAccents(str1.toLowerCase())
    .includes(removeAccents(str2.toLowerCase()))
}

const Inventory = () => {
  const { productEditComponents, openProductEdit } = useProductEdit()
  const products = useSelector(selectProductsByName)
  const [query, setQuery] = useState("")
  const { update, isLoading, productId } = useUpdateProduct()
  // const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const textFieldRef = useRef(null)

  const selectedRecipeProductIds = selectedRecipe
    ? RECIPES
      .find(recipe => recipe.id === selectedRecipe.id).products
      .map(product => product.id)
    : []

  const productsToDisplay = query
    ? products.filter(product => matchStrings(product.name, query))
    : selectedRecipe
      ? products.filter(product => selectedRecipeProductIds.includes(product.id))
      : products

  const handleChangeQuery = e => {
    setQuery(e.target.value)
  }

  const renderProducts = () => {
    if (!productsToDisplay.length && query.length) {
      return (
        <Card>
          <CardActionArea onClick={() => { openProductEdit(null, query) }} component="div">
            <CardHeader avatar={<Add color="secondary" />} title={`Ajouter "${query}"...`} />
          </CardActionArea>
        </Card>
      )
    }

    return productsToDisplay.map(product => {
      const handleCardClick = () => {
        const nextSelected = !product.selected

        update({
          ...product,
          selected: nextSelected,
          discounted: false,
          selection: {
            tags: nextSelected ? product.selection?.tags : []
          }
        })
      }

      const handleStartIconClick = e => {
        e.stopPropagation()

        update({
          ...product,
          selected: true,
          discounted: true
        })
      }

      const onToggleTag = tag => e => {
        const { tags } = product.selection
        const isSelected = tags.includes(tag)

        update({
          ...product,
          selected: true,
          selection: {
            tags: isSelected ? without(tags, tag) : tags.concat(tag)
          }
        })
      }

      const cardProps = {
        key: product.id,
        product,
        isLoading: isLoading && product.id === productId,
        isDisabled: isLoading && product.id !== productId,
        onCardClick: handleCardClick,
        onClickEdit: () => openProductEdit(product.id),
        onClickStartIcon: handleStartIconClick,
        onClickTag: onToggleTag
      }
      
      return <ProductCard {...cardProps} />
    })
  }

  // const handleOpenDisplayOptions = () => e => {
  //   setIsSettingsOpen(true)
  // }

  const [open, setOpen] = useState(false)

  const handleCloseRecipes = () => {
    setOpen(false)
  }

  const menuProps = {
    open,
    anchorEl: textFieldRef.current,
    onClose: handleCloseRecipes,
    transformOrigin: { horizontal: 'left', vertical: 'top' },
    anchorOrigin: { horizontal: 'left', vertical: 'top' },
    BackdropProps: { invisible: false },
    sx: { width: "100%" }
  }

  const handleRecipesClick = () => {
    setOpen(!open)
  };

  const makeRecipeItemProps = (recipe) => {
    return {
      key: recipe.id,
      value: recipe.id,
      onClick: () => {
        setQuery("")
        setOpen(false)
        setSelectedRecipe(RECIPES.find(({ id }) => recipe.id === id))
      }
    }
  }

  const handleClickClear = () => {
    setQuery("")
    setSelectedRecipe(null)
  }

  const textFieldProps = {
    ref: textFieldRef,
    value: selectedRecipe ? selectedRecipe.name : query,
    onChange: handleChangeQuery,
    placeholder: "Chercher...",
    disabled: selectedRecipe !== null,
    InputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <IconButton onClick={handleRecipesClick} className="Inventory__recipesBtn">
            <MenuBook color={selectedRecipe ? "secondary" : undefined} />
          </IconButton>
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment
          position="end"
          sx={{ right: "8px", opacity: 0.5 }}
        >
          <IconButton onClick={handleClickClear}>
            <Close />
          </IconButton>
        </InputAdornment>
      )
    },
    sx: { width: "100%", boxShadow: "0 1px 10px rgba(0, 0, 0, 0.2)" }
  }

  return (
    <div className="Inventory">
      <div className="Inventory__search">
        <TextField {...textFieldProps} />
        <MuiMenu {...menuProps}>
          {RECIPES.map(recipe => (
            <MenuItem {...makeRecipeItemProps(recipe)}>{recipe.name}</MenuItem>
          ))}
        </MuiMenu>
      </div>
      <Stack spacing={1}>
        {renderProducts()}
      </Stack>
      {productEditComponents}
      {/* <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'fixed', bottom: 72, right: 16 }}
        icon={<DisplaySettings />}
        onClick={handleOpenDisplayOptions}
      />
      <Drawer open={true} anchor="bottom">
        <ListSubheader>Affichage</ListSubheader>
        <MenuList dense>
          <MenuItem>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            Ordre alphabétique
          </MenuItem>
          <MenuItem>
            <ListItemText inset>Par rayon</ListItemText>
          </MenuItem>
        </MenuList>
      </Drawer> */}
    </div>
  )
}

export default Inventory
