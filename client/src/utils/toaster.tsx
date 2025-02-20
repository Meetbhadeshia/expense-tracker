import toast from 'react-hot-toast';

export const notify = (type: "success" | "error", message: string) => {
    if (type === "success") {
        toast.success(message);
    } else {
        toast.error(message);
    }
};