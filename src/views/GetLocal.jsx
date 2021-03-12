import React, { useEffect } from 'react'
import { Grid, Item, Header, Image } from 'semantic-ui-react'
import ArticleList from '../components/ArticleList'
import HeroArticle from '../components/HeroArticle'
import { getLocationArticles } from '../modules/articlesDataModule'
import { useSelector } from 'react-redux'

const GetLocal = () => {
  const { articles, message, authenticated } = useSelector(state => state)
  const experienceArticles = articles.filter(article => article.article_type === 'experience')
  const storyArticles = articles.filter(article => article.article_type === 'story')

  useEffect(() => {
    getLocationArticles()
  }, [])

  return (
    <Grid divided className="main-view full-height" columns={2}>
      <Grid.Column width={10}>
        <Header dividing color="blue" className="main-header">
          Experiences
          <Header.Subheader data-cy="your-location">{message}</Header.Subheader>
        </Header>
        <HeroArticle article={experienceArticles[0]} />
        <Item.Group divided data-cy="experience-wrapper">
          <ArticleList articles={experienceArticles.slice(1)} />
        </Item.Group>
      </Grid.Column>
      <Grid.Column width={6}>
        {!authenticated &&
          <Image
            data-cy="main-ad"
            target="_blank"
            as='a'
            href="https://track.adtraction.com/t/t?a=1408351772&as=1552093853&t=2&tk=1"
            src="https://track.adtraction.com/t/t?a=1408351772&as=1552093853&t=1&tk=1&i=1"
          />
        }
        <Header textAlign="center" dividing className="sub-header main-story">Stories</Header>
        <Item.Group divided data-cy="story-wrapper">
          <ArticleList articles={storyArticles} />
        </Item.Group>
      </Grid.Column >
    </Grid >
  )
}

export default GetLocal
