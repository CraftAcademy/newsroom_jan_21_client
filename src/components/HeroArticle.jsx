import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Card, Header } from 'semantic-ui-react'

const HeroArticle = ({ article }) => {

  return (
    <>
      { article[0] &&
        <Card fluid data-cy="hero-item" as={Link} to={`articles/${article[0].id}`}>
          <Image fluid data-cy="hero-img" className="hero-img" alt="hero-image" src={article[0].image} />
          <Card.Content>
            <Card.Header data-cy="hero-title" size="large">{article[0].title}</Card.Header>
            <Card.Description data-cy="hero-date">Published on: {article[0].date}</Card.Description>
            <Header data-cy="hero-teaser" size="small">{article[0].teaser}</Header >
          </Card.Content>
        </Card>
      }
    </>
  )
}

export default HeroArticle
