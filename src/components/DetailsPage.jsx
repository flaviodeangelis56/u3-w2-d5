import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const params = useParams();
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [mainTemp, setMainTemp] = useState("");
  const [weather, setWeather] = useState("");
  const latLonFetch = async () => {
    try {
      const resp = await fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=" + params.cityName + "&appid=e85009c12f9b12dd4fded80203988886",
        { method: "GET" }
      );

      const cityObj = await resp.json();
      setLat(cityObj[0].lat);
      setLon(cityObj[0].lon);
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
      setMainTemp(meteoObj.main);
      setWeather(meteoObj.weather[0].description);
    } catch (error) {
      console.log(error);
    }
  };

  const meteoNextDayFetch = async () => {
    try {
      const resp = await fetch(
        " api.openweathermap.org/data/2.5/forecast?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=e85009c12f9b12dd4fded80203988886",
        { method: "GET" }
      );
      const meteoNextObj = await resp.json();
      console.log(meteoNextObj);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    latLonFetch();
    if (lat) {
      meteoFetch();
      meteoNextDayFetch();
    }
  }, [lat, lon]);

  return (
    <div>
      {mainTemp && (
        <Container className="text-center">
          <h3 className="text-center mt-5 fs-1 mb-0">{params.cityName}</h3>
          <p>{weather}</p>
          <h3 className="tempFont mb-4">{parseInt(mainTemp.temp - 273)}°</h3>
          <Row>
            <Col className="d-none d-xl-inline" xl={4}>
              <p className="centerTemp d-inline">percepita: {parseInt(mainTemp.feels_like - 273)}°</p>
            </Col>
            <Col className="d-none d-xl-inline" xl={4}>
              <p className="centerTemp d-inline">massima: {parseInt(mainTemp.temp_max - 273)}°</p>
            </Col>
            <Col className="d-none d-xl-inline" xl={4}>
              <p className="centerTemp d-inline">minima: {parseInt(mainTemp.temp_min - 273)}°</p>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default DetailsPage;
