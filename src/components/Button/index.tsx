import React from 'react';
import Translate from '../Translate';

import styles from './button.module.css';

type Props = {
    title?: string;
    Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    iconSize?: number | string;
    style?: React.CSSProperties;
    onClick?: () => void;
    disableHover?: boolean;
}

export default function Button({ title, Icon, iconSize, style, disableHover, onClick }: Props) {
    return (
        <button onClick={onClick} className={`${styles.button} ${!disableHover && styles.hover}`} type='button' style={style} >
            {
                Icon &&
                <Icon className={styles.icon} width={iconSize && iconSize} height={iconSize && iconSize} />
            }
            <Translate>{title}</Translate>
        </button>
    );
}