export default async function getVenues() {

    await new Promise(resolve => setTimeout(resolve, 300));

    const res = await fetch('https://a08-venue-explorer-backend.vercel.app/api/v1/venues')
    if(!res.ok) {
        throw new Error('Failed to fetch venues')
    }

    return await res.json();
} 