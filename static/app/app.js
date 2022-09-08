import tabelaKnjiga from "./components/tabelaKnjiga.js"
import tabelaAutor from "./components/tabelaAutor.js"
import tabelaIzdavackaKuca from "./components/tabelaIzdavackaKuca.js"
import tabelaKorisnik from "./components/tabelaKorisnik.js"
import tabelaIznajmljivanje from "./components/tabelaIznajmljivanje.js"
import formaKnjiga from "./components/formaKnjiga.js"
import formaIzdavackaKuca from "./components/formaIzdavackaKuca.js"
import formaAutor from "./components/formaAutor.js"
import formaIznajmljivanje from "./components/formaIznajmljivanje.js"
import formaKorisnik from "./components/formaKorisnik.js"
import login from "./components/login.js"


const app = Vue.createApp({
    data(){
        return{
        knjige: {},
        knjiga: {},
        autori: {},
        autor: {},
        izdavackeKuce: {},
        izdavackaKuca: {},
        korisnici: {},
        korisnik: {},
        tipKorisnika: {},
        iznajmljeneKnjige: {},
        stranicaZaPrikaz: {},
        prikaziFormuZaLogovanje: true,
        uspesanLogin: false,
        logovaniKorisnik: {},
        flagDodavanjeKnjige: false,
        flagIzmenaKnjige: false,
        flagDodavanjeAutora:false,
        flagIzmenaAutora:false,
        flagDodavanjeIzdavackeKuce:false,
        flagIzmenaIzdavackeKuce:false,
        flagDodavanjeKorisnika:false,
        flagIzmenaKorisnika:false,
        flagDodavanjeIznajmljivanja: false,

    }},
    created(){
        axios.get("/api/sveKnjige").then(response => {
            this.knjige = (response.data)
        }),
        axios.get("/api/sviAutori").then(response => {
            this.autori = (response.data)
        }),
        axios.get("/api/sveIzdavackeKuce").then(response => {
            this.izdavackeKuce = (response.data)
        }),
        axios.get("/api/sviKorisnici").then(response => {
            this.korisnici = (response.data)
        }),
        axios.get("/api/tipoviKorisnika").then(response => {
            this.tipKorisnika = (response.data)
        }),
        axios.get("/api/sveIznajmljeneKnjige").then(response => {
            this.iznajmljeneKnjige = (response.data)
        })

    },

    methods: {       
        navigate(page){
            this.stranicaZaPrikaz = page;
        },

        dodajNovuKnjigu(knjiga){
            let knjigaZaUpis = {...knjiga};
            axios.post("/api/dodajNovuKnjigu", knjigaZaUpis).then(response =>{
                axios.get("/api/sveKnjige").then(response => {
                    this.knjige = (response.data)
                })
            })
        },
        ukloniKnjigu(id){
            axios.delete(`/api/obrisiKnjigu/${id}`).then(response =>{
                axios.get("/api/sveKnjige").then(response => {
                    this.knjige = (response.data)
                })
            })
        },
        dobaviKnjigu(k){
            this.flagIzmenaKnjige = true;
            this.flagDodavanjeKnjige = false;
            this.knjiga = {...k};
        },
        izmeniKnjigu(k){
            let knjigaIzmena = {...k}
            axios.put(`/api/izmeniKnjigu/${knjigaIzmena.id}`, knjigaIzmena).then(response =>{
                axios.get("/api/sveKnjige").then(response =>{
                    this.knjige = response.data;
                })
            })
        },

        dodajNovuIzdavackuKucu(izdavackaKuca){
            let kucaZaUpis = {...izdavackaKuca};
            axios.post("/api/dodajNovuIzdavackuKucu", kucaZaUpis).then(response =>{
                axios.get("/api/sveIzdavackeKuce").then(response => {
                    this.izdavackeKuce = (response.data)
                })
            })
        },
          ukloniKucu(id){
            axios.delete(`/api/obrisiKucu/${id}`).then(response =>{
                axios.get("/api/sveIzdavackeKuce").then(response => {
                    this.izdavackeKuce = (response.data)
                })
            })
        },
        dobaviIzdavackuKucu(k){
            this.flagDodavanjeIzdavackeKuce = false;
            this.flagIzmenaIzdavackeKuce = true;
            this.izdavackaKuca = {...k};
        },
        izmeniKucu(k){
            let kucaIzmena = {...k}
            axios.put(`/api/izmeniKucu/${kucaIzmena.id}`, kucaIzmena).then(response =>{
                axios.get("/api/sveIzdavackeKuce").then(response =>{
                    this.izdavackeKuce = response.data;
                })
            })
        },
        dobaviKorisnika(k){
            this.flagIzmenaKorisnika = true;
            this.flagDodavanjeKorisnika = false;
            this.korisnik = {...k};
        },
        dodajNovogKorisnika(korisnik){
            let korisnikZaUpis = {...korisnik};
            axios.post("/api/dodajNovogKorisnika", korisnikZaUpis).then(response =>{
                axios.get("/api/sviKorisnici").then(response => {
                    this.korisnici = (response.data)
                })
            })
        },

        ukloniKorisnika(id){
            axios.delete(`/api/obrisiKorisnika/${id}`).then(response =>{
                axios.get("/api/sviKorisnici").then(response => {
                    this.korisnici = (response.data)
                })
            })
        },
        izmeniKorisnika(k){
            let korisnikIzmena = {...k}
            axios.put(`/api/izmeniKorisnika/${korisnikIzmena.id}`, korisnikIzmena).then(response =>{
                axios.get("/api/sviKorisnici").then(response =>{
                    this.korisnici = response.data;
                })
            })
        },

        dodajAutora(autor){
            let autorZaUpis = {...autor};
            axios.post("/api/dodajNovogAutora", autorZaUpis).then(response =>{
                axios.get("/api/sviAutori").then(response => {
                    this.autori = (response.data)
                })
            })
        },
        ukoniAutora(id){
            axios.delete(`/api/obrisiAutora/${id}`).then(response =>{
                axios.get("/api/sviAutori").then(response => {
                    this.autori = (response.data)
                })
            })
        },

        dobaviAutora(a){
            this.flagIzmenaAutora = true;
            this.flagDodavanjeAutora = false;
            this.autor = {...a};
            let datum_rodjenja_string = new Date(a.datum_rodjenja);
            this.autor.datum_rodjenja = datum_rodjenja_string.toISOString().split('T')[0];
        },

        izmeniAutora(a){
            let autorIzmena = {...a}
            axios.put(`/api/izmeniAutora/${autorIzmena.id}`, autorIzmena).then(response =>{
                axios.get("/api/sviAutori").then(response =>{
                    this.autori = response.data;
                })
            })
        },

        ukloniIznajmljivanje(id){
            axios.delete(`/api/obrisiIznajmljivanje/${id}`).then(response =>{
                axios.get("/api/sveIznajmljeneKnjige").then(response => {
                    this.iznajmljeneKnjige = (response.data)
                })
            })
        },
        dodajNovoIznajmljivanje(iznajmljivanje){
            let iznajmljivanjeZaUpis = {...iznajmljivanje};
            axios.post("/api/dodajNovoIznajmljivanje", iznajmljivanjeZaUpis).then(response =>{
                axios.get("/api/sveIznajmljeneKnjige").then(response => {
                    this.iznajmljeneKnjige = (response.data)
                })
            })
        },
        vratiKnjigu(iznajmljivanje){
            axios.put(`/api/zatvoriIznajmljivanje/${iznajmljivanje.id}`, iznajmljivanje).then(response =>{
                axios.get("/api/sveIznajmljeneKnjige").then(response => {
                    this.iznajmljeneKnjige = (response.data)
                    this.navigate("iznajmljivanje")
                })
        
            })
        },

        login(logovaniKorisnik){
            axios.post("/api/login", logovaniKorisnik).then(response => {
                this.uspesanLogin = (response.data)
                if (this.uspesanLogin) {
                    this.prikaziFormuZaLogovanje = false;
                    this.logovaniKorisnik = (response.data)
                }
                else {
                    alert("Neuspesno logovanje!")
                }
            })
        },

        logout(){
            this.logovaniKorisnik = null;
            this.uspesanLogin = false;
            this.prikaziFormuZaLogovanje = true;
            this.stranicaZaPrikaz = null;
        },

        pokaziFormuDodavanjeKnjige(){
            this.flagDodavanjeKnjige = true;
            this.flagIzmenaKnjige = false;
        },

        pokaziFormuDodavanjeIzdavackeKuce(){
            this.flagDodavanjeIzdavackeKuce = true;
            this.flagIzmenaIzdavackeKuce = false;
        },

        pokaziFormuDodavanjeAutora(){  
            this.flagDodavanjeAutora = true;
            this.flagIzmenaAutora = false;

        },

        pokaziFormuDodavanjeKorisnika(){  
            this.flagDodavanjeKorisnika = true;
            this.flagIzmenaKorisnika = false;

        },

        pokaziFormuDodajIznajmljivanje(){
            this.flagDodavanjeIznajmljivanja = true;
        },

    }
})
app.component("tabela-knjiga", tabelaKnjiga);
app.component("tabela-autor", tabelaAutor);
app.component("tabela-izdavacka-kuca", tabelaIzdavackaKuca);
app.component("tabela-korisnik", tabelaKorisnik);
app.component("tabela-iznajmljivanje", tabelaIznajmljivanje);
app.component("forma-knjiga", formaKnjiga);
app.component("forma-izdavacka-kuca", formaIzdavackaKuca);
app.component("forma-autor", formaAutor);
app.component("forma-iznajmljivanje", formaIznajmljivanje);
app.component("forma-korisnik", formaKorisnik);
app.component("forma-login", login);
app.mount('#app')