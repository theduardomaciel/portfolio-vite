import styles from './socialMedia.module.css';

import { ReactComponent as Mail } from '../../assets/icons/mail.svg';
import { ReactComponent as WhatsAppIcon } from '../../assets/icons/enterprises/whatsapp.svg';
import { ReactComponent as InstagramIcon } from '../../assets/icons/enterprises/instagram.svg';
import { ReactComponent as TwitterIcon } from '../../assets/icons/enterprises/twitter.svg';

type Props = {
    excludeInstagram?: boolean;
    excludeTwitter?: boolean;
    excludeEmail?: boolean;
    excludeWhatsApp?: boolean;
}

export default function SocialMedia({ excludeInstagram, excludeTwitter, excludeEmail, excludeWhatsApp }: Props) {
    return (
        <div className={styles.social}>
            {
                !excludeEmail &&
                <a href="mailto:eduardomacielbr@gmail.com">
                    <Mail className={styles.icon} style={{ cursor: "pointer" }} />
                </a>
            }
            {
                !excludeWhatsApp &&
                <a href="https://api.whatsapp.com/send?phone=5582988299223&text=Want%20to%20develop%20a%20awesome%20project?%20Contact%20me%20directly%20so%20we%20can%20talk%20about%20it%20:)">
                    <WhatsAppIcon className={styles.icon} style={{ cursor: "pointer" }} />
                </a>
            }
            {
                !excludeInstagram &&
                <a href="https://instagram.com/theduardomaciel">
                    <InstagramIcon className={styles.iconOutlined} style={{ cursor: "pointer" }} />
                </a>
            }
            {
                !excludeTwitter &&
                <a href="https://twitter.com/theduardomaciel">
                    <TwitterIcon className={styles.twitter} style={{ cursor: "pointer" }} />
                </a>
            }
        </div>
    );
}