import { InputAdornment, TextField, Card, CardActionArea, Stack, CardHeader, IconButton, CircularProgress, Chip } from '@mui/material'
import { Add, Check, Edit, AttachMoney } from '@mui/icons-material'

const ProductCard = ({
  product,
  isLoading,
  isDisabled,
  onCardClick,
  onClickEdit,
  onClickStartIcon,
  onToggleTag
}) => {
  const isEnabled = !isDisabled

  const renderStartIcon = () => {
    if (isLoading) {
      return <CircularProgress size={24} />
    }

    const iconProps = { onClick: onClickStartIcon }

    if (product.selected) {
      if (product.discounted) {
        return (
          <AttachMoney {...iconProps} color="secondary" />
        )
      }

      return <Check {...iconProps} />
    }

    return (
      <AttachMoney {...iconProps} sx={{ opacity: 0.1 }} />
    )
  }

  const renderTags = () => {
    if (product.tags.length === 0) {
      return null
    }

    const chips = product.tags.map(tag => {
      const isSelected = product.selection.tags.includes(tag)

      const chipProps = {
        label: tag,
        onClick: isLoading ? null : onToggleTag(tag),
        key: tag,
        variant: isSelected ? undefined : "outlined",
        color: isSelected ? "secondary" : undefined,
        sx: { opacity: isLoading ? 0.5 : 1}
      }

      return (
        <Chip {...chipProps} />
      )
    })

    return (
      <Stack direction="row" spacing={1} sx={{ p: 1, pl: 2 }}>
        {chips}
      </Stack>
    )
  }

  return (
    <Card key={product.id} sx={{ opacity: isDisabled ? 0.3 : 1 }}>
      <CardActionArea
        onClick={isEnabled ? onCardClick : null}
        disableRipple={isLoading}
        component="div"
      >
        <CardHeader
          avatar={renderStartIcon()}
          title={product.name}
          action={(
            <IconButton onClick={isEnabled ? onClickEdit : null} title="Admin">
              <Edit sx={{ opacity: product.zoneId ? 0.1 : 0.5 }} />
            </IconButton>
          )}
        />
      </CardActionArea>
      {renderTags()}
    </Card>
  )
}

export default ProductCard
