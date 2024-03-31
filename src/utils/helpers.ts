export const getImageUrl = (image: File | string) => {
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
