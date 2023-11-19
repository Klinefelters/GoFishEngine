import {Box, Button, Divider, Flex, Image, Spacer} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';


export default function Home() {
    return(
        <Box bg="brand.green" style={{flex: 1}} h="100vh">
            <Flex>
                <Spacer />
                    <NavLink to="game">
                        <Image src="logo.png" h="95vh" pt="2.5vh"/>
                    </NavLink>
                <Spacer />
            </Flex>

        </Box>
    );
}