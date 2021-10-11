import React, { Component } from "react";

import { api } from "../../services/api-services";

interface IStateModal {
    name: any,
    photo: any,
    url: any,
    onClose: any,
}

interface IState {
    type: any,
    data: any,
    weight: any,
    height: any,
    base_experience: any,
};

export default class Modal extends Component <any, IState> {
    constructor(props: IState) {
        super(props);

        this.state = {
            type: '',
            data: [],
            weight: '',
            height: '',
            base_experience: '',
        };
    };


    componentDidMount() {
        api
            .get(this.props.url)
            .then((response: any) => {
                this.setState({
                    data: response.data,
                    type: response.data.types[0].type.name,
                    height: response.data.height,
                    weight: response.data.weight,
                })
            })
    };

    render() {
        return(
            <div className='fixed top-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-60' onClick = {this.props.onClose}>
                <div className='relative flex flex-col items-center w-6/12 p-3 bg-white h-2/4 rounded-2xl'>
                    <button onClick = {this.props.onClose} >
                        <div className='absolute flex items-center justify-center w-8 h-8 font-bold border border-green-200 rounded-full cursor-pointer select-none right-5 hover:border-green-500 hover:text-red-500'>X</div>
                    </button>

                    <div className='flex justify-center w-full'>
                        <h1 className='w-1/2 font-semibold text-center border-b border-green-500'>{this.props.name}</h1>
                    </div>

                    <div className='grid w-full h-full grid-cols-2'>
                        <div className='flex items-center justify-center h-full '>
                            <img src={this.props.photo} alt={this.props.name} className='w-full'/>
                        </div>
                        <div className='flex items-center justify-center'>
                            <ul>
                                <li><strong>Type:</strong> {this.state.type}</li>
                                <li><strong>Height:</strong> {this.state.height} kg</li>
                                <li><strong>weight:</strong> {this.state.weight} m</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};