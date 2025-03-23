import Link from "next/link";
import Card from "./Card";

export default async function VenueCatalog({venuesJson} : {venuesJson: Promise<VenueJson>}) {
    const venuesJsonResult = await venuesJson
    return (
        <>
            Explore {venuesJsonResult.count} fabulous venues in our venue catalog
            <div className="card-container" style={{margin:"20px", display:"flex", flexDirection:"row", alignContent:"space-around", justifyContent:"space-around", flexWrap:"wrap"}}>
                    {
                        venuesJsonResult.data.map((venueItem: VenueItem) => (
                            <Link href={`/venue/${venueItem.id}`} className="w-1/4">
                                <Card key={venueItem.id} imgSrc={venueItem.picture} venueName={venueItem.name} />
                            </Link>
                        ))
                    }
            </div>
        </>
    )
}