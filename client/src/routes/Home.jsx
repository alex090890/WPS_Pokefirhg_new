import './styles/Home.css'
import Dance from '../../public/dab-dance.gif'
import Footer from './Footer'

export default function Home() { 
    return (
        <div className='home-container'>
            <h1 className='bungee-spice-regular'>Welcome to the PokeFight Arena!</h1>
            <img src={Dance} alt="Dab Dance" className="dab-dance" />
            <a href={'/pokemon'} className="nobla-mainbutton"><p>Look at <br /> all the <br /> pokemons</p></a>
            <a href={'/fight'} className="nobla-mainbutton"><p>Let's fight!</p></a>
            <Footer />
        </div>
    )
}