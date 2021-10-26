import logo from '../logo.png';
import React from "react";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import {Link} from "react-router-dom";
import {actionAuthLogout,actionSearchUser} from '../Actions/index'
import { connect } from 'react-redux';
import { useState } from 'react';
import BtnLogout from './Logout';
import { AppBar, Hidden, InputBase, Avatar, Typography, Fade, Zoom, } from "@material-ui/core";
import SearchBar from '../Components/SearchBar';
// import {Search} from './Search'

export function Navibar({isLogin}){
    return(
    <>
        <Navbar className='Navbar'>
            <Container className='header'>
              <a href='/'><img src={logo} alt={"logo"}/></a>
              <a><h1>HIPSTAGRAM</h1></a>
              <SearchBar placeholder="Search..." data={actionSearchUser} />
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  {isLogin ? (
                    <>  
                      <Nav.Link><Link to='/profile'>Profile</Link></Nav.Link>
                      <Nav.Link><Link to='/direct'>Direct</Link></Nav.Link>
                      <Nav.Link><Link to='/posts'>News</Link></Nav.Link>
                      {/* <Nav.Link><Link to='/users'>Users</Link></Nav.Link> */}
                      <Nav.Link className = "btnExite"><BtnLogout /></Nav.Link>
                    </>
                  ):(
                      <>
                        <Nav.Link><Link to="/login">Вход</Link></Nav.Link>
                        <Nav.Link><Link to="/registration">Регистрация</Link></Nav.Link>
                      </> 
                    )}
                </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
  }
const CNav = connect(state => ({isLogin: state.authReducer.payload}),null)(Navibar)
export default CNav