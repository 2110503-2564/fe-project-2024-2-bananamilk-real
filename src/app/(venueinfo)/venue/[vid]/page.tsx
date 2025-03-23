import Image from "next/image";
import getVenue from "@/libs/getVenue";
// import Link from "next/link";

export default async function VenueDetailPage({params}: {params: {vid: string}}) {
    const venue = await getVenue(params.vid);

    if (!venue) {
        return <main className="text-center p-5">Venue not found</main>;
    }

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium !py-5">{venue.name}</h1>
            
            <div className="flex flex-row my-5">
                <Image src={venue.data.picture} 
                    alt="Venue Image" width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%] h-auto"/>
                <div className="w-[70%] text-md !mx-5 text-left">
                    <h2>Name: {venue.data.name}</h2>
                    <p>Address: {venue.data.address}</p>
                    <p>District: {venue.data.district}</p>
                    <p>Province: {venue.data.province}</p>
                    <p>Postal Code: {venue.data.postalcode}</p>
                    <p>Tel: {venue.data.tel}</p>
                    <p>Daily Rate: {venue.data.dailyrate}</p>

                    {/* <Link href={`/booking?id=${params.vid}&venue=${venue.data.name}}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold !py-2 !px-4 !my-5 rounded">
                            Book Now
                        </button>
                    </Link> */}

                </div>
            </div>
        </main>
    )
}

