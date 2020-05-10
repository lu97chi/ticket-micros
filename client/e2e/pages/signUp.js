import { ClientFunction, Selector } from "testcafe";
import Curret from "../models/current";
import SignUp from "../models/auth/signup";

const signUp = new SignUp();
const current = new Curret();
const randomEmail = () => Math.random().toString(36).substring(6);

fixture`Signing`
  .page("https://ticketing.dev/auth/signup")
  .beforeEach(async (t) => {
    await signUp.elements();
  });

test('Inputs can change value', async(t) => {
    const selectedEmail = randomEmail();
    signUp.fillInput('email', `${selectedEmail}@gmail.com`);
    signUp.fillInput('password', 'thisPassword');
    await t.expect(signUp.email.value).eql(`${selectedEmail}@gmail.com`);
    await t.expect(signUp.password.value).eql('thisPassword');
    signUp.clearValue('email');
    signUp.clearValue('password');
    signUp.fillInput('email', `${selectedEmail}@gmail.com`);
    signUp.fillInput('password', 'pass123456789');
    await t.expect(signUp.email.value).eql(`${selectedEmail}@gmail.com`);
    await t.expect(signUp.password.value).eql('pass123456789');
});

test("Validate any field enter with enter press", async (t) => {
  await t.click(signUp.email);
  await t.pressKey("enter");
  const emailBullet = Selector(".my-0").child("li").nth(0);
  const passwordBullet = Selector(".my-0").child("li").nth(1);
  await t.expect(await emailBullet.innerText).eql("Email must be valid");
  await t.expect(await passwordBullet.innerText).eql("Password must be between 4 and 20 chars");
});

test("Validate invalid email no password with enter press", async (t) => {
  const emailBullet = Selector(".my-0").child("li").nth(0);
  const passwordBullet = Selector(".my-0").child("li").nth(1);
  signUp.fillInput("email", "rober97to");
  await t.pressKey("enter");
  await t.expect(await emailBullet.innerText).eql("Email must be valid");
  await t.expect(await passwordBullet.innerText).eql("Password must be between 4 and 20 chars");
});

test("Validate valid email no password with enter", async (t) => {
  signUp.fillInput("email", `${randomEmail()}@gmail.com`);
  await t.pressKey("enter");
  const passwordBullet = Selector(".my-0").child("li").nth(0);
  await t.expect(await passwordBullet.innerText).eql("Password must be between 4 and 20 chars");
});

test("Validate any field enter with signin button", async (t) => {
    await t.click(signUp.signInButton);
    const emailBullet = Selector(".my-0").child("li").nth(0);
    const passwordBullet = Selector(".my-0").child("li").nth(1);
    await t.expect(await emailBullet.innerText).eql("Email must be valid");
    await t.expect(await passwordBullet.innerText).eql("Password must be between 4 and 20 chars");
  });

test("Validate valid email and password with singin button", async (t) => {
  signUp.fillInput("email", `${randomEmail()}@gmail.com`);
  signUp.fillInput("password", "eagle1997");
  await t.click(signUp.signInButton);
  await current.logedSelectors();
  await t.expect(current.title.innerText).eql("You are signed in");
});

test("Validate any fiel enter with singin button press", async (t) => {
  await t.click(signUp.signInButton);
  const emailBullet = Selector(".my-0").child("li").nth(0);
  const passwordBullet = Selector(".my-0").child("li").nth(1);
  await t.expect(await emailBullet.innerText).eql("Email must be valid");
  await t.expect(await passwordBullet.innerText).eql("Password must be between 4 and 20 chars");
});

test("Validate invalid email no password with singin button press", async (t) => {
  const emailBullet = Selector(".my-0").child("li").nth(0);
  const passwordBullet = Selector(".my-0").child("li").nth(1);
  signUp.fillInput("email", "rober97to");
  await t.click(signUp.signInButton);
  await t.expect(await emailBullet.innerText).eql("Email must be valid");
  await t.expect(await passwordBullet.innerText).eql("Password must be between 4 and 20 chars");
});

test("Validate valid email no password with singin button", async (t) => {
  signUp.fillInput("email", `${randomEmail()}@gmail.com`);
  await t.click(signUp.signInButton);
  const passwordBullet = Selector(".my-0").child("li").nth(0);
  await t.expect(await passwordBullet.innerText).eql("Password must be between 4 and 20 chars");
});

test("Validate valid email and password with singin button", async (t) => {
  signUp.fillInput("email", `${randomEmail()}@gmail.com`);
  signUp.fillInput("password", "eagle1997");
  await t.click(signUp.signInButton);
  await current.logedSelectors();
  await t.expect(current.title.innerText).eql("You are signed in");
});

test('User can login', async t => {
    await signUp.logIn(`${randomEmail()}@gmail.com`,'eagle1997');
    await t.expect(current.title.innerText).eql('You are signed in');
    await current.logedSelectors();
});

test('User can logout', async t => {
    await signUp.logIn(`${randomEmail()}@gmail.com`,'eagle1997');
    await current.logedSelectors();
    await t.click(current.signOutButton);
    await t.expect(current.title.innerText).eql('You are NOT signed in');
})
