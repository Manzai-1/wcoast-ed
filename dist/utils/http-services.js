export const postData = async (endPoint, data) => {
    try {
        const response = await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`${response.status} - ${endPoint}`);
        }
    }
    catch (error) {
        throw new Error(error);
    }
};
export const getData = async (endPoint) => {
    try {
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            return await response.json();
        }
        else {
            throw new Error(`${response.status} - ${endPoint}`);
        }
    }
    catch (error) {
        throw new Error(error);
    }
};
export const updateData = async (endPoint, data) => {
    try {
        const response = await fetch(endPoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`${response.status} - ${endPoint}`);
        }
    }
    catch (error) {
        throw new Error(error);
    }
};
