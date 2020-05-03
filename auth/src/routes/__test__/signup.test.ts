import request from "supertest";
import { app } from "../../app";

const url = "/api/users/signup";
const emails = {
  valid: "test@test.com",
  invalid: "testtest.com",
};

const passwords = {
  valid: "password123456",
  invalid: "123",
};

it("Signup success", async () => {
  return request(app)
    .post(url)
    .send({
      email: emails.valid,
      password: passwords.valid,
    })
    .expect(201);
});

it("400 with an invalid email", async () => {
  return request(app)
    .post(url)
    .send({
      email: emails.invalid,
      password: passwords.valid,
    })
    .expect(400);
});

it("400 with invalid password", async () => {
  return request(app)
    .post(url)
    .send({
      email: emails.valid,
      password: passwords.invalid,
    })
    .expect(400);
});

it("400 if email is missing", async () => {
  return request(app)
    .post(url)
    .send({
      email: "",
      password: passwords.valid,
    })
    .expect(400);
});

it("400 if password is missing", async () => {
  return request(app).post(url).send({
    email: emails.valid,
    password: "",
  });
});

it("Not duplicate emails", async () => {
  await request(app)
    .post(url)
    .send({
      email: emails.valid,
      password: passwords.valid,
    })
    .expect(201);

  await request(app)
    .post(url)
    .send({
      email: emails.valid,
      password: passwords.valid,
    })
    .expect(400);
});

it('sets cookie', async() => {
    const response = await request(app)
    .post(url)
    .send({
      email: emails.valid,
      password: passwords.valid,
    })
    .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
})