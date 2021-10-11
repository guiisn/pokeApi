import React, { Component } from 'react';

import Logo from '../../assets/logo.svg';
import Title from '../../assets/title.svg';

export default class Header extends Component {
    render() {
        return (
            <div className='flex items-center justify-between w-full h-32 pr-32'>
                <div className='flex flex-row items-center justify-center w-full lg:w-3/12 lg:justify-end'>
                    <img src={Logo} alt="" />
                    <img src={Title} alt="" />
                </div>
            </div>
        );
    };
};