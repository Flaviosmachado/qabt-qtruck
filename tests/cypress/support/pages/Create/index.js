import modal from '../components/Modal'


class CreatePage {

    constructor() {
        this.modal = modal
    }

    form(foodTruck) {
        cy.setGeoLocation(foodTruck.latitude, foodTruck.longitude)
        cy.get('input[name=name]').type(foodTruck.name)
        cy.get('textarea[name=details]').type(foodTruck.details)
        cy.get('input[name=opening-hours]').type(foodTruck.opening_hours)

        cy.contains('button', foodTruck.open_on_weekends ? 'Sim' : 'Não').click()

        // if(foodTruck.open_on_weekends === 'Sim')
        //     cy.contains('button', 'Sim').click()

        // if(foodTruck.open_on_weekends === 'Não')
        //     cy.contains('button', 'Não').click()            
    }
    submit () {
        cy.contains('button', 'Cadastrar').click()
    }
}

export default new CreatePage()