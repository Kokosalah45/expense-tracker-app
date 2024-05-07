import React from 'react'

import { TextInput } from 'react-native'

type Props = {}

const ThemedTextInput = (props: Props) => {
    const theme = useTheme()
  return (
    <TextInput
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        padding: theme.spacing.sm,
        borderRadius: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
        marginStart: theme.spacing.sm,
        marginEnd   : theme.spacing.sm,
      }}
      {...props}
    />
  )
}