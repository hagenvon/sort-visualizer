import React, {useState} from 'react';

import {makeGetColorByRatio} from "./helper/getBackgroundColor";
import {MAX_VALUE, MIN_VALUE, TOTAL_COUNT} from "./_constants";
const getColorByRatio = makeGetColorByRatio('#b92b27', '#1565C0');


const itemStyle = ({value, index, total}) => {
    value = value/(MAX_VALUE/100);
    const width = 100 / total + "%";
    return {
        height: (value + 10) + "px",
        width,
        left: (index) * 100 / total + "%",
        padding: "2px"

    }
};

const itemContentStyle = ({value, isHighlighted}) => {

    return {
        backgroundColor: isHighlighted? shadeColor(getColorByRatio(value / MAX_VALUE), -50) : getColorByRatio(value / MAX_VALUE),
        position: "absolute",
        top: 0,
        left: 1,
        right: 1,
        bottom: 0
    }
};


export default function Item(props) {
    return (<div className={"item"} style={itemStyle(props)}>
        <div className={"item-content"} style={itemContentStyle(props)}></div>
    </div>)
}

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}
