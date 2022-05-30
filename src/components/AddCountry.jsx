import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addCountry } from '../redux/action';
import {nanoid} from 'nanoid'

export const AddCountry = () => {
    const dispatch = useDispatch();
    const [ formData, setForm ] = useState({
      id : nanoid(2),
        city: '',
        country: '',
        population: '',
        
    });

    const handleChange = (e) => {
        console.log(e.target.value);
        const { id, value } = e.target;
        setForm({
            ...formData,
            [ id ]: value,
        });
    };

    // Add data to server
    const handleSubmit = () => {
        fetch("https://myfake-json-server.herokuapp.com/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        dispatch(addCountry(formData));
        console.log(formData, 'formData');
       
    };

    return (
        <FormControl w='60%' m='20px auto'>
            <FormLabel htmlFor='city'>City name</FormLabel>
            <Input id='city' type='city' onChange={ handleChange } />
            <FormLabel htmlFor='country'>Country</FormLabel>
            <Input id='country' type='country' onChange={ handleChange } />
            <FormLabel htmlFor='population'>Population</FormLabel>
            <Input id='population' type='number' onChange={ handleChange } />
            <Button w='50%' m='20px' bg='teal' color='white' onClick={ handleSubmit } >Submit</Button>
        </FormControl>
    );
};
