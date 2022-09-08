export default {
    emits:["sendLoginData"],
    data (){
        return{
        logovaniKorisnik: {}
        }
    },
    methods:{
        login(){
            this.$emit("sendLoginData", {...this.logovaniKorisnik})
        }

    },
    template: `
    <form>
        <label> Korisnicko ime:
            <input id="userName" type="text" v-model=logovaniKorisnik.userName>
        </label>
        <label> Lozinka:
            <input id="password" type="password" v-model=logovaniKorisnik.password>
        </label>
        <button type="button" @click="login()">Login</button>
    </form>`
}