class MapPage {
    loggedUser(name) {
        const first_name = name.split(' ')[0]

        cy.get('.logged-user')
        .should('be.visible')
        .should('have.text', `Olá, ${first_name}`)
    }

    createLink() {
        cy.get('a[href="/foodtrucks/create"]')
        .should('be.visible')
        .click()
    }   
}

export default new MapPage()