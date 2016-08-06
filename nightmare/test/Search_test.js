import { expect } from 'chai'
import { install } from 'mocha-generators'
import nightmare from 'nightmare'

install()

const baseUrl = 'https://ello.co'
const isPeepin = true
const options = isPeepin ? { show: true, width: 1280, height: 800 } : {}

describe('/search', function () {
  let scenario
  this.timeout(15000)

  before(function* () {
    scenario = nightmare(options)
  })

  after(function*() {
    yield scenario.end()
  })

  it('navigates to /search and checks the page title', function* () {
    const title = yield scenario
      .goto(`${baseUrl}/search`)
      .title()
    expect(title).to.equal('Ello | The Creators Network.')
  })

  it('contains the promotion component', function* () {
    const promotion = yield scenario.exists('.Promotion')
    expect(promotion).to.equal(true)
  })

  it('contains the search bar component', function* () {
    const bar = yield scenario.exists('.SearchBar')
    expect(bar).to.equal(true)
  })

  it('contains the tablist component', function* () {
    const tabs = yield scenario.exists('.TabListButtons')
    expect(tabs).to.equal(true)
  })

  it('sets the tabs up correctly', function* () {
    const firstTabIsActive = yield scenario
      .evaluate(() => document.querySelectorAll('.TabButton')[0].classList.contains('isActive'))
    expect(firstTabIsActive).to.equal(true)

    const firstTabText = yield scenario
      .evaluate(() => document.querySelectorAll('.TabButton')[0].innerText)
    expect(firstTabText).to.equal('Posts')

    const nextTabIsActive = yield scenario
      .evaluate(() => document.querySelectorAll('.TabButton')[1].classList.contains('isActive'))
    expect(nextTabIsActive).to.equal(false)

    const nextTabText = yield scenario
      .evaluate(() => document.querySelectorAll('.TabButton')[1].innerText)
    expect(nextTabText).to.equal('People')
  })

  it('performs a "Posts" search and updates the address bar', function* () {
    const url = yield scenario
      .type('#terms', 'mountains')
      .wait('.Posts')
      .url()
    expect(url).to.contain('/search?terms=mountains')
  })

  it('contains the correct stream elements from a "Posts" search', function* () {
    const posts = yield scenario.exists('.Posts.asGrid')
    expect(posts).to.equal(true)

    const postCount = yield scenario
      .evaluate(() => document.querySelectorAll('.PostGrid').length)
    expect(postCount).to.equal(25)
  })

  it('switches to "User" search', function* () {
    const url = yield scenario
      .click('.TabButton:not(.isActive)')
      .wait('.Users')
      .url()
    expect(url).to.contain('/search?terms=mountains&type=users')

    const firstTabIsActive = yield scenario
      .evaluate(() => document.querySelectorAll('.TabButton')[0].classList.contains('isActive'))
    expect(firstTabIsActive).to.equal(false)

    const nextTabIsActive = yield scenario
      .evaluate(() => document.querySelectorAll('.TabButton')[1].classList.contains('isActive'))
    expect(nextTabIsActive).to.equal(true)
  })

  it('performs a "User" search', function* () {
    const url = yield scenario
      .insert('#terms', false)
      .type('#terms', 'mk')
      .wait('.Users.asGrid')
      .url()
    expect(url).to.contain('/search?type=users&terms=mk')

    const userCount = yield scenario
      .evaluate(() => document.querySelectorAll('.UserGrid').length)
    expect(userCount).to.equal(25)
  })

  it('switches back to "Posts" search', function* () {
    const url = yield scenario
      .click('.TabButton:not(.isActive)')
      .wait('.Posts')
      .url()
    expect(url).to.contain('/search?terms=mk')

    const firstTabIsActive = yield scenario
      .evaluate(() => document.querySelectorAll('.TabButton')[0].classList.contains('isActive'))
    expect(firstTabIsActive).to.equal(true)

    const nextTabIsActive = yield scenario
      .evaluate(() => document.querySelectorAll('.TabButton')[1].classList.contains('isActive'))
    expect(nextTabIsActive).to.equal(false)
  })
})

