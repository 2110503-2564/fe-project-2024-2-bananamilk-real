const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export const fetchRestaurants = async () => {
  const res = await fetch(`${API_BASE}/restaurants`)
  const json = await res.json()
  return json.data // ✅ FIXED: return only the array
}


export const registerUser = async (data: {
  name: string;
  email: string;
  telephone: string;
  password: string;
}) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};
