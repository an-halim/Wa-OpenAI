const request = require("supertest");
const baseURL = "http://localhost:5000/api";

const getTenNumber = (length) => {
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let result = "";
  for (let i = 0; i < length; i++) {
    result += number[Math.floor(Math.random() * number.length)];
  }
  return result;
};

const validNumber = "62856478474" + getTenNumber(2);
const randomString = (length) => {
  const string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += string[Math.floor(Math.random() * string.length)];
  }
  return result;
};

const body = {
  name: randomString(10),
  username: randomString(5),
  phone: getTenNumber(10),
  password: "false",
};

const validBody = {
  name: randomString(10),
  username: randomString(5),
  phone: "6281211453163",
  password: "false",
};

let responseBody;

describe("POST /register", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).post("/register").send(validBody);
    responseBody = response.body;
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Register success');
  });
  it("should return 400 due validation number", async () => {
    const response = await request(baseURL).post("/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Register failed');
  });
});

describe("GET /verify", () => {
  it("should return 404 due invalid otp", async () => {
    const response = await request(baseURL).get(`/verify?code=${randomString(5)}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found or token invalid');
  });

  it("should return 200", async () => {
    const response = await request(baseURL).get(`/verify?code=${responseBody.data.user.otp}`)
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Verify success');
  });
});

describe("POST /login", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).post("/login").send({phone: body.phone, password: body.password});
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Login success');
  });
  it("should return 404 due invalid user", async () => {
    const response = await request(baseURL).post("/login").send({phone: body.phone.slice(0, 7), password: body.password});
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});
