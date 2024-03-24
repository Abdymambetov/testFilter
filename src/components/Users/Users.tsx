import React, { useEffect, useState } from "react";
import { IUser } from '../../types/IUser';
import { usersSelect } from '../../redux/slices/UsersSlice';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Card from "../Card/Card";
import styles from './Users.module.scss';
import { getUsers } from '../../redux/actions/UsersAction';

const Users = () => {
    const {users, loading} = useAppSelector(usersSelect);
    const dispatch = useAppDispatch();
    const [filters, setFilters] = useState<(string | null)[]>([]);
    const [activeFilter, setActiveFilter] = useState<IUser[]>([]);
    const [sortType, setSortType] = useState<"asc" | "desc" | null>(null);

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    useEffect(() => {
        try{
            const filtersExist = JSON.parse(localStorage.getItem('filters') || '')
            if(filtersExist) {
                const regExp = /\.([a-zA-Z]+)$/;
                const arr = users.map((i: IUser) => {
                    const match = i.email.match(regExp);
                    return match ? match[1] : null;
                });
                const set = new Set(arr);
                const result = [...set];
                localStorage.setItem('filters', 'true');
                setFilters(result);
            }
        }catch(e){
            console.error("Error parsing filters from localStorage:", e);
        }
    }, [users])

    const handleUpdate = () => {
        dispatch(getUsers());
        setActiveFilter([]);
    };
    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const res = users.filter((i: IUser) => i.email.endsWith(e.target.value))
        setActiveFilter(res)
    };
    const handleSort = () => {
        setSortType((prevSortType) => (prevSortType === "asc"?"desc":"asc"));
    };
    const sortedUsers = () => {
        if(sortType === "asc"){
            return [...users].sort((a: IUser, b: IUser) => a.name.localeCompare(b.name))
        }else if(sortType === "desc"){
            return [...users].sort((a:IUser, b: IUser) => b.name.localeCompare(a.name))
        }else{
            return users
        }
    }
    if(loading) return (
        <div className={styles.loading}>
            Загрузка пользователей...
        </div>
    )
    return (
        <div className={styles.main}>
            <div className={styles.head}>
                <div>
                    <button className={styles.updateUsers} onClick={handleSort}>
                        Сортировать по имени {sortType === "asc" ? "Z-A" : "A-Z"}
                    </button>
                </div>
                <div>
                    <select name="filter" id="filter" onChange={handleFilter}>
                        <option value="">Выберите фильтр</option>
                        {filters.map(i => (
                            <option value={i ? i : ''}>{`@.${i}`}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleUpdate} className={styles.updateUsers}>
                    Обновить список 
                </button>
            </div>
            <div className={styles.users}>
                {
                    activeFilter.length
                    ?
                    activeFilter.map((i: IUser) => 
                        <Card user={i}/>
                    )
                    :
                    sortedUsers()?.map((i: IUser) => 
                        <Card user={i}/>
                    )
                }
            </div>
        </div>
    )
}

export default Users