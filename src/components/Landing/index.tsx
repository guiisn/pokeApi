import React, { Component } from 'react';

import { api } from '../../services/api-services';
import { getPokemonImageUrl } from '../../services/image-services';

import Modal from '../../components/Modal';

interface IStateLanding {
    pokemons: any,
    types: any,
    isModalVisible: any,
    name: any,
    photo: any,
    url: any,
};

export default class Landing extends Component<any, IStateLanding> {
    constructor(props: any) {
        super(props);
        this.state = {
            pokemons: [],
            types: [],
            isModalVisible: false,
            name: '',
            photo: '',
            url: '',
        };

        this.hideModal = this.hideModal.bind(this);
    };

    componentDidMount() {
        api
            .get(`/pokemon?limit=100`)
            .then((response) => {
                this.setState({
                    pokemons: response.data.results,
                });
            });
    };

    capitalize = (word: any) => {
        return word.charAt(0).toUpperCase() + word.substr(1);
    };

    hideModal = () => {
        this.setState({ isModalVisible: false });
    };

    render() {
        return (
            <div className='flex flex-col items-center w-full mt-5'>
                {this.state.isModalVisible ? <Modal name={this.state.name} photo={this.state.photo} url={this.state.url} data={[]} onClose={this.hideModal} /> : null}
                <div className='grid w-10/12 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
                    {this.state.pokemons.map((pokemon: any, key: any) =>
                        <button onClick={() => this.setState({
                            isModalVisible: true,
                            name: this.capitalize(pokemon.name),
                            photo: getPokemonImageUrl(key + 1),
                            url: pokemon.url,
                        })}>
                            <div key={key} className='w-11/12 m-2 border border-green-300 cursor-pointer select-none h-44 rounded-2xl hover:bg-green-300 hover:shadow-2xl hover:text-white'>
                                <div className='mt-2 ml-5 font-semibold'>
                                    <h1>{this.capitalize(pokemon.name)}</h1>
                                </div>
                                <div className='flex flex-row items-center justify-between h-full'>
                                    <div className='flex justify-center w-full h-3/4'>
                                        <img src={getPokemonImageUrl(key + 1)} alt={pokemon.name} />
                                    </div>
                                </div>
                            </div>
                        </button>
                    )}
                </div>
            </div>
        );
    };
};