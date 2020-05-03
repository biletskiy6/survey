export const state = () => ({
    token: null
});

export const mutations = {
    setToken(state, token) {
        state.token = token;
    }
}


export const actions = {
    async login({commit}, formData) {
        try {
            const token = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("mock-token");
                }, 1000)
            });

            commit("setToken", token);


        } catch (e) {
            commit("error/setError", e, {root: true});
            throw e;
        }

        // console.log(" login ", formData)
    }
}

export const getters = {
    isAuthenticated: state => Boolean(state.token)
}
