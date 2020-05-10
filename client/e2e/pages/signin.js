import { ClientFunction, Selector } from "testcafe";
import Signin from "../models/auth/signin";
import Curret from "../models/current";

const signIn = new Signin();
const current = new Curret();

fixture`Signing`
  .page("https://ticketing.dev/auth/signin")
  .beforeEach(async (t) => {
    await signIn.elements();
  });

test('Inputs can change value', async(t) => {
    signIn.fillInput('email', 'lu97is@gmail.com');
    signIn.fillInput('password', 'thisPassword');
    await t.expect(signIn.email.value).eql('lu97is@gmail.com');
    await t.expect(signIn.password.value).eql('thisPassword');
    signIn.clearValue('email');
    signIn.clearValue('password');
    signIn.fillInput('email', 'rober97to@gmail.com');
    signIn.fillInput('password', 'pass123456789');
    await t.expect(signIn.email.value).eql('rober97to@gmail.com');
    await t.expect(signIn.password.value).eql('pass123456789');
});

test("Validate any field enter with enter press", async (t) => {
  await t.click(signIn.email);
  await t.pressKey("enter");
  const emailBullet = Selector(".my-0").child("li").nth(0);
  const passwordBullet = Selector(".my-0").child("li").nth(1);
  await t.expect(await emailBullet.innerText).eql("Email must be valid");
  await t.expect(await passwordBullet.innerText).eql("Password is needed");
});

test("Validate invalid email no password with enter press", async (t) => {
  const emailBullet = Selector(".my-0").child("li").nth(0);
  const passwordBullet = Selector(".my-0").child("li").nth(1);
  signIn.fillInput("email", "lu97is");
  await t.pressKey("enter");
  await t.expect(await emailBullet.innerText).eql("Email must be valid");
  await t.expect(await passwordBullet.innerText).eql("Password is needed");
});

test("Validate valid email no password with enter", async (t) => {
  signIn.fillInput("email", "lu97is@gmail.com");
  await t.pressKey("enter");
  const passwordBullet = Selector(".my-0").child("li").nth(0);
  await t.expect(await passwordBullet.innerText).eql("Password is needed");
});

test("Validate any field enter with signin button", async (t) => {
    await t.click(signIn.signInButton);
    const emailBullet = Selector(".my-0").child("li").nth(0);
    const passwordBullet = Selector(".my-0").child("li").nth(1);
    await t.expect(await emailBullet.innerText).eql("Email must be valid");
    await t.expect(await passwordBullet.innerText).eql("Password is needed");
  });

test("Validate valid email and password with singin button", async (t) => {
  signIn.fillInput("email", "lu97is@gmail.com");
  signIn.fillInput("password", "eagle1997");
  await t.click(signIn.signInButton);
  await current.logedSelectors();
  await t.expect(current.title.innerText).eql("You are signed in");
});

test("Validate any fiel enter with singin button press", async (t) => {
  await t.click(signIn.signInButton);
  const emailBullet = Selector(".my-0").child("li").nth(0);
  const passwordBullet = Selector(".my-0").child("li").nth(1);
  await t.expect(await emailBullet.innerText).eql("Email must be valid");
  await t.expect(await passwordBullet.innerText).eql("Password is needed");
});

test("Validate invalid email no password with singin button press", async (t) => {
  const emailBullet = Selector(".my-0").child("li").nth(0);
  const passwordBullet = Selector(".my-0").child("li").nth(1);
  signIn.fillInput("email", "lu97is");
  await t.click(signIn.signInButton);
  await t.expect(await emailBullet.innerText).eql("Email must be valid");
  await t.expect(await passwordBullet.innerText).eql("Password is needed");
});

test("Validate valid email no password with singin button", async (t) => {
  signIn.fillInput("email", "lu97is@gmail.com");
  await t.click(signIn.signInButton);
  const passwordBullet = Selector(".my-0").child("li").nth(0);
  await t.expect(await passwordBullet.innerText).eql("Password is needed");
});

test("Validate valid email and password with singin button", async (t) => {
  signIn.fillInput("email", "lu97is@gmail.com");
  signIn.fillInput("password", "eagle1997");
  await t.click(signIn.signInButton);
  await current.logedSelectors();
  await t.expect(current.title.innerText).eql("You are signed in");
});

test('User can login', async t => {
    await signIn.logIn('lu97is@gmail.com','eagle1997');
    await t.expect(current.title.innerText).eql('You are signed in');
    await current.logedSelectors();
});

test('User can logout', async t => {
    await signIn.logIn('lu97is@gmail.com','eagle1997');
    await current.logedSelectors();
    await t.click(current.signOutButton);
    await t.expect(current.title.innerText).eql('You are NOT signed in');
})
