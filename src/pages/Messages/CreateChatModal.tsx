import { FormEvent, useEffect, useState } from 'react';
import { Modal } from '../../components/modals/Modal';
import { Button } from '../../components/ui/Button';
import { SelectBox } from '../../components/ui/SelectBox';
import { Input } from '../../components/ui/Input';
import { createChatFetch } from '../../redux/features/chats';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { ReactComponent as SearchIcon } from "../..//assets/img/search.svg";
import { User } from '../../interfaces';
import { getImageUrl } from '../../utils/helpers';
import { getUsers } from '../../redux/features/users';

import placeholderImage from "../../assets/img/placeholder.png";
import { toast } from 'react-toastify';
import { Loader } from '../../components/Loader';

interface IProps {
    show: boolean;
    onClose: () => void
}

export const CreateChatModal = ({ show, onClose }: IProps) => {

    const dispatch = useAppDispatch();
    const [search, setSearch] = useState("")
    const { users, isLoading } = useAppSelector(state => state.users)
    const [formData, setFormData] = useState({
        participantId: "",
        title: "",
        type: "single"
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.participantId) {
            toast.error("Select participant")
        };
        dispatch(createChatFetch(formData))
        onClose && onClose()
    }

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSearch = () => {
        dispatch(getUsers(`username=${search}`))
    }
    
    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <Modal
            show={show}
            title={"Create new chat"}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit}>
                <div className="popup-body">
                    <div className="row row--md">
                        <div className="col-12">
                            <Input title='Title' handler={(value) => handleChange("title", value)} />
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <div className="search-form">
                                    <Input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        name='input'
                                        title={"Search participant"}
                                        type="text"
                                    >
                                        <Button onClick={handleSearch} classes="btn btn--lg input-icon input-icon--right">
                                            <span className='ico'>
                                                <SearchIcon />
                                            </span>
                                        </Button>
                                    </Input>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className='col-group gap--xs overflow-auto max-h-96'>
                                {
                                    users?.length && !isLoading ?
                                        users.map(user => (
                                            <div
                                                key={user._id}
                                                className={`row-group gap--sm ${user._id === formData.participantId ? "bg-primary" : ""} hover:bg-primary transition py-2 px-4 cursor-pointer`}
                                                onClick={() => handleChange("participantId", user._id ?? "")}
                                            >
                                                <div className="image-wrapper size-14 rounded-full">
                                                    <img src={user.avatar ? getImageUrl(user.avatar) : placeholderImage} alt={user.username} />
                                                </div>
                                                <div className='col-group gap--xs'>
                                                    <p>{user.username}</p>
                                                    <p>{user.email}</p>
                                                </div>
                                            </div>
                                        ))
                                        : isLoading ?
                                            <Loader />
                                            : null
                                }
                            </div>
                        </div>
                        {/* <div className="col-6">
                            <SelectBox
                                selectValue={"single"}
                                options={["single", "multiple"].map((option) => ({ value: option, label: option.charAt(0).toUpperCase() + option.slice(1) }))}
                                onSelect={(value) => console.log(value)}
                                placeholder="Select type"
                            />
                        </div> */}
                    </div>
                </div>
                <div className="popup-footer">
                    <Button className='btn rounded btn--lg w-full btn--outline-primary' onClick={onClose}>Cancel</Button>
                    <Button type="submit" >Create</Button>
                </div>
            </form>
        </Modal>
    )
}
