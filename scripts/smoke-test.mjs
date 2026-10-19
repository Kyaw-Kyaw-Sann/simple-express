const baseUrl = process.env.API_BASE_URL || "http://localhost:3000";

async function request(path, options = {}, expectedStatuses = [200]) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!expectedStatuses.includes(response.status)) {
    throw new Error(
      `${options.method || "GET"} ${path} returned ${response.status}: ${text}`
    );
  }

  return { body, status: response.status };
}

let createdUserId;
let deleted = false;

try {
  await request("/health");
  console.log("PASS health");

  await request("/api/users?page=1&limit=5&sort=name&order=asc");
  console.log("PASS list users");

  const createResult = await request(
    "/api/users",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `Smoke Test ${Date.now()}`,
        role: "member"
      })
    },
    [201]
  );
  createdUserId = createResult.body.data.id;
  console.log("PASS create user");

  await request(`/api/users/${createdUserId}`);
  console.log("PASS read user");

  await request(`/api/users/${createdUserId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Smoke Test Replaced", role: "admin" })
  });
  console.log("PASS replace user");

  await request(`/api/users/${createdUserId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Smoke Test Updated" })
  });
  console.log("PASS update user");

  await request(`/api/users/${createdUserId}`, { method: "DELETE" }, [204]);
  deleted = true;
  console.log("PASS delete user");

  await request(`/api/users/${createdUserId}`, {}, [404]);
  console.log("PASS not-found response");

  await request("/api/users?page=0", {}, [400]);
  console.log("PASS validation response");

  await request(
    "/api/users",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{bad"
    },
    [400]
  );
  console.log("PASS malformed JSON response");

  await request("/missing", {}, [404]);
  console.log("PASS unknown-route response");
} catch (error) {
  console.error("Smoke test failed:", error.message);
  process.exitCode = 1;
} finally {
  if (createdUserId && !deleted) {
    try {
      await request(`/api/users/${createdUserId}`, { method: "DELETE" }, [204, 404]);
      console.log("Cleaned up test user");
    } catch {
      console.error("Could not clean up the test user");
    }
  }
}
