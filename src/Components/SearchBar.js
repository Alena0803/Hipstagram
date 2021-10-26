import { useState } from "react"
import { useHistory} from "react-router";
import { Link } from "react-router-dom"
import search from '../images/search_icon.svg'

const Search = ({}) => {
    const [searchName,setsearchName] = useState('')
    let history = useHistory()
    const onClick = () =>history.push(`/search/ ${searchName}`)
    return (
        <div class="poisk">
            <form>
                <input type="text" value={searchName} onChange={e => setsearchName(e.target.value)}  onKeyDown={e => e.keyCode === 13 && onClick()} placeholder="Search" />
                <Link to={`/search/${searchName}`} className='search'><img src={search} /></Link>
            </form>
        </div>
    )
}

export default Search