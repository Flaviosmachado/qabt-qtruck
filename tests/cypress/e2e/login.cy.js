import loginPage from '../support/pages/Login'
import mapPage from '../support/pages/Map'

describe('Login', () => {
  it('login com sucesso', () => {
    const user = {
      name: 'Flavio',
      instagram: '@flaviosmachado',
      password: '123qwe'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.Submit()

    mapPage.loggedUser(user.name)
  })

  it('nao deve logar com senha invalida', () => {
    const user = {
      instagram: '@flaviosmachado',
      password: '123qwe1'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.Submit()

    loginPage.modal.haveText('Credenciais inválidas, tente novamente!')
    
  })

  it('nao deve logar com instagram inexistente', () => {
    const user = {
      instagram: '@flavios',
      password: '123qw'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.Submit()

    loginPage.modal.haveText('Credenciais inválidas, tente novamente!')

  })
  it('instagram deve ser obrigatorio', () => {
    const user = {
      password: '123qw'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.Submit()

    loginPage.modal.haveText('Por favor, informe o seu código do Instagram!')

  })

  it('senha deve ser obrigatorio', () => {
    const user = {
      instagram: '@flaviosmachado',
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.Submit()

    loginPage.modal.haveText('Por favor, informe a sua senha secreta!')

  })

  it('todos os campos sao obrigatorios', () => {
    loginPage.go()
    loginPage.Submit()

    loginPage.modal.haveText('Por favor, informe suas credenciais!')

  })
})
