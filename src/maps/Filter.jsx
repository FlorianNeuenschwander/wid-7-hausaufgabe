import { useState } from "react";
import { Button, ButtonGroup, Box, Typography } from "@mui/material";

export default function Filter({ setMinMag, setTimespan }) {
  // State für den aktuell ausgewählten Button in jeder Kategorie
  const [selectedMag, setSelectedMag] = useState("all");
  const [selectedTime, setSelectedTime] = useState("week");

  // Handler-Funktion für die Auswahl der Magnitude
  const handleMagSelect = (mag) => {
    setSelectedMag(mag);
    setMinMag(mag);
  };

  // Handler-Funktion für die Auswahl des Zeitraums
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setTimespan(time);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      bgcolor="white"
      borderBottom="1px solid #ddd"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
      zIndex={1000}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Select Magnitude</Typography>
        <ButtonGroup>
          <Button
            variant={selectedMag === "all" ? "contained" : "outlined"}
            onClick={() => handleMagSelect("all")}
          >
            All
          </Button>
          <Button
            variant={selectedMag === "1.0" ? "contained" : "outlined"}
            onClick={() => handleMagSelect("1.0")}
          >
            M1.0+
          </Button>
          <Button
            variant={selectedMag === "2.5" ? "contained" : "outlined"}
            onClick={() => handleMagSelect("2.5")}
          >
            M2.5+
          </Button>
          <Button
            variant={selectedMag === "4.5" ? "contained" : "outlined"}
            onClick={() => handleMagSelect("4.5")}
          >
            M4.5+
          </Button>
          <Button
            variant={selectedMag === "significant" ? "contained" : "outlined"}
            onClick={() => handleMagSelect("significant")}
          >
            Significant
          </Button>
        </ButtonGroup>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Select Time Period</Typography>
        <ButtonGroup>
          <Button
            variant={selectedTime === "hour" ? "contained" : "outlined"}
            onClick={() => handleTimeSelect("hour")}
          >
            Last Hour
          </Button>
          <Button
            variant={selectedTime === "day" ? "contained" : "outlined"}
            onClick={() => handleTimeSelect("day")}
          >
            Last Day
          </Button>
          <Button
            variant={selectedTime === "week" ? "contained" : "outlined"}
            onClick={() => handleTimeSelect("week")}
          >
            Last 7 Days
          </Button>
          <Button
            variant={selectedTime === "month" ? "contained" : "outlined"}
            onClick={() => handleTimeSelect("month")}
          >
            Last 30 Days
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
