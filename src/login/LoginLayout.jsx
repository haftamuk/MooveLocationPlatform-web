import { useMediaQuery, Paper, Card, CardHeader, CardContent } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';
import LogoImage from './LogoImage';
import { Typography } from '@mui/material';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    backgroundImage: 'url(/back.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.primary.main, // fixed typo (was primary.secondary)
    width: theme.dimensions.sidebarWidth,
    zIndex: 1,
    [theme.breakpoints.down('lg')]: {
      width: theme.dimensions.sidebarWidthTablet,
    },
    [theme.breakpoints.down('sm')]: {
      width: '0px',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    boxShadow: '-2px 0px 16px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(2px)',
    zIndex: 1,
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, 25, 0, 0),
    },
  },
  form: {
    maxWidth: theme.spacing(52),
    padding: theme.spacing(5),
    width: '100%',
  },
  card: {
    width: '90%',
    maxWidth: 360,
    marginTop: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    boxShadow: theme.shadows[3],
  },
  cardHeader: {
    backgroundColor: theme.palette.success.main, // green
    color: theme.palette.success.contrastText,   // white text for contrast
    '& .MuiCardHeader-title': {
      fontWeight: 'bold',
      fontSize: '1.2rem',
    },
  },
  cardContent: {
    backgroundColor: 'white',
    color: theme.palette.primary.main, // blue text
    padding: theme.spacing(2),
  },
  bulletList: {
    listStyle: 'none',
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'left',          // left align bullets
    '& li': {
      marginBottom: theme.spacing(1),
      fontSize: '0.875rem',
    },
  },
  bottomText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
}));

const LoginLayout = ({ children }) => {
  const { classes } = useStyles();
  const theme = useTheme();

  return (
    <main className={classes.root}>
      <div className={classes.sidebar}>
        {!useMediaQuery(theme.breakpoints.down('lg')) && (
          <LogoImage color={theme.palette.secondary.contrastText} />
        )}

        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title="Moove Fleet Platform"
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="body2" gutterBottom>
              <strong>Moove Fleet Platform</strong> – empowering government and private fleets with real‑time intelligence.
            </Typography>
            <ul className={classes.bulletList}>
              <li>🔒 <strong>Enhanced Security</strong> – real‑time alerts for theft, route deviation, and unauthorised access.</li>
              <li>⛽ <strong>Fuel Misuse Prevention</strong> – monitor consumption trends, detect anomalies, and reduce waste.</li>
              <li>🏛️ <strong>Government & Aid Collaboration</strong> – trusted by governmental, non-governmental(NGOs) and other international organisations.</li>
              <li>📈 <strong>Foreign Exchange Savings</strong> – locally developed, keeping currency within the national economy.</li>
            </ul>
            <Typography className={classes.bottomText} variant="caption" display="block">
              Join the movement towards transparent, efficient, and secure fleet operations.
            </Typography>
          </CardContent>
        </Card>
      </div>

      <Paper className={classes.paper}>
        <form className={classes.form}>{children}</form>
      </Paper>
    </main>
  );
};

export default LoginLayout;