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
