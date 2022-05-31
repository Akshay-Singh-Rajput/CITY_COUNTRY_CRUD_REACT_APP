import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";

export const AddCountry = () => {
  //Alert Msg & Loading Button
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const [formData, setForm] = useState({
    id: nanoid(2),
    city: "",
    country: "",
    population: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    const { id, value } = e.target;
    setForm({
      ...formData,
      [id]: value,
    });
  };

  const clearForm = () => {
    setForm({
      id: nanoid(2),
      city: "",
      country: "",
      population: "",
    });
  };

  // Add data to server
  const handleSubmit = () => {
    setLoading(true);
    setShowAlert(false);

    if (
      formData.country === "" ||
      formData.city === "" ||
      formData.population === ""
    ) {
      setAlertType("error");
      setAlertMessage("Please Fill All Fields");
      setShowAlert(true);
      setLoading(false);
      setTimeout(() => setShowAlert(false), 4000);
    } else {
      fetch("https://myfake-json-server.herokuapp.com/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => {
        console.log({ res, formData });
        if (res.status === 201) {
          console.log(res.status);
          setLoading(false);
          setAlertType("success");
          setAlertMessage(`Data Added,successfully`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            clearForm();
          }, 4000);
        } else {
          setAlertType("error");
          setAlertMessage("There was an error processing your request");
          setShowAlert(true);
          setLoading(false);
          setTimeout(() => setShowAlert(false), 4000);
        }
      });
    }
  };

  return (
    <>
      {showAlert && (
        <Alert status={alertType}>
          <AlertIcon />
          {alertMessage}
        </Alert>
      )}
      <FormControl w="60%" m="20px auto" isRequired={true}>
        <FormLabel htmlFor="city">City name</FormLabel>
        <Input
          id="city"
          type="city"
          value={formData.city}
          onChange={handleChange}
        />
        <FormLabel htmlFor="country">Country</FormLabel>
        <Input
          id="country"
          type="country"
          value={formData.country}
          onChange={handleChange}
        />
        <FormLabel htmlFor="population">Population</FormLabel>
        <Input
          id="population"
          type="number"
          value={formData.population}
          onChange={handleChange}
        />
        <Button
          w="50%"
          m="20px"
          bg="teal"
          color="white"
          onClick={handleSubmit}
          isLoading={loading}
        >
          Submit
        </Button>
      </FormControl>
    </>
  );
};
