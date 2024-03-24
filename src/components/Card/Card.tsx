import { FC } from 'react';
import { ICard } from '../../types/ICard';
import styles from './Card.module.scss';
import userPhoto from '../../assets/nophoto.webp';

const Card: FC<ICard> = ({user}) => {
    return (
        <div className={styles.main}>
            <div className={styles.userImage}>
                <img alt='userimg' src={userPhoto}/>
            </div>
            <div className={styles.userInfo}>
                <p>{user?.name}</p>
                <p>{user?.email}</p>
                <p>{user?.phone}</p>
            </div>
        </div>
    )
}

export default Card