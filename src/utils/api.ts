interface RegisterResponse {
    success: boolean;
    message: string;
    user?: { id: number; username: string; email: string };
}

const registerUser = async (username: string, email: string, password: string): Promise<RegisterResponse> => {
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as RegisterResponse;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { success: false, message: 'Network error' };
    }
};