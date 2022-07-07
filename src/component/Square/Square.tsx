import React, {useState} from "react";

const Square = (attr: {value: string, onClick: any}) =>{
     return (
            <button className="square" onClick={attr.onClick}>
                {attr.value}    
            </button>
        );
     }

export default Square;