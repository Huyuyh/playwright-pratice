import { expect, test } from "@playwright/test";

test.describe("Login tests", () => {
  test("Positive login test", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.getByRole("textbox", { name: "Username" }).click();
    await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("SuperSecretPassword!");
    await page.getByRole("button", { name: " Login" }).click();
    await page.getByText("You logged into a secure area").click();
    await expect(page.locator("#flash")).toContainText(
      "You logged into a secure area! ×",
    );
  });

  test("Negative login test", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.getByRole("textbox", { name: "Username" }).click();
    await page.getByRole("textbox", { name: "Username" }).fill("fail_user");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("fail_password");
    await page.getByRole("button", { name: " Login" }).click();
    await expect(page.locator("#flash")).toContainText(
      "Your username is invalid!",
    );
  });
});
