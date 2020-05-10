import { Selector, t } from 'testcafe';

export default class Curret{
    constructor() {
        this.title = Selector('h1');
        this.signOutButton = Selector('a').withAttribute('href', '/auth/signout');
        this.singInButton = Selector('a').withAttribute('href', '/auth/signin');
        this.signUpButton = Selector('a').withAttribute('href', '/auth/signup');
    }

    async logedSelectors() {
        await t.expect(this.signOutButton.exists).ok();
    }

    async notLogedSelectors() {
        await t.expect(this.singInButton.exists).ok();
        await t.expect(this.signUpButton.exists).ok();
    }
}