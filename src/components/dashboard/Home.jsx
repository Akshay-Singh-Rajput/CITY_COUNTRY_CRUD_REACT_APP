import React, { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
    Button,
    Box,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { getData, sort } from '../../redux/action';


export const Home = () => {
    const [ searchValue, setSearchValue ] = useState('');
    const dispatch = useDispatch();

    //Alert Msg & Loading Button
    const [ loading, setLoading ] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false);
    const [ alertMessage, setAlertMessage ] = useState('');
    const [ alertType, setAlertType ] = useState('');

    //fetching data from redux store
    const data = useSelector(store => store.storeData);



    // get data from server and store in redux
    const getProduct = async () => {
        const response = await fetch(
            "https://myfake-json-server.herokuapp.com/data"
        );
        const data = await response.json();
        dispatch(getData(data));
        // console.log('data', data);
    };


    // Delete function
    const handleDelete = (e) => {
        // console.log('e', e.target.value);
        setLoading(true);
        setShowAlert(false);

        let id = e.target.value;
        // let id = 512;
        fetch(`https://myfake-json-server.herokuapp.com/data/${id}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.status);
                dispatch(getData(data));
                getProduct();
                setLoading(false);
                setAlertType('success');
                setAlertMessage(`Deleted successfully`);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 4000);
            } else {
                setAlertType('error');
                setAlertMessage('There was an error processing your request');
                setShowAlert(true);
                setLoading(false);
                setTimeout(() => setShowAlert(false), 4000);

            }
        });
    };

    useEffect(() => {
        getProduct();
    }, []);




    return (
        <>
            { showAlert && (
                <Alert status={ alertType }>
                    <AlertIcon />
                    { alertMessage }
                </Alert>
            ) }
            <Box w='65%' m='20px auto'>
                <Flex w='80%' m='10px auto'>
                    <Input w='60%' mr='10px' type='text' placeholder='Country Name' onChange={ (e) => setSearchValue(e.target.value) } />
                    <Menu closeOnSelect={ true }>
                        <MenuButton as={ Button } ml='10px' colorScheme='blue' w='40%'>
                            Sort by Populations
                        </MenuButton>
                        <MenuList minWidth='240px'>
                            <MenuOptionGroup defaultValue='asc' title='Order' type='radio' onChange={ (e) => { dispatch(sort(e)); } }>
                                <MenuItemOption value='asc'>Ascending</MenuItemOption>
                                <MenuItemOption value='desc'>Descending</MenuItemOption>
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>
                </Flex>
                <TableContainer >
                    <Table variant='simple' colorScheme='teal'>
                        <Thead>
                            <Tr>
                                <Th fontSize='md'>Id</Th>
                                <Th fontSize='md'>Country</Th>
                                <Th fontSize='md'>City</Th>
                                <Th fontSize='md'>Population</Th>
                                <Th fontSize='md'>Edit</Th>
                                <Th fontSize='md'>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            { data.filter(item => item.country.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
                                <Tr key={ index }>
                                    <Td >{ index + 1 }</Td>
                                    <Td>{ item.country }</Td>
                                    <Td>{ item.city }</Td>
                                    <Td isNumeric>{ item.population }</Td>
                                    <Td>Edit</Td>
                                    <Td><Button isLoading={ loading } value={ item.id } onClick={ handleDelete } >Delete</Button></Td>
                                    
                                </Tr>
                            )) }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>

    );
};

