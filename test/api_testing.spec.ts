import { expect, test } from "@playwright/test";
import pageTwoAllUsers from "../test-data/reqres_users_page_2_response.json";

test.describe.only("API Testing", () => {
  // 1. Get All Users - Compare to Saved Response
  test("Get All Users - match saved response", async ({ request }) => {
    const apiKey = process.env.API_KEY;

    if (!apiKey) throw new Error("Missing API_KEY");

    const response = await request.get("/api/users?page=2", {
      headers: {
        "x-api-key": apiKey,
      },
    });
    // Verify status from headers
    expect(response.status()).toBe(200);
    // Parse response body
    const body = await response.json();
    // Compare full structure with saved response
    expect(body).toEqual(pageTwoAllUsers);
  });

  // 2. Get One User - Field-by-Field Assertions
  test("Get single user - check field", async ({ request }) => {
    const apiKey = process.env.API_KEY;

    if (!apiKey) throw new Error("Missing API_KEY");

    const response = await request.get("/api/users/2", {
      headers: {
        "x-api-key": apiKey,
      },
    });
    // Verify status from headers
    expect(response.status()).toBe(200);
    // Parse response body
    const body = await response.json();
    // Compare data field

    expect(body.data.id).toBe(2);
    expect(body.data.email).toBe("janet.weaver@reqres.in");
    expect(body.data.first_name).toBe("Janet");
    expect(body.data.last_name).toBe("Weaver");
    expect(body.data.avatar).toBe("https://reqres.in/img/faces/2-image.jpg");
  });

  // 3.POST - Create a New User
  test.only("POST create user", async ({ request }) => {
    const apiKey = process.env.API_KEY;

    if (!apiKey) throw new Error("Missing API_KEY");

    const newUser = { first_name: "John" };

    const response = await request.post("/api/users", {
      data: newUser,
      headers: {
        "x-api-key": apiKey,
      },
    });

    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.first_name).toBe(newUser.first_name);
  });

  // 4.PUT - Update a User
  test.only("Put update user", async ({ request }) => {
    const apiKey = process.env.API_KEY;

    if (!apiKey) throw new Error("Missing API_KEY");

    const newUser = { first_name: "Janet" };

    const response = await request.put("/api/users/2", {
      data: newUser,
      headers: {
        "x-api-key": apiKey,
      },
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.first_name).toBe(newUser.first_name);
  });

  // 5.DELETE - Delete a User
  test.only("Delete user", async ({ request }) => {
    const apiKey = process.env.API_KEY;

    if (!apiKey) throw new Error("Missing API_KEY");

    const response = await request.put("/api/users/2", {
      headers: {
        "x-api-key": apiKey,
      },
    });

    expect(response.status()).toBe(200);
  });
});
