async function login(webhook) {
    try {
        const response = await fetch(webhook);

        if (response.ok) {
            return true
        } else {
            return false
        };

    } catch (error) {
        return false
    };
}; 