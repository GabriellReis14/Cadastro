import axios from "./axios";

export async function axiosGet(url, params) {
    try {
        const response = await axios.get(url, { params });

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        }

        return { status: 500 };
    }
}

export async function axiosPost(url, body) {
    try {
        const response = await axios.post(url, body);

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        }

        return { status: 500 };
    }
}

export async function axiosPut(url, body) {
    try {
        const response = await axios.put(url, body);

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        }

        return { status: 500 };
    }
}

export async function axiosPatch(url, body) {
    try {
        const response = await axios.patch(url, body);

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        }

        return { status: 500 };
    }
}

export async function axiosDelete(url) {
    try {
        const response = await axios.delete(url);

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        }

        return { status: 500 };
    }
}
