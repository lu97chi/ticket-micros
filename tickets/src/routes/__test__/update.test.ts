import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { signIn } from "../../test/setup";

it("returns 404 if id doesnt exists", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", signIn())
    .send({
      title: "Valid",
      price: 20,
    })
    .expect(404);
});

it("returns 401 if the user is not logged", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "Valid",
      price: 20,
    })
    .expect(401);
});

it("returns 401 if the ticket doesnt own the ticket", async () => {
  const ticket = await request(app)
    .post("/api/tickets")
    .set("Cookie", signIn())
    .send({
      title: "Title",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set("Cookie", signIn())
    .send({
      title: "Title 2",
      price: 21,
    })
    .expect(401);
});

it("returns 400 if the inputs are invalid", async () => {
  const cookie = signIn();
  const ticket = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "Title",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "Title",
      price: -20,
    })
    .expect(400);
});

it("update the ticket", async () => {
  const cookie = signIn();
  const ticket = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "Title",
      price: 20,
    })
    .expect(201);

  const updatedTicket = await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "New Value",
      price: 50,
    })
    .expect(200);

  const incomingTicket = await request(app)
    .get(`/api/tickets/${updatedTicket.body.id}`)
    .send()
    .expect(200);

  expect(incomingTicket.body.title).toEqual("New Value");
  expect(incomingTicket.body.price).toEqual(50);
});
