import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>My awesome app</Typography>

      <Typography>
        Welcome to my awesome tic tac toe game. Chose a plan to start playing.
      </Typography>

      <Box m={2}>
        <Link to="/login">Login</Link>
      </Box>


      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image=""
                title="Basic plan"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Basic Plan
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Regular Tic Tac Toe game
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button component={Link} to="/register">
                Get this plan
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image=""
                title="Plus plan"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Plus Plan
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Colored Tic Tac Toe game
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button component={Link} to="/register">
                Get this plan
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

    </Container>
  )
};

export default Home;
