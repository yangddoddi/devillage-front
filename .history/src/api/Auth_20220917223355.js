const TIME_OUT = 600 * 1000;

export const auth = async (email, password) => {
  const response = await fetch("http://localhost:3000/auth", {
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
