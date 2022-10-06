import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox({ title, cases, casesType, active, total, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && `infoBox--selected-${casesType}`}`}
    >
      <CardContent>
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>

        <h2 className={`infoBox__cases-${casesType}`}>{cases}</h2>

        <Typography className='infoBox__total' color='textSecondary'>
          Total: {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
