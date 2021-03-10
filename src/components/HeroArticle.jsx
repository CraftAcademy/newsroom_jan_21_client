import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Card, Header } from 'semantic-ui-react'

const HeroArticle = ({ article }) => {

  return (
    <>
      { article &&
        <Card fluid data-cy="hero-item" as={Link} to={`articles/${article.id}`}>
          <Image fluid data-cy="hero-img" className="hero-img" alt="hero-image" src={article.image} />
          <Card.Content>
            <Card.Header data-cy="hero-title" size="large">{article.title}</Card.Header>
            <Card.Description data-cy="hero-date">Published on: {article.date}</Card.Description>
            <Header data-cy="hero-teaser" size="small">{article.teaser}</Header >
          </Card.Content>
        </Card>
      }
    </>
  )
}

export default HeroArticle
