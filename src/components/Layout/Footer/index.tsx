import Button from '../../Button';
import SocialMedia from '../../SocialMedia';
import './footer.css';

import quotes from "../../../utils/data/quotes.json";
import Translate from '../../Translate';

export default function Footer() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    const [quote, author] = randomQuote.split("-")

    function setRandomTheme() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        document.documentElement.style.setProperty('--primary-color-01', `#${randomColor}`);
    }

    return (
        <footer className={"footer"}>
            <div className={"wrapper"}>
                <div className='row1'>
                    <a href="/#">
                        <h6 className='title'>{` <>edu.</> `}</h6>
                    </a>
                    <div className='contact'>
                        <SocialMedia />
                        {/* <Button onClick={setRandomTheme} style={{ padding: `0.75rem 3.5rem` }} title='Surprise?' /> */}
                    </div>
                </div>
                <div className='quote'>
                    <p>©2022 | Eduardo Maciel.</p>
                    <div style={{ width: "50%", height: 1, backgroundColor: "var(--primary-color-01)" }}></div>
                    <p>
                        "<Translate>{quote}</Translate>" <br />
                        - {author}
                    </p>
                </div>
            </div>
        </footer>
    );
}