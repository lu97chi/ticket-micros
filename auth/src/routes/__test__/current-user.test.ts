import request from "supertest";
import { app } from "../../app";

it("sends back the current user", async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send();
  expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("sends no information if not atuh", async () => {
  await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(401);
});
