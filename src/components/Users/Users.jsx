import React from 'react';
import style from "./Users.module.css";
import userPhoto from "../../assets/images/user.webp";
import { Link } from 'react-router-dom';
import {followAPI, unfollowAPI} from "../../api/api";
import {toggleFollowingProgress} from "../../redux/usersReducer";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {
                pages.map(p => (
                    <span
                        className={props.currentPage === p ? style.selectedPage + ' ' + style.page : style.page}
                        onClick={() => {
                            props.onPageChanged(p);
                        }}
                    >{p}</span>
                ))
            }
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <Link to={'/profile/' + u.id}>
                                <img className={style.userPhoto} src={u.photos.small ? u.photos.small : userPhoto} alt="avatar"/>
                            </Link>
                        </div>
                        <div>
                            { u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {

                                    props.toggleFollowingProgress(true, u.id);
                                    unfollowAPI
                                        .unfollow(u.id)
                                        .then(data => {
                                            if (data.resultCode === 0) {
                                                props.unfollowUser(u.id);
                                            }
                                            props.toggleFollowingProgress(false, u.id);
                                        })

                                }}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {

                                    debugger;
                                    props.toggleFollowingProgress(true, u.id);
                                    followAPI
                                        .follow(u.id)
                                        .then(data => {
                                            if (data.resultCode === 0) {
                                                props.followUser(u.id);
                                            }
                                            props.toggleFollowingProgress(false, u.id);
                                        })

                                }}>Follow</button> }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    );
};

export default Users;