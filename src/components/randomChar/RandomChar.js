import MarvelService from "../../services/MarvelService";
import { Component } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
 
    state = {
        char: {},
        loading: true,
        error: false
    } 

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        // const id = 1009225;
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {

        const {loading, error} = this.state;

        const content = loading ? <Spinner/> : <View char = {this.state.char}/>

        return (
            <div className="randomchar">
                {error ? <Error/> : content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {

    let classImg = {};

    if (char.thumbnail.indexOf("image_not_available") !== -1) {
        classImg = {objectFit: "contain"};
    }

    return (
        <div className="randomchar__block">
            <img
                src={char.thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={classImg}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{char.name}</p>
                <p className="randomchar__descr">
                    {char.description}
                </p>
                <div className="randomchar__btns">
                    <a href={char.homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={char.wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}   

export default RandomChar;