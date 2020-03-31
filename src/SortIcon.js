import React from 'react'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import IconButton from 'material-ui/IconButton'

const SortIcon = () => {
    return (
        <IconButton touch={true}>
            <NavigationExpandMoreIcon />
        </IconButton>
    )
}

export default SortIcon
