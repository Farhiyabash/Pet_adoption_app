// Pet service to fetch pet data
export const getPets = async () => {
    // Call your pet API here
    const response = await fetch('/api/pets');

    if (!response.ok) {
        throw new Error('Failed to fetch pets');
    }

    return await response.json();
};
