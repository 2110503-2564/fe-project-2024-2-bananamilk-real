'use client'
import { init } from "next/dist/compiled/webpack/webpack";
import Card from "./Card";
import { useReducer } from "react";
import Link from "next/link";

export default function CardPanel() {

    const initialCompareList = {
        "The Bloom Pavilion": 0,
        "Spark Space": 0,
        "The Grand Table": 0
    }

    const initialState = new Map<string, number>(Object.entries(initialCompareList));

    const ratingReducer = (compareList: Map<string, number>, action: { type: "add" | "remove", venueName: string, score: number }) => {
        const updatedList = new Map(compareList);
        switch (action.type) {
            case "add": {
                updatedList.set(action.venueName, action.score);
                return new Map(updatedList);
            }
            case "remove": {
                updatedList.delete(action.venueName);
                return new Map(updatedList);
            }
            default:
                return compareList;
        }
    }

    const [compareList, dispatchRating] = useReducer(ratingReducer, initialState);

    // Mock Data
    const mockData = [
        {vid: "001", venueName: "The Bloom Pavilion", imgSrc: "/bloom.jpg"},
        {vid: "002", venueName: "Spark Space",  imgSrc: "/sparkspace.jpg"},
        {vid: "003", venueName: "The Grand Table", imgSrc: "/grandtable.jpg"}
    ]

    const listData = (
        <div className="compare-list bg-gray-500 w-[20%] rounded-lg !pl-2 !ml-5">
            Venue List with Ratings: {compareList.size}
                { Array.from(compareList.entries()).map(([venueName, score]) => (
                    <div key={venueName} data-testid={venueName}
                        onClick={() => dispatchRating({type:"remove", venueName, score:0})} 
                        className="hover:text-red-600 cursor-pointer">
                        {venueName}: {score}
                    </div>
                )) }
            </div>
    );

    return (
        <div>
            <div className="card-container" style={{margin:"20px", display:"flex", flexDirection:"row", alignContent:"space-around", justifyContent:"space-around", flexWrap:"wrap"}}>
                {
                    mockData.map((venueItem) => (
                        <Link href={`/venue/${venueItem.vid}`} className="w-1/4">
                            <Card key={venueItem.vid} imgSrc={venueItem.imgSrc} venueName={venueItem.venueName} 
                            onUpdate={(venueName:string, score:number) => dispatchRating({type:"add", venueName, score})} />
                        </Link>
                    ))
                }
            </div>
            {listData}
        </div>
    )
}
