import React, { useState } from 'react'
import ExploreList from '../components/ExploreList'
import { Header, Grid, Icon, Button, Segment } from 'semantic-ui-react'
import store from '../state/store/configureStore'
import { getByCategory } from '../modules/articlesDataModule'

const Explore = () => {
  const [header, setHeader] = useState('Stories')

  const switchHeader = (category) => {
    switch (category) {
      case 'story':
        setHeader('Stories')
        break;
      case 'experience':
        setHeader('Experiences')
        break;
      case 'news':
        setHeader('News')
        break;
      case 'event':
        setHeader('Events')
        break;
      case 'food':
        setHeader('Foods')
        break;
      case 'trip':
        setHeader('Trips')
        break;
      default:
    }
  }

  return (
    <Grid className="main-view">
      <Grid.Row centered textAlign="center">
        <Header className="main-header" data-cy="explore-header">
          <Icon circular name="map signs" color="blue" size="tiny" />
          <Header.Content>Explore</Header.Content>
        </Header>
      </Grid.Row>
      <Grid.Row centered>
        <Button size="large" color="blue" data-cy="story-button" onClick={() => {
          store.dispatch({ type: "SET_ARTICLE_TYPE", payload: 'story' })
          switchHeader('story')
        }}>Stories</Button>
        <Button size="large" color="blue" data-cy="experience-button" onClick={() => {
          store.dispatch({ type: "SET_ARTICLE_TYPE", payload: 'experience' })
          switchHeader('experience')
        }}>Experiences</Button>
      </Grid.Row>
      <Grid.Row centered>
        <Segment.Group>
          <Segment attached="top">
            <Button data-cy="event-category-button" onClick={() => {
              getByCategory('event')
              switchHeader('event')
            }}>Events</Button>
            <Button data-cy="news-category-button" onClick={() => {
              getByCategory('news')
              switchHeader('news')
            }}>News</Button>
            <Button data-cy="food-category-button" onClick={() => {
              getByCategory('food')
              switchHeader('food')
            }}>Food</Button>
            <Button data-cy="trip-category-button" onClick={() => {
              getByCategory('trip')
              switchHeader('trip')
            }}>Trips</Button>
          </Segment>
          <ExploreList header={header} />
        </Segment.Group>
      </Grid.Row>
    </Grid>
  )
}
export default Explore
