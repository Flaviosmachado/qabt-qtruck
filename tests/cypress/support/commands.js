import loginPage from '../support/pages/Login'
import mapPage from '../support/pages/Map'

Cypress.Commands.add('apiResetUser', (instagram) => {
    cy.request({
        url: 'http://localhost:3333/helpers-reset',
        method: 'DELETE',
        qs: {instagram: instagram},
        failOnStatusCode: false
    }).then(response => {
        expect(response.status).to.eql(204)
    })
})

Cypress.Commands.add('apiCreateUser', (payload) => {

    cy.apiResetUser(payload.instagram)

    cy.request({
        url: 'http://localhost:3333/signup',
        method: 'POST',
        body: payload
    }).then(response => {
        expect(response.status).to.eql(201)
    })
})

Cypress.Commands.add('apiLogin', (user) => {
    cy.request({
        url: 'http://localhost:3333/sessions',
        method: 'POST',
        body: user
    }).then(response => {
        expect(response.status).to.eql(200)
        Cypress.env('token', response.body.token)
    }) 
})

Cypress.Commands.add('apiCreateFoodTruck', (payload) => {
    cy.request({
        url: 'http://localhost:3333/foodtrucks',
        method: 'POST',
        body: payload,
        headers: {
            'Authorization': Cypress.env('token')
        },
    }).then(response => {
        expect(response.status).to.eql(201)
    })
})

Cypress.Commands.add('uiLogin', (user) => {
    loginPage.go('-19.93909137000474', '-43.94653022289277')
    loginPage.form(user)
    loginPage.Submit()

    mapPage.loggedUser(user.name)
})


Cypress.Commands.add('setGeoLocation', (lat, lng)=> {
    localStorage.setItem('qtruck:latitude', String(lat))
    localStorage.setItem('qtruck:longitude', String(lng))
})