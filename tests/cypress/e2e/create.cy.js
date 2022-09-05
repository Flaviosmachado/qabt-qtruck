import mapPage from '../support/pages/Map'
import createPage from '../support/pages/Create/index'

describe('Recomendacao', () => {

    it('deve recomendar um food truck', () => {

        const user = {
            name: 'Benson',
            instagram: '@benson',
            password: '123qwe'
          }
    
        const foodTruck = {
            latitude: '-19.938970341519507',
            longitude: '-43.945854306221015', 
            name: 'Tienda Del Chavo',
            details: 'O melhor lugar para tomar o suco de limao q parece de groselha',
            opening_hours: 'das 14 as 20h',
            open_on_weekends: false
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        createPage.form(foodTruck)
        createPage.submit()

        createPage.modal.haveText('Food truck cadastrado com sucesso!')

    })

    it('nao deve cadastrar foodtruck com nome duplicado', () => {
        const user = {
            name: 'Ian',
            instagram: '@porpetinhaOficial',
            password: '123qwe'
          }

          const foodTruck = {
            latitude: '-19.937482692146023',
            longitude: '-43.96111339330674', 
            name: 'Tienda del linguinni',
            details: 'Vendemos Linguinni',
            opening_hours: 'Das 12:00 ate as 14:00',
            open_on_weekends: false
        }

            cy.apiCreateUser(user)
            cy.apiLogin(user)
            cy.apiCreateFoodTruck(foodTruck)

            cy.uiLogin(user)
            mapPage.createLink()
            createPage.form(foodTruck)
            createPage.submit()
            createPage.modal.haveText('Esse food truck já foi cadastrado!')


    })

    it.only('todos os campos sao obrigatorios', () => {   
            const user = {
                name: 'Mordecai',
                instagram: '@mordecai',
                password: '123qwe'
              }
        
            const foodTruck = {
                latitude: '-19.938970341519507',
                longitude: '-43.945854306221015', 
            }
    
            cy.apiCreateUser(user)
            cy.uiLogin(user)
    
            mapPage.createLink()
            cy.setGeoLocation(foodTruck.latitude, foodTruck.longitude)
            createPage.submit()
    
            createPage.modal.haveText('Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!')

    })
})