import React from 'react'
import { styled } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
// import { FormattedMessage } from 'react-intl'
import Img from '@Src/images/pic.png'
import Medal from '@Src/images/medal.svg'

import { RouteParams } from '../Challenge'

const StyledCard = styled(Card)({
  maxWidth: 500,
  minWidth: 400,
  marginRight: 40
})

const StyledCardMedia = styled(CardMedia)({
  height: 200
})

const StyledAvatar = styled('img')({
  width: 40
})

interface ChallengeCardProp extends RouteParams {
  startDayTimestamp: number
}

const ChallengeCard = React.memo(
  ({ address, groupId, startDayTimestamp }: ChallengeCardProp) => (
    <StyledCard>
      <CardHeader
        avatar={<StyledAvatar src={Medal} />}
        title={address}
        subheader={`start a challenge at ${startDayTimestamp}`}
      />
      <CardActionArea>
        <StyledCardMedia image={Img} title='Contemplative Reptile' />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {groupId} challenge
            {/* <FormattedMessage id="hello" /> */}
          </Typography>
          <Typography component='p'>let's sponser him!</Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  )
)

export default ChallengeCard
