'use client'
import { ClassNames } from "@emotion/react";
import InteractiveCard from "./InteractiveCard";
import { Rating } from "@mui/material";
import Image from "next/image";

interface CardProps {
  imgSrc: string;
  venueName: string;
  onUpdate: Function;
}

const Card = ({ imgSrc, venueName, onUpdate } : { imgSrc:string, venueName:string, onUpdate?:Function}) => {
  
  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    if (newValue !== null && onUpdate) {
      onUpdate(venueName, newValue);
    }
  }

  const handleRatingClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }
  
  return (
    
    <InteractiveCard contentName={venueName}>
      <div className="w-full h-[70%] relative rounded-t-lg text-black text-center">
        <Image src={imgSrc} alt={venueName} role="img" className="object-cover rounded-t-lg" width={500} height={500} layout="responsive"/>
        <h3 className="w-full h-[15%] p-[10px] !text-blue-800 !pt-2 font-bold !mt-1">{venueName}</h3>
        <div className="!mb-5 !mt-2">
        {
          onUpdate? <Rating id={`${venueName} Rating`} name={`${venueName} Rating`} defaultValue={0} readOnly={false} data-testid={`${venueName} Rating`}
          onChange={handleRatingChange}
          onClick={handleRatingClick}/>
          :""
        }
        </div>
        
      </div>
    </InteractiveCard>

  );
};

export default Card;
