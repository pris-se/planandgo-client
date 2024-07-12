import placeholderImage from "../assets/img/placeholder.png";


export const getImageUrl = (image: any) => {
    if (!image) return placeholderImage
    return image instanceof File ? URL.createObjectURL(image as Blob) : process.env.REACT_APP_BASE_IMAGE_URL + image;
}

export const objectToFormData = (obj: Record<string, any>): FormData => {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
        if (value instanceof FileList) {
            for (let i = 0; i < value.length; i++) {
                formData.append(key, value[i]);
            }
        } else {
            formData.append(key, value.toString());
        }
    });
    return formData;
}

export const toggle = <T>(state: T, value: T): T | null => {
    return !state ? value : null;
};

export const uuidv4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
