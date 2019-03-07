import User from '@/models/User.js'


describe('User.js', () => {
    it('instatiates a user model class', () => {

        const u = new User('asdf', 1)
        console.log(u)
    })
})