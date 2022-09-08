export default {
    props: ["knjigaZaIzmenu", "izdavackeKuce", "autori", "flagDodavanje", "flagIzmena"],
    emits:["kreiranjeKnjige", "izmenaKnjige"],
    data(){
        return {
            novaKnjiga: {},
        }
    },
    methods: {
        dodavanje(){
            this.$emit("kreiranjeKnjige", {... this.novaKnjiga});

        },
        izmena(knjigaZaIzmenu){
            this.$emit("izmenaKnjige", {... knjigaZaIzmenu})
        }
    },
    template: `
    <form v-on:submit.prevent="dodavanje" v-if="flagDodavanje">
    <div>
        <label>Naslov: <input type="text" v-model="novaKnjiga.naslov"></label>
    </div>
    <div>
        <label>Zanr: <input type="text" v-model="novaKnjiga.zanr"></label>
    </div>
    <div>
        <label>Godina: <input type="text" v-model="novaKnjiga.godinaIzdanja"></label>
    </div>
    <div>
    <label>Izdavacka kuca: 
    <select v-model="novaKnjiga.izdavacka_kuca_id">
        <option v-for="i in izdavackeKuce" :value="i.id">{{i.naziv}}</option>
    </select>
    </label>
    </div>
    <div>
    <label> Autor: 
    <select v-model="novaKnjiga.autor_id">
        <option v-for="a in autori" :value="a.id">{{a.ime}}</option>
    </select>
    </label></div>
    <div>
    <button type="button" @click="dodavanje()">Dodaj</button>
    </div>
</form>
<form  v-if="flagIzmena">
    <div>
        <label>Naslov: <input type="text" v-model="knjigaZaIzmenu.naslov"></label>
    </div>
    <div>
        <label>Zanr: <input type="text" v-model="knjigaZaIzmenu.zanr"></label>
    </div>
    <div>
        <label>Godina: <input type="text" v-model="knjigaZaIzmenu.godina_izdanja"></label>
    </div>
    <div>
    <label>Izdavacka kuca: 
    <select v-model="knjigaZaIzmenu.izdavacka_kuca_id">
        <option v-for="i in izdavackeKuce" :value="i.id">{{i.naziv}}</option>
    </select>
    </label>
    </div>
    <div>
    <label> Autor: 
    <select v-model="knjigaZaIzmenu.autor_id">
        <option v-for="a in autori" :value="a.id">{{a.ime}}</option>
    </select>
    </label></div>
    <div>
        <button  type="button" @click="izmena(knjigaZaIzmenu)">Izmeni</button>
    </div>
</form>
`
}