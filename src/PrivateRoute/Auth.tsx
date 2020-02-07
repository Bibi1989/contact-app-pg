
class Auth {
    authenticated: boolean
    constructor() {
        this.authenticated = false
    }

    login(cb: any) {
        this.authenticated = true
        cb()
    }

    logout(cb: any) {
        this.authenticated = false
        cb()
    }

    authenticate() {
        return this.authenticated
    }
}

export default new Auth()