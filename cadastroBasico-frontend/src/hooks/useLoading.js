import { useContext } from "react";

import LoadingContext from "../contexts/loadingContext";

const useLoading = () => {
    const loading = useContext(LoadingContext);

    return loading;
};

export default useLoading;
