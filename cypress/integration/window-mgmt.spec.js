/* global cy, before, assert */

describe('Window management', () => {
  before(() => cy.visit('http://localhost:3000'))

  describe('desktop icon', () => {
    const targetAppLabel = 'DOS Prompt'

    describe('single click', () => {
      it('should focus the icon', () => {
        cy.contains(targetAppLabel).click().parent().should('be.focused')
      })
    })

    describe('double click', () => {
      it('should open the target app', () => {
        cy.get('.title-bar').should('have.length', 0)
        cy.contains(targetAppLabel).dblclick()
        cy.get('.title-bar').should('have.length', 1)
      })

      it('should focus the text input when opened', () => {
        cy.get('body').type('first prompt')
        cy.contains('C:>first prompt')
      })

      it('should open multiple apps if repeated', () => {
        cy.get('.title-bar').should('have.length', 1)
        cy.contains(targetAppLabel).dblclick()
        cy.get('.title-bar').should('have.length', 2)
        cy.get('body').type('second prompt')
      })
    })
  })

  describe('window events', () => {
    describe('focusing a background window', () => {
      let initialWindow

      it('should bring it to the foreground', () => {
        const backgroundWindow = cy
          .get('.title-bar')
          .first()
          .should(($first) => {
            initialWindow = $first[0]
            assert.isOk(initialWindow)
          })

        backgroundWindow.first().click()

        cy.get('.title-bar')
          .last()
          .should(($foregrounded) => {
            assert.equal(initialWindow, $foregrounded[0])
          })
      })

      describe('closing the other window', () => {
        it('should leave the foregrounded window active', () => {
          const activeWindows = cy.get('.title-bar')
          activeWindows.should('have.length', 2)
          activeWindows.first().find('[aria-label="Close"]').click()
          cy.get('.title-bar')
            .should('have.length', 1)
            .should(($el) => {
              assert.equal($el[0], initialWindow)
            })
        })
      })
    })
  })
})
