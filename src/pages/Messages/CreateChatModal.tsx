import { FormEvent, useState } from 'react';
import { Modal } from '../../components/modals/Modal';
import { Button } from '../../components/ui/Button';
import { CustomSelect } from '../../components/ui/CustomSelect';
import { Input } from '../../components/ui/Input';
import { createChatFetch } from '../../redux/features/chats';
import { useAppDispatch } from '../../redux/hooks';

interface IProps {
    show: boolean;
    onClose: () => void
}

export const CreateChatModal = ({ show, onClose }: IProps) => {

    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        participantId: "",
        title: "",
        type: "single"
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.participantId || !formData.title) return;
        dispatch(createChatFetch(formData))
    }

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <Modal
            show={show}
            title={"Create new chat"}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit}>
                <div className="popup-body">
                    <p className="mb-3">Search</p>
                    <div className="row row--md">
                        <div className="col-12">
                            <Input title='Search' />
                        </div>
                        <div className="col-6">
                            <CustomSelect
                                selectValue={"single"}
                                options={["single", "multiple"].map((option) => ({ value: option, label: option.charAt(0).toUpperCase() + option.slice(1) }))}
                                onSelect={(value) => console.log(value)}
                                placeholder="Select type"
                            />
                        </div>
                        <div className="col-6">
                            <Input title='Search' />
                        </div>
                    </div>
                </div>
                <div className="popup-footer">
                    <Button type="submit">Create</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </div>
            </form>
        </Modal>
    )
}
