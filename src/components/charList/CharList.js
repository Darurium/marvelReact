import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

class CharList extends Component {

    state = {
        charList: [],
        loadng: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onCharListUpdate();
    }

    onCharListLoaded = (list) => {
        this.setState({
            charList: list,
            loading: false,
            error: false
        })
    }

    onCharListLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            error: true
        })
    }

    onCharListUpdate = () => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }    

    render() {

        const {charList, loading, error} = this.state;

        // Формирование списка элементов
        const elems = charList.map(item => {
            /////// Проверка на наличие картинки в api
            let classImg = {};
            if (item.thumbnail.indexOf("image_not_available") !== -1) {
                classImg = {objectFit: "contain"};
            }
            ///////
            return (
                <li className="char__item" key={item.id}>
                    <img src={item.thumbnail} alt={item.name} style={classImg}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        
        const content = loading ? <Spinner/> : elems;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {error ? <Error/> : content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;