import { makeStyles, createStyles } from "@material-ui/styles"

const useStyles = makeStyles(() =>
  createStyles({
    videoPreview: {
      textAlign: 'center'
    },
    thumbnail: {
      position: 'relative',
      height: '220px',
      backgroundColor: '#222'
    },
    spinner: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)'
    },
    play: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      "& > svg": {
        filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, .7))',
      }
    },
    video: {
      width: '100%',
      height: 'auto',
      maxHeight: '100%',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '2rem',
      textAlign: 'center',
      marginTop: '12px'
    },
    extraInfoBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    ethernaBtn: {
      fontSize: '1.75rem',
      backgroundColor: '#494b50',
      borderRadius: 6,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '8px',
      padding: '1.5rem',
      fontWeight: 500,

      "& > * + *": {
        marginLeft: '6px'
      }
    }
  })
)

export default useStyles
