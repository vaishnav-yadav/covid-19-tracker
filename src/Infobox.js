import React from 'react';
import {Card , CardContent ,  Typography } from '@material-ui/core';

function Infobox({title , cases , total }) {
    return (
       <Card className="infoBox">
           <CardContent>
               {/* Title i.e coroan virus cases */}
               <Typography className="infoBox__title" color="textSecondary">
                   {title}
               </Typography>
               <h2 className="infoBox__cases">{cases}</h2>
               {/* 120k no. of cases*/}
               {/* Title 1.2M total  */}
               <Typography className="infoBox__total" color="textSecondary">
                   {total}
               </Typography>
           </CardContent>
       </Card>
    )
}

export default Infobox;
