import React from "react";
import { Box, Container, Grid } from "@mui/material";
import AccommodationCard from "./components/AccommodationCard";
import Header from "./components/Header";
import { useRoomContext } from "./context/RoomContext";

const App: React.FC = () => {
  const { allRooms } = useRoomContext();

  return (
    <div>
      <Header />
      <Container>
        <Box py={4}>
          <Grid container spacing={3}>
            {allRooms ? (
              allRooms.map(
                ({
                  image,
                  accommodationName,
                  accommodationType,
                  facilities,
                  description,
                  rooms,
                  id,
                }) => (
                  <Grid item xs={12} sm={12} md={6} key={id}>
                    <AccommodationCard
                      image={image}
                      key={id}
                      accommodationName={accommodationName}
                      description={description}
                      accommodationType={accommodationType}
                      facilities={facilities}
                      rooms={rooms}
                    />
                  </Grid>
                )
              )
            ) : (
              <div>Loading...</div>
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default App;
