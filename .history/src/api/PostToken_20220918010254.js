export const postToken = async (email, password) => {
  const response = await fetch("http://localhost:8080/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  return data;
};
