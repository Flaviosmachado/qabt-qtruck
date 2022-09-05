import modal from '../components/Modal'

class LoginPage {

    constructor() {
        this.modal = modal
    }

    go(lat = '-19.93909137000474', long= '-43.94653022289277') {
        cy.visit('/', this.mockLocation(lat, long))
        cy.viewport(1920, 1080)
    }

    form(user) {
        if(user.instagram) cy.get('input[name=instagram]').type(user.instagram)
        if(user.password) cy.get('input[name=password]').type(user.password)
    }

    Submit() {
        cy.contains('button', 'Entrar').click()
    }

    goToSignup() {
        cy.contains('a', 'Cadastre-se').click()
    }

    mockLocation(latitude,longitude) {
        return {
            onBeforeLoad(win) {
                cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((cb, err) => {
                    if (latitude && longitude) {
                    return cb({coords: {latitude, longitude}})
                    }
                    throw err({code: 1})
                })
            }
        }

    }
}

export default new LoginPage()