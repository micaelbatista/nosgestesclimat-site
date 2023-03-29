describe('check for about page status', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080/personas')
	})

	it('has a title', () => {
		cy.contains('Accessibility statement').should('be.visible')
	})
})
