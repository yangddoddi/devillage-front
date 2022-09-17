export const requestToken = async (refreshToken) => {
  const response = await fetch("http://localhost:8080/auth/token", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });
  const data = await response.json();
  return data;
};
