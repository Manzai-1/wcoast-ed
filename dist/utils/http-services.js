export const postData = async (endPoint, data) => {
    try {
        const response = await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
    catch (error) {
        throw new Error(error);
    }
};
export const getData = async (endPoint) => {
    try {
        return await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    catch (error) {
        throw new Error(error);
    }
};
export const updateData = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
    catch (error) {
        throw new Error(error);
    }
};
