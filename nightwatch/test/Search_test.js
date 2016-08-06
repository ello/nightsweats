const baseUrl = 'https://ello.co'

describe('/search', () => {
  before((client, done) => {
    done()
  })

  after((client, done) => {
    client.end(() => {
      done()
    })
  })

  beforeEach((client, done) => {
    done()
  })

  afterEach((client, done) => {
    done()
  })

  it('navigates to /search and checks the page title', (client) => {
    client
      .url(`${baseUrl}/search`)
      .assert.title('Ello | The Creators Network.')
  })

  it('contains the promotion component', (client) => {
    client.assert.elementPresent('.Promotion')
  })

  it('contains the search bar component', (client) => {
    client.assert.elementPresent('.SearchBar')
  })

  it('contains the tablist component', (client) => {
    client.assert.elementPresent('.TabListButtons')
  })

  it('sets the tabs up correctly', (client) => {
    client.assert.cssClassPresent('.TabButton:nth-child(1)', 'isActive')
    client.assert.cssClassNotPresent('.TabButton:nth-child(2)', 'isActive')
    client.assert.containsText('.TabButton:nth-child(1)', 'Posts')
    client.assert.containsText('.TabButton:nth-child(2)', 'People')
  })

  it('performs a "Posts" search and updates the address bar', (client) => {
    client.setValue('#terms', 'mountains')
    client.waitForElementPresent('.Posts')
    client.assert.urlContains('/search?terms=mountains')
  })

  it('TODO: Couldn\'t figure out how to get at the object in Nightwatch to reveal the count')
  it('contains the correct stream elements from a "Posts" search', (client) => {
    client.assert.elementPresent('.Posts.asGrid')
    // client.expect.element('.PostGrid').length.to.equal(15)
  })

  it('switches to "User" search', (client) => {
    client.click('.TabButton:not(.isActive)')
    client.waitForElementPresent('.Users')
    client.assert.urlContains('/search?terms=mountains&type=users')
    client.assert.cssClassNotPresent('.TabButton:nth-child(1)', 'isActive')
    client.assert.cssClassPresent('.TabButton:nth-child(2)', 'isActive')
  })

  it('TODO: Also couldn\'t figure out how to get at the object in Nightwatch to reveal the count')
  it('switches to "User" search', (client) => {
    client.clearValue('#terms')
    client.setValue('#terms', 'mk')
    client.waitForElementPresent('.Users.asGrid')
    client.assert.urlContains('/search?type=users&terms=mk')
    // client.expect.element('.UserGrid').length.to.equal(15)
  })

  it('switches back to "Posts" search', (client) => {
    client.click('.TabButton:not(.isActive)')
    client.waitForElementPresent('.Posts')
    client.assert.urlContains('/search?terms=mk')
    client.assert.cssClassPresent('.TabButton:nth-child(1)', 'isActive')
    client.assert.cssClassNotPresent('.TabButton:nth-child(2)', 'isActive')
  })
})

