import { List, ListItem, ListIcon } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { SettingsIcon, LinkIcon } from "@chakra-ui/icons"
import { FaHome } from 'react-icons/fa';

export default function NavList(){
    return(
        <List color="brand.300" fontSize="1.2em" spacing={4}>
              <ListItem>
                <NavLink to="/">
                  <ListIcon as={FaHome} color="brand.300" />
                  Home
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="game">
                  <ListIcon as={LinkIcon} color="brand.300" />
                  Game
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="settings">
                  <ListIcon as={SettingsIcon} color="brand.300" />
                  Settings
                </NavLink>
              </ListItem>
            </List>
    );
}