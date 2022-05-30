import React, { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Container,
    Flex,
    Button,
    Box,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

// import data from './data';
import { getData, sort } from '../../redux/action';


export const Home = () => {
    const [ searchValue, setSearchValue ] = useState('');
    const dispatch = useDispatch();
    const data = useSelector(store => store.storeData);

    // console.log('data', data);

    const getProduct = async () => {
        const response = await fetch(
            "https://myfake-json-server.herokuapp.com/data"
        );
        const data = await response.json();
        dispatch(getData(data));
        // console.log('data', data);
    };

    const handleDelete = (e) => {
        console.log('e', e.target.value);
        let id = e.target.value;
        fetch(`https://myfake-json-server.herokuapp.com/data/${id}`, {
            method: "DELETE",
        });
        getProduct();
    }


    useEffect(() => {
        getProduct();
    }, [  ]);


    

    return (
        <Box w='60%' m='20px auto'>
            <Flex w='80%' m='10px auto'>
                <Input w='60%' mr='10px' type='text' placeholder='Country Name' onChange={ (e) => setSearchValue(e.target.value) } />
                <Menu closeOnSelect={ true }>
                    <MenuButton as={ Button } ml='10px' colorScheme='blue' w='40%'>
                        Sort by Populations
                    </MenuButton>
                    <MenuList minWidth='240px'>
                        <MenuOptionGroup defaultValue='asc' title='Order' type='radio' onChange={ (e) => { dispatch(sort(e)) } }>
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
                            <Th>Id</Th>
                            <Th>Country</Th>
                            <Th>City</Th>
                            <Th isNumeric>Population</Th>
                            <Th>Edit</Th>
                            <Th >Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        { data.filter(item => item.country.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
                            <Tr key={ index }>
                                <Td isNumeric>{ index + 1 }</Td>
                                <Td>{ item.country }</Td>
                                <Td>{ item.city }</Td>
                                <Td isNumeric>{ item.population }</Td>
                                <Td>Edit</Td>
                                <Button value={item.id} onClick={ handleDelete} >Delete</Button>
                            </Tr>
                        )) }
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

