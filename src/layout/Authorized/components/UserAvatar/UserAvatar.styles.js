import { makeStyles } from '@material-ui/core'

const avatarBorderMargin = 2
const avatarBorderWidth = 2
const avatarOffset = -(avatarBorderMargin + avatarBorderWidth)

export default makeStyles(({ palette }) => ({
  avatarContainer: {
    borderRadius: '50%',
    width: 30,
    height: 30,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: palette.text.secondary,
    '&::before': {
      content: "''",
      position: 'absolute',
      top: avatarOffset,
      bottom: avatarOffset,
      left: avatarOffset,
      right: avatarOffset,
      borderRadius: '50%',
      border: `${avatarBorderWidth}px solid ${palette.text.secondary}`,
    },
  },
  badge: {
    backgroundColor: palette.success.main,
  },

  avatar: {
    width: '100%',
    height: '100%',
  },
}))
