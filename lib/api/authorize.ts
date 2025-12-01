export const API_BASE_URL = "https://autobizz-425913.uc.r.appspot.com"

export async function getAuthToken(): Promise<string> {
    try {
        const response = await fetch(`${API_BASE_URL}/getAuthorize`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "issa@autobizz.net",
                name: "Issa",
            }),
        })

        if (!response.ok) {
            throw new Error("Failed to get auth token")
        }

        const data = await response.json()
        return data.token
    } catch (error) {
        console.error("Auth Error:", error)
        throw error
    }
}
