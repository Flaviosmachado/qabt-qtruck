
describe('Avaliacao', () => {

    it('deve enviar uma avaliacao', ()=> {

        const user = {
            name: 'Madruga',
            instagram: '@madruguinha',
            password: '123qwe'
        }

        const foodTruck = {
            latitude: '-19.93909137000474',
            longitude: '-43.94653022289277', 
            name: 'Super de Quico',
            details: 'Suco de alta qualidade',
            opening_hours: 'das 12:00 as 15:00',
            open_on_weekends: false
        }

        const review = {
            comment: "O suco estava bom porem veio pouco",
            stars: 4
        }

        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodTruck)

        cy.uiLogin(user)

        cy.get(`img[alt="${foodTruck.name}"]`).click({force: true})
        cy.get('.leaflet-popup-content a').click()

        cy.get('textarea[name=comment]').type(review.comment)
        cy.get(`input[name=stars][value="${review.stars}"]`).click({force: true})
        cy.contains('button', 'Enviar avaliação').click()

        })

        it.only('deve validar a avaliacao', () => {
            const user = {
                name: 'Beatriz',
                instagram: '@beatriz',
                password: '123qwe'
            }

            const foodTruck = {
                latitude: '-19.93970659670403',
                longitude: '-43.945854306221015',
                name: 'Food da Bea',
                details: 'Melhor risoto da cidade',
                opening_hours: 'das 18:00 as 22:00',
                open_on_weekends: true
            }

            const review = {
                comment: "Melhor risoto que ja comi",
                stars: 5
            }

            cy.apiCreateUser(user)
            cy.apiLogin(user)
            cy.apiCreateFoodTruck(foodTruck)
    
            cy.uiLogin(user)
    
            cy.get(`img[alt="${foodTruck.name}"]`).click({force: true})
            cy.get('.leaflet-popup-content a').click()
    
            cy.get('textarea[name=comment]').type(review.comment)
            cy.get(`input[name=stars][value="${review.stars}"]`).click({force: true})
            cy.contains('button', 'Enviar avaliação').click()

            cy.get('.details strong').should('have.text', user.name)
            cy.get('.details span').should('have.text', user.instagram)
            cy.get('.comment p').should('have.text' ,review.comment)
            cy.get('.stars').find('svg').should('have.length', review.stars)
            
        })

    })
