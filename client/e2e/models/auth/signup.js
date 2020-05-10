import { Selector, t } from 'testcafe';

export default class SignUp {
    constructor() {
        this.title = Selector('h1');
        this.email = Selector('input').nth(0);
        this.password = Selector('input').nth(1);
        this.signInButton = Selector('button').nth(0);
    }

    async fillInput(field, value) {
        await t.typeText(this[field], value); 
    }

    async elements(){
        await t.expect(this.title.exists).ok();
        await t.expect(this.email.exists).ok();
        await t.expect(this.password.exists).ok();
        await t.expect(this.signInButton.exists).ok();
    }

    async clearValue(input) {
        await t.click(this[input]).pressKey('ctrl+a delete')
    }

    async logIn(email, password) {
        await this.fillInput('email', email);
        await this.fillInput('password', password);
        await t.click(this.signInButton);
    }
}