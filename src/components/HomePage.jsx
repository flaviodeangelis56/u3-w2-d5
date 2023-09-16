import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [città, setCittà] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [mainTemp, setMainTemp] = useState("");

  const SetStateCity = cittàSelezionata => {
    setCittà(cittàSelezionata);
  };

  const AddComment = async event => {
    event.preventDefault();
    await latLonFetch();
  };
  useEffect(() => {
    meteoFetch();
  }, [lat, lon]);

  const latLonFetch = async () => {
    try {
      const resp = await fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=" + città + "&appid=e85009c12f9b12dd4fded80203988886",
        { method: "GET" }
      );

      const cityObj = await resp.json();
      setLat(cityObj[0].lat);
      setLon(cityObj[0].lon);
      console.log(cityObj);
    } catch (error) {
      console.log(error);
    }
  };

  const meteoFetch = async () => {
    try {
      const resp = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=e85009c12f9b12dd4fded80203988886",
        { method: "GET" }
      );
      const meteoObj = await resp.json();
      console.log(meteoObj);
      setMainTemp(meteoObj.main);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container>
        <InputGroup className="mb-1 justify-content-center mt-4">
          <Form className="w-100" onSubmit={AddComment}>
            <Form.Group className="mb-1">
              <Form.Control
                type="text"
                placeholder="cerca una città"
                className="mb-2"
                onChange={event => SetStateCity(event.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="m-auto">
              Cerca
            </Button>
          </Form>
        </InputGroup>
        {lat && (
          <div className="mt-5">
            <h2 className="text-center mb-4 tempFont">{parseInt(mainTemp.temp - 273)}°</h2>

            <div className="mt-4 d-flex justify-content-center">
              <Link to={"/city-details/" + città}>
                <Button>visualizza dettagli</Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default HomePage;
