const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export const fetchRestaurants = async () => {
  // alert(`fetchRestaurants @${API_BASE}/restaurants`)
  const res = await fetch(`${API_BASE}/restaurants`)
  const json = await res.json()
  return json.data
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
  console.log('Starting login process...');
  
  // Step 1: Login request
  const loginRes = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!loginRes.ok) {
    console.error('Login failed');
    throw new Error('Login failed');
  }

  const loginData = await loginRes.json();
  console.log('Login successful, loginData:', loginData);

  // Step 2: Fetch user details
  const userRes = await fetch(`${API_BASE}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginData.token}`, // Pass token to authenticate the request
    },
  });

  if (!userRes.ok) {
    console.error('Failed to fetch user details');
    throw new Error('Failed to fetch user details');
  }

  const userData = await userRes.json();
  console.log('User data fetched successfully:', userData); // Log user data here
  
  return {
    token: loginData.token, // Token from login API
    user: userData.data, // User data fetched from `/auth/me`
  };

};
