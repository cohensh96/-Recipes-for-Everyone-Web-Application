import {FaUser} from 'react-icons/fa'
import logo from '../Logo.png'
const Header = () => {
  return (
    <header className='border-b-2 border-solid border-zinc-900'>
        <nav className='p-5 flex items-center'>
            <FaUser role="button" tabIndex="0"/>
            <ul className='flex flex-1 flex-row justify-evenly items-center'>
                <li>Recipes</li>
                <li>About</li>
                <img src={logo} alt="logo" width={100} height={100}/>
                <li>Popular</li>
                <li>Start Here</li>
            </ul>
        </nav>
    </header>
  )
}

export default Header