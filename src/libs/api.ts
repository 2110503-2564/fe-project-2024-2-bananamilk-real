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

async function getToken() {
  const res = await fetch("/api/auth/session");
  if (res.ok) {
      const session = await res.json();
      return session.user.token;
  }
  return null;
}

export const editRestaurant = async (
  _id: string,
  updatedData: {
    name?: string;
    address?: string;
    tel?: string;
    worktime?: string;
  }
) => {
  try {
    // Construct the URL using the restaurant's ID
    const url = `${API_BASE}/restaurants/${_id}`;

    // Make the PUT request
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify(updatedData),
    });

    // Check if the response is okay
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to edit restaurant');
    }

    // Parse the JSON response
    const json = await res.json();
    console.log('Restaurant updated successfully:', json);
    return json;
  } catch (error) {
    console.error('Error editing restaurant:', error);
    throw error;
  }
};


// Convert a date string or object to GMT+7
const convertToGMT7 = (date: string | Date) => {
  const d = new Date(date);
  const offset = 7 * 60 * 60 * 1000; // GMT+7 offset in milliseconds
  const localTime = new Date(d.getTime() + offset);
  return localTime.toISOString().slice(0, 16); // Format for datetime-local
};

export const editReservation = async (
  _id: string,
  updatedData: { reservationDate?: string }
) => {
  try {
      // Convert reservationDate to GMT+7 before sending it to the backend
      const formattedData = {
          ...updatedData,
          reservationDate: updatedData.reservationDate
              ? convertToGMT7(updatedData.reservationDate)
              : undefined,
      };

      const url = `${API_BASE}/reservations/${_id}`;
      const res = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify(formattedData),
      });

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to edit reservation');
      }

      const json = await res.json();
      console.log('Reservation updated successfully:', json);
      return json;
  } catch (error) {
      console.error('Error editing reservation:', error);
      throw error;
  }
};
