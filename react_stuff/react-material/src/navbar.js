import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography';
import {Home, Book, AccountBox} from '@material-ui/icons'
import {Link} from 'react-router-dom';


function NavBar(props){
    return (
        <List component="nav">
            <ListItem component="div">
                <ListItemText inset>
                    
                    
                    <TypoGraphy color="inherit" variant="title">
                        <Link to="/">
                            Home <Home/>
                        </Link>
                    </TypoGraphy>
                    
                    
                </ListItemText>

                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        
                        <Link to="/posts">
                            Posts <Book/>
                        </Link>
                    </TypoGraphy>
                
                </ListItemText>

                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        
                        <Link to="/contact">
                            Contact <AccountBox/>
                        </Link>
                    </TypoGraphy>
                
                </ListItemText>
            
            </ListItem>
        
        </List>


    );
}

export default NavBar;