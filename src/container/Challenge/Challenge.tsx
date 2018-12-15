import React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { styled } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'

import { ChallengeType } from '@Src/typing/globalTypes'
import Img from '@Src/images/pic.png'

const ChallengeContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px'
})

interface ChallengeProp extends RouteComponentProps, ChallengeType {
  groupId: string
}

interface RouteParams {
  address: string
  groupId: string
}

const StyledCard = styled(Card)({
  maxWidth: 500
})

const StyledCardMedia = styled(CardMedia)({
  height: 200
})
const mockData = {
  completeDays: 5,
  targetDays: 10,
  totalDays: 20,
  startDayTimestamp: 1321231,
  sponserNum: 1
} as ChallengeType

const mapStateToProps = (state: Map<string, object>) => {
  return {
    groupId: 'walk.speed.com',
    ...mockData
  }
}

class Challenge extends React.Component<ChallengeProp> {
  public render() {
    const params = this.props.match.params as RouteParams
    const { groupId, targetDays, totalDays } = this.props
    return (
      <ChallengeContainer>
        <Helmet>
          <meta charSet='utf-8' />
          <title>{params.address}'s coin challenge</title>
          <link rel='canonical' href='http://mysite.com/example' />
        </Helmet>
        <StyledCard>
          <CardActionArea>
            <StyledCardMedia image={Img} title='Contemplative Reptile' />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {groupId} challenge
                <FormattedMessage id='hello' />
              </Typography>
              <Typography component='p'>
                {targetDays}/{totalDays} target/total days
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size='small' color='primary'>
              Share
            </Button>
            <Button size='small' color='primary'>
              Learn More
            </Button>
          </CardActions>
        </StyledCard>
      </ChallengeContainer>
    )
  }
}

export default connect(mapStateToProps)(Challenge)
