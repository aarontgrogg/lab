import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSearch, faCar, faStar, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    const backButton = () => {
        window.history.back();
        return false;
     }
    return (
        <footer id="app-bottom-nav">
            <ul>
                <li className="ap-back">
                    <a href="#" onClick={backButton}> <FontAwesomeIcon icon={faChevronLeft} /> <span>Back</span> </a>
                </li>
                <li className="ap-search ap-active">
                    <a href="/app-find-it-guide-cars"> <FontAwesomeIcon icon={faSearch} /> <span>Search</span> </a>
                </li>
                <li className="ap-sell">
                    <a href="/app-find-it-guide-cars-sell"> <FontAwesomeIcon icon={faCar} /> <span>Sell</span> </a>
                </li>
                <li className="ap-saved">
                    <a href="/app-find-it-guide-cars-saved"> <FontAwesomeIcon icon={faStar} /> <span>Saved</span> </a>
                </li>
                <li className="ap-settings">
                    <a href="/app-find-it-guide-cars-settings"> <FontAwesomeIcon icon={faEllipsisH} /> <span>More</span> </a>
                </li>
            </ul>
        </footer>
    )
}