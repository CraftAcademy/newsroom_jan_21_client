describe('Front page displays articles based on location', () => {
  describe('successfully', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'GET',
        url: 'http://localhost:3000/api/articles?lat=**',
        response: 'fixture:locationList.json'
      })
      cy.visit('/', ({
        onBeforeLoad(window) {
          const stubLocation = {
            coords: {
              latitude: 55.7842,
              longitude: 12.4518
            }
          };
          cy.stub(window.navigator.geolocation, 'getCurrentPosition').callsFake(
            callback => {
              return callback(stubLocation)
            }
          )
        }
      }))
    })
    it('displays your location', () => {
      cy.get('[data-cy="your-location"]').should('contain', 'Latest articles from Frederiksdal')
    })

    it('displays a hero section', () => {
      cy.get('[data-cy="hero-item"]').within(() => {
        cy.get('[data-cy="hero-img"]').should('exist')
        cy.get('[data-cy="hero-title"]').should('contain', 'Experience Test 5')
        cy.get('[data-cy="hero-date"]').should('contain', 'Published on: 2021-03-09')
        cy.get('[data-cy="hero-teaser"]').should('contain','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
      })
    })

    it('displays a list of experience articles', () => {
      cy.get('[data-cy="experience-wrapper"]')
        .find('[data-cy="article-item"]').should('have.length', 2)
    })

    it('displays the right content in experiences list', () => {
      cy.get('[data-cy="experience-wrapper"]').within(() => {
        cy.get('[data-id="article-item-1"]').within(() => {
          cy.get('[data-cy="title"]').should('contain', 'Experience Test 4')
          cy.get('[data-cy="date"]').should('contain', 'Published on: 2021-03-09')
          cy.get('[data-cy="teaser"]').should('contain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
        })
      })
    })

    it('displays a list of story articles', () => {
      cy.get('[data-cy="story-wrapper"]')
        .find('[data-cy="article-item"]').should('have.length', 3)
    })

    it('displays the right content in stories list', () => {
      cy.get('[data-cy="story-wrapper"]').within(() => {
        cy.get('[data-id="article-item-1"]').within(() => {
          cy.get('[data-cy="title"]').should('contain', 'Story Test 5')
          cy.get('[data-cy="date"]').should('contain', 'Published on: 2021-03-09')
          cy.get('[data-cy="teaser"]').should('contain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
        })
      })
    })
  })
  describe('unsuccessfully with no location given', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'GET',
        url: 'http://localhost:3000/api/articles?lat=**',
        response: 'fixture:noLocationList.json'
      })
      cy.visit('/', ({
        onBeforeLoad(window) {
          window.navigator.geolocation.getCurrentPosition = (callback) => {
            const err = new Error('User denied')
            // err.code = GeolocationPositionError.PERMISSION_DENIED
            err.code = 1
            callback(err)
          }
        }
      }))
    })

    it('displays a message', () => {
      cy.get('[data-cy="your-location"]').should('contain', "We weren't able to get your location. Enjoy our latest articles instead!")
    })

    it('still displays a list of story articles', () => {
      cy.get('[data-cy="story-wrapper"]')
        .find('[data-cy="article-item"]').should('have.length', 5)
    })

    it('still displays a list of experience articles', () => {
      cy.get('[data-cy="experience-wrapper"]')
        .find('[data-cy="article-item"]').should('have.length', 4)
    })
  })
  describe('unsuccessfully with no articles from the given location', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'GET',
        url: 'http://localhost:3000/api/articles?lat=**',
        response: 'fixture:locationNoArticles.json'
      })
      cy.visit('/', ({
        onBeforeLoad(window) {
          const stubLocation = {
            coords: {
              latitude: 52.7842,
              longitude: 12.4518
            }
          };
          cy.stub(window.navigator.geolocation, 'getCurrentPosition').callsFake(
            callback => {
              return callback(stubLocation)
            }
          )
        }
      }))
    })

    it('displays a message', () => {
      cy.get('[data-cy="your-location"]').should('contain', "We found no local articles from Dreetz")
    })

    it('still displays a list of story articles', () => {
      cy.get('[data-cy="story-wrapper"]')
        .find('[data-cy="article-item"]').should('have.length', 5)
    })

    it('still displays a list of experience articles', () => {
      cy.get('[data-cy="experience-wrapper"]')
        .find('[data-cy="article-item"]').should('have.length', 4)
    })
  })
})