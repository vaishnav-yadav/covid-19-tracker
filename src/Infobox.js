import React from 'react';
import './Infobox.css';
import {Card , CardContent ,  Typography } from '@material-ui/core';

function Infobox({title , cases ,isRed, active, total,...props }) {
    return (
       <Card className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}` }onClick={props.onClick}>
           <CardContent>
               {/* Title i.e coroan virus cases */}
               <Typography className="infoBox__title" color="textSecondary">
                   {title}
               </Typography>
               Today : <h2 className={ `infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>{cases}</h2>
               {/* 120k no. of cases*/}
               {/* Title 1.2M total  */}
               <Typography className="infoBox__total" color="textSecondary">
                  Total : {total}
               </Typography>
           </CardContent>
       </Card>
    )
}

export default Infobox;
