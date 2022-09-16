import { useRef, useState } from 'react';

import './contact.css';

import Modal from '../../components/Modal';
import SocialMedia from '../../components/SocialMedia';

// Components
import StarField from '../../components/Starfield';
import Translate, { TranslateText } from '../../components/Translate';

// Functions
import postEmail from '../../utils/functions/sendEmailToDiscord';

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default function Contact({ ...props }) {
    const [email, setEmail] = useState<string>("");
    const [isModalOpen, setModalOpen] = useState(false)

    const isLoading = useRef(false);

    const [errorMessage, setErrorMessage] = useState("")

    async function sendEmail() {
        isLoading.current = true

        const userEmail = email; // Salvamos o e-mail e apagamos o state para que o botão fique indisponível
        setEmail("")

        const isEmailValid = validateEmail(userEmail)

        if (!isEmailValid) {
            setErrorMessage("invalidEmail")
            setTimeout(() => {
                setErrorMessage("")
            }, 500);
        } else {
            const response = await postEmail(userEmail)
            if (!response) {
                setErrorMessage("internalError")
            } else {
                setErrorMessage("")
            }
            setModalOpen(true)
        }

        isLoading.current = false
    }

    return <section className='section' id='contact'>
        <div className='blob1Holder'>
            <div
                className='blob1Holder'
                style={{ WebkitClipPath: `url(#contactBlob1)`, clipPath: `url(#contactBlob1)`, backgroundColor: "var(--primary-color-01)", height: 347 }}
            >
                <StarField style={{ position: "absolute", left: 0 }} width={document.documentElement.clientWidth < 675 ? document.documentElement.clientWidth : 675} /* width={document.documentElement.clientWidth} */ />
                <div className='infoHolder'>
                    <p><Translate>WANT TO HAVE AN AWESOME PROJECT DONE?</Translate></p>
                </div>
            </div>
            <div className='infoHolder info2'>
                <p><Translate>WANT TO HAVE AN AWESOME PROJECT DONE?</Translate></p>
                <div className='inputHolder'>
                    <input
                        placeholder={errorMessage === "invalidEmail" ? TranslateText("The e-mail inserted is invalid.") : TranslateText("Enter your e-mail here")}
                        className='input'
                        style={{ borderColor: errorMessage === "invalidEmail" ? "red" : "var(--secondary-color-01)" }}
                        type="email"
                        id="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <button
                        onClick={() => {
                            if (!isModalOpen && !isLoading.current) {
                                sendEmail()
                            }
                        }}
                        style={{ display: email.length > 0 ? "inline-block" : "none" }}
                        className='submit'>
                        <Translate>Contact</Translate>
                    </button>
                </div>
            </div>
        </div>
        <div style={{ width: "100%", overflow: "hidden", position: "absolute" }}>
            <svg style={{ zIndex: -1, position: "absolute" }} width="375" height="347" viewBox="0 0 375 347" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <clipPath id="contactBlob1">
                        <path d="M104.499 6.20032C146.257 9.99486 173.077 13.8153 212.831 26.6993C244.563 36.9839 285.467 41.4622 321.427 47.4562C339.763 50.5124 359.346 51.4527 377.914 52.0975C400.668 52.8876 425.354 49.0279 447.792 53.2578C500.273 63.1507 553.407 83.7439 595.77 115.399C650.766 156.494 691.147 276.348 695.616 345H-198.75C-171.431 280.637 -169.749 179.506 -138.551 116.431C-126.78 92.6329 -108.353 72.8497 -87.7666 55.8363C-64.2469 36.3982 -32.3153 14.9987 -1.97636 7.36064C31.0317 -0.949368 71.0894 3.16441 104.499 6.20032Z" fill="white" stroke="white" stroke-width="3" stroke-linecap="round" />
                    </clipPath>

                    <mask id="contactBlob1">
                        <path d="M104.499 6.20032C146.257 9.99486 173.077 13.8153 212.831 26.6993C244.563 36.9839 285.467 41.4622 321.427 47.4562C339.763 50.5124 359.346 51.4527 377.914 52.0975C400.668 52.8876 425.354 49.0279 447.792 53.2578C500.273 63.1507 553.407 83.7439 595.77 115.399C650.766 156.494 691.147 276.348 695.616 345H-198.75C-171.431 280.637 -169.749 179.506 -138.551 116.431C-126.78 92.6329 -108.353 72.8497 -87.7666 55.8363C-64.2469 36.3982 -32.3153 14.9987 -1.97636 7.36064C31.0317 -0.949368 71.0894 3.16441 104.499 6.20032Z" fill="white" stroke="white" stroke-width="3" stroke-linecap="round" />
                    </mask>
                </defs>
            </svg>
        </div>
        <Modal
            title={errorMessage ? TranslateText(`Oops! Looks like something went wrong... ❌`) : TranslateText('Yay! Everything went right! ✅')}
            content={
                errorMessage === "internalError" ?
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <strong style={{ textAlign: "center", marginBlock: "2rem", fontSize: "2.2rem" }}>
                            <Translate>{`Something wrong happened and I couldn't send your e-mail :(`}</Translate>
                        </strong>
                        <p>
                            <Translate>Try again and if the problem persists, then it really is my fault, so please send me a message via one of the following social networks:</Translate>
                            <br />
                        </p>
                        <SocialMedia excludeWhatsApp excludeEmail />
                        <h5>
                            <Translate>Thank you in advance for your support and I apologize for the problem 😊</Translate>
                            <br /> <br />
                        </h5>
                    </div>
                    :
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <strong style={{ textAlign: "center" }}></strong>
                        <h4 style={{ textAlign: "center" }}>
                            <Translate>But for now...</Translate>
                        </h4>
                        <p>
                            <Translate>{`Check out my social media to find out a little more about who I am (it will be hard to find a picture of me, sorry!)`}</Translate>
                            <br />
                            <Translate>By the way, in case you are anxious and don't want to wait for my answer</Translate>
                            <span style={{ fontSize: "1rem" }}>
                                <Translate>{`(or need an urgent answer!)`}</Translate>
                            </span><Translate>, you can send me a direct message through one of these networks below:</Translate></p>
                        <SocialMedia />
                        <h5>
                            <Translate>In advance, thank you very much for your choice and attention! ❤️</Translate>
                            <br /> <br />
                        </h5>
                    </div>
            }
            footerContent={<h5 style={{ alignSelf: "flex-start", marginBlock: "0.5rem" }}><Translate>{`- Sincerely, Edu :)`}</Translate></h5>}
            modalOpen={isModalOpen}
            setModalOpen={setModalOpen}
        />
    </section>
}