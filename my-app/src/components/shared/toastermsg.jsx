import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successMsg = (message) => {
  toast.success(message, {
    position: "top-right",
  });
};

export const errorMsg = (message) => {
  toast.error(message, {
    position: "top-right",
  });
};
