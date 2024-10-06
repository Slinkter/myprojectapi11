import { Button } from "@material-tailwind/react";
import React from "react";

const CatCard = ({ cat, onAction, actionLabel, actionColor, disabled }) => (
    <div className="flex flex-col justify-center items-center m-1 gap-3">
        <img
            src={cat.url || cat.image?.url}
            alt={cat.id || cat.image?.id}
            className="h-28 w-28 md:h-56 md:w-56 rounded-full object-cover object-center m-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
        />
        <Button
            className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
            color={actionColor}
            onClick={() => onAction(cat)}
            disabled={disabled}
        >
            {actionLabel}
        </Button>
    </div>
);

export default CatCard;
