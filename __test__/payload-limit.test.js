const request = require("supertest");
const app = require("../server/various");

describe("Payload size limit", () => {

  test("reject oversized payload", async () => {
    const bigPayload = { items: "a".repeat(15 * 1024), capacity: 10 };

    const res = await request(app)
      .post("/api/bin-packing")
      .send({
        capacity: 10,
        items: bigPayload
      });

    expect(res.statusCode).toBe(413);
  });

  test("accept normal payload", async () => {
    const res = await request(app)
      .post("/api/bin-packing")
      .send({
        capacity: 10,
        items: [4, 8, 1, 4]
      });

    expect(res.statusCode).toBe(200);
  });
});
