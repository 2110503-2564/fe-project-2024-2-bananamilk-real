// import CardPanel from "@/components/CardPanel"
import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues"
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Venue() {
    const venues: Promise<VenueJson> = getVenues();
    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium !py-5">Select your venue</h1>
            {/* <CardPanel /> */}
            <Suspense fallback={<p>Loading... <LinearProgress /></p>}>
                <VenueCatalog venuesJson={venues} />
            </Suspense>
        </main>
    )
}