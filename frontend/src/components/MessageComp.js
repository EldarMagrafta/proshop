import React from 'react'
import {Alert} from 'react-bootstrap'

/*
variant - The color scheme ("success", "warning", "danger", etc.) for the Alert component (optional, defaults to "info")
children - The message to display in the Alert component (optional)
 */
function MessageComp({variant, children}) {

  return (
    <Alert variant={variant}>
        {children}
    </Alert>
  )
}

// Set a default value of "info" for the variant prop if no variant prop is provided
MessageComp.defaultProps = {
    variant: "info",
}

export default MessageComp