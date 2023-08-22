import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import styled from "styled-components";

const CardExtrasWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  .left-container {
    width: 30%;
  }
  .right-container {
    width: 70%;
  }
  .available-room {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #47b847;
    width: 100%;
    font-weight: 600;
    margin: 2px 0;
  }
  .room-type {
    width: 160px;
  }
  .price {
    color: #cf0b0b;
    width: 80px;
    font-size: 20px;
    font-weight: 900;
    margin: 0 3px;
  }
`;

type Facilities = {
  label: string;
  id?: number;
};

type Price = {
  price: string;
  value: number;
  currency_exponent: number;
  currency_id: number;
  currency_iso_code: string;
};

type Rooms = {
  id: number;
  max_occupancy: number;
  min_occupancy: number;
  name: string;
  type: string;
  price: Price;
  available?: number;
  total?: number;
};

type AccommodationProps = {
  image: string;
  accommodationName: string;
  description: string;
  accommodationType: string;
  facilities: Facilities[];
  rooms: Rooms[];
};

const AccommodationCard = ({
  image,
  accommodationName,
  description,
  accommodationType,
  facilities,
  rooms,
}: AccommodationProps) => (
  <Card
    sx={{
      maxWidth: 645,
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: "#f2f2f2",
      },
      p: 2,
    }}
  >
    <CardMedia
      component="img"
      height="240"
      image={image}
      alt={accommodationName}
      sx={{
        borderRadius: "10px",
      }}
    />
    <CardContent>
      <Typography
        gutterBottom
        align="center"
        color="primary"
        fontWeight="800"
        variant="h3"
        component="div"
        minHeight="130px"
      >
        {accommodationName}
      </Typography>
      <Typography variant="body1" color="text.secondary" align="justify">
        <Typography color="primary" fontWeight="900">
          Description:
        </Typography>
        {description}
      </Typography>
      <CardExtrasWrapper>
        <div className="left-container">
          <Typography variant="body2" color="text.secondary">
            <Typography color="primary" fontWeight="900">
              Type:
            </Typography>
            {accommodationType}
          </Typography>
          <Typography variant="body2" color="primary" fontWeight="900">
            Facilities:
            {facilities.map((item) => {
              return (
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
              );
            })}
          </Typography>
        </div>
        <div className="right-container">
          <Typography variant="body2" color="primary" fontWeight="900">
            Rooms:
            {rooms.map((item) => {
              return (
                <div>
                  <Typography variant="body2" color="text.secondary">
                    {item.available && (
                      <div className="available-room">
                        <div className="room-type">{item.name}</div>{" "}
                        <div className="price">{item.price.price}</div>
                        <Button variant="contained">Book</Button>
                      </div>
                    )}
                    {!item.available && (
                      <div className="unavailable-room">
                        {" "}
                        {item.name}: Unavailable
                      </div>
                    )}
                  </Typography>
                </div>
              );
            })}
          </Typography>
        </div>
      </CardExtrasWrapper>
    </CardContent>
  </Card>
);

export default AccommodationCard;
