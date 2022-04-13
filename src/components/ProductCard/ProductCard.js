import {
  Card,
  CardActionArea,
  Stack,
  CardHeader,
  IconButton,
  CircularProgress,
  Chip,
} from "@mui/material"
import { Check, Edit, AttachMoney } from "@mui/icons-material"
import { useUpdateProduct } from "../../hooks/products"
import { without } from "lodash-es"

const ProductCard = ({ product, onClickEdit, selectable = true }) => {
  const { update, unselect, isLoading } = useUpdateProduct()

  const handleClick = () => {
    const nextSelected = !product.selected

    if (nextSelected === false) {
      unselect(product)
    } else {
      update({
        ...product,
        selected: nextSelected,
        discounted: false,
        selection: {
          tags: nextSelected ? product.selection?.tags : [],
        },
      })
    }
  }

  const handleStartIconClick = (e) => {
    e.stopPropagation()

    update({
      ...product,
      selected: true,
      discounted: true,
    })
  }

  const renderStartIcon = () => {
    if (isLoading) {
      return <CircularProgress size={24} />
    }

    const iconProps = {
      onClick: selectable ? handleStartIconClick : null,
    }

    if (product.selected) {
      if (product.discounted) {
        return <AttachMoney {...iconProps} color="secondary" />
      }

      return <Check {...iconProps} />
    }

    return <AttachMoney {...iconProps} sx={{ opacity: 0.1 }} />
  }

  const onToggleTag = (tag) => (e) => {
    const { tags } = product.selection
    const isSelected = tags.includes(tag)

    update({
      ...product,
      selected: true,
      selection: {
        tags: isSelected ? without(tags, tag) : tags.concat(tag),
      },
    })
  }

  const renderTags = () => {
    const tagsToDisplay = selectable ? product.tags : product.selection.tags

    if (tagsToDisplay.length === 0) {
      return null
    }

    const chips = tagsToDisplay.map((tag) => {
      const isSelected = product.selection.tags.includes(tag)

      const handleTagClick = () => {
        if (isLoading || !selectable) {
          return null
        }

        return onToggleTag(tag)
      }

      const chipProps = {
        label: tag,
        onClick: selectable ? handleTagClick() : null,
        key: tag,
        variant: selectable && isSelected ? undefined : "outlined",
        color: selectable && isSelected ? "secondary" : undefined,
        sx: { opacity: isLoading ? 0.5 : 1, mb: 1 },
      }

      return <Chip {...chipProps} />
    })

    return (
      <Stack direction="row" spacing={1} sx={{ p: 1, pl: 2, flexWrap: "wrap" }}>
        {chips}
      </Stack>
    )
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onClickEdit()
  }

  return (
    <Card key={product.id} sx={{ opacity: isLoading ? 0.3 : 1 }}>
      <CardActionArea
        onClick={isLoading ? null : handleClick}
        disableRipple={isLoading}
        component="div"
      >
        <CardHeader
          avatar={renderStartIcon()}
          title={product.name}
          action={
            <IconButton onClick={isLoading ? null : handleEdit} title="Admin">
              <Edit sx={{ opacity: product.zoneId ? 0.1 : 0.5 }} />
            </IconButton>
          }
        />
      </CardActionArea>
      {renderTags()}
    </Card>
  )
}

export default ProductCard
