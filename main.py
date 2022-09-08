from asyncio.windows_events import NULL
import flask
from flask import Flask
from flaskext.mysql import MySQL
from flask import request
import pymysql

app = Flask(__name__, static_url_path="/", static_folder="static")
mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "admin"
app.config["MYSQL_DATABASE_DB"] = "bibliotekaProjekat"


@app.route("/")
def home():
    return app.send_static_file("home.html")


@app.route("/api/sveKnjige")
def dobavi_sve_knjige():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT *, autor.ime FROM knjiga INNER JOIN autor ON knjiga.autor_id=autor.id")
    knjige = cursor.fetchall()
    return flask.jsonify(knjige)


@app.route("/api/dodajNovuKnjigu", methods=["POST"])
def dodaj_knjigu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO knjiga (naslov, zanr, godina_izdanja, izdavacka_kuca_id, autor_id)  VALUES (%(naslov)s, %(zanr)s, %(godinaIzdanja)s, %(izdavacka_kuca_id)s, %(autor_id)s) ", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json)


@app.route("/api/obrisiKnjigu/<int:id>", methods=["DELETE"])
def obrisi_knjigu(id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM knjiga WHERE id=%s", id)
    db.commit()
    return flask.jsonify(None)

    
@app.route("/api/izmeniKnjigu/<int:id>", methods=["PUT"])
def izmeni_knjigu(id):
    db = mysql.get_db()
    cursor = db.cursor()

    data = dict(flask.request.json)
    cursor.execute(
        "UPDATE knjiga SET naslov = %(naslov)s, zanr = %(zanr)s, godina_izdanja = %(godina_izdanja)s, izdavacka_kuca_id = %(izdavacka_kuca_id)s, autor_id = %(autor_id)s WHERE id = %(id)s", data)
    db.commit()
    return flask.jsonify(flask.request.json)


@app.route("/api/sviAutori")
def dobavi_sve_autore():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM autor")
    autori = cursor.fetchall()
    return flask.jsonify(autori)

@app.route("/api/sveIzdavackeKuce")
def dobavi_sve_izdavacke_kuce():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM izdavacka_kuca")
    izdavacke_kuce = cursor.fetchall()
    return flask.jsonify(izdavacke_kuce)


@app.route("/api/obrisiKucu/<int:id>", methods=["DELETE"])
def obrisi_kucu(id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM izdavacka_kuca WHERE id=%s", id)
    db.commit()
    return flask.jsonify(None)

    
@app.route("/api/dodajNovuIzdavackuKucu", methods=["POST"])
def dodaj_novu_kucu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO izdavacka_kuca (naziv)  VALUES (%(naziv)s) ", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json)


@app.route("/api/izmeniKucu/<int:id>", methods=["PUT"])
def izmeni_kucu(id):
    db = mysql.get_db()
    cursor = db.cursor()

    data = dict(flask.request.json)
    cursor.execute(
        "UPDATE izdavacka_kuca SET naziv = %(naziv)s WHERE id = %(id)s", data)
    db.commit()
    return flask.jsonify(flask.request.json)


@app.route("/api/dodajNovogAutora", methods=["POST"])
def dodaj_autora():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO autor (ime, prezime, datum_rodjenja)  VALUES (%(ime)s, %(prezime)s, %(datum_rodjenja)s) ", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json)
    

    
@app.route("/api/obrisiAutora/<int:id>", methods=["DELETE"])
def obrisi_autora(id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM autor WHERE id=%s", id)
    db.commit()
    return flask.jsonify(None)


@app.route("/api/izmeniAutora/<int:id>", methods=["PUT"])
def izmeni_autora(id):
    db = mysql.get_db()
    cursor = db.cursor()

    data = dict(flask.request.json)
    cursor.execute(
        "UPDATE autor SET ime = %(ime)s, prezime = %(prezime)s, datum_rodjenja = %(datum_rodjenja)s WHERE id = %(id)s", data)
    db.commit()
    return flask.jsonify(flask.request.json)


@app.route("/api/sviKorisnici")
def dobavi_sve_korisnike():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT *, tip_korisnika.uloga FROM korisnik INNER JOIN tip_korisnika ON korisnik.tip_korisnika_id = tip_korisnika.id")
    korisnici = cursor.fetchall()
    return flask.jsonify(korisnici)

@app.route("/api/dodajNovogKorisnika", methods=["POST"])
def dodaj_korisnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO korisnik (user_name, password, tip_korisnika_id)  VALUES (%(user_name)s, %(password)s, %(tip_korisnika_id)s) ", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json)



@app.route("/api/obrisiKorisnika/<int:id>", methods=["DELETE"])
def obrisi_korisnika(id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnik WHERE id=%s", id)
    db.commit()
    return flask.jsonify(None)

@app.route("/api/izmeniKorisnika/<int:id>", methods=["PUT"])
def izmeni_korisnika(id):
    db = mysql.get_db()
    cursor = db.cursor()
    data = dict(flask.request.json)
    cursor.execute(
        "UPDATE korisnik SET user_name = %(user_name)s, password = %(password)s, tip_korisnika_id = %(tip_korisnika_id)s WHERE id = %(id)s", data)
    db.commit()
    return flask.jsonify(flask.request.json)
    
@app.route("/api/tipoviKorisnika")
def dobavi_sve_tipove():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM tip_korisnika")
    tipovi = cursor.fetchall()
    return flask.jsonify(tipovi)



@app.route("/api/sveIznajmljeneKnjige")
def dobavi_sve_iznajmlejne_knjige():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT *, knjiga.naslov, korisnik.user_name FROM iznajmljivanje INNER JOIN korisnik ON iznajmljivanje.korisnik_id= korisnik.id INNER JOIN knjiga ON iznajmljivanje.knjiga_id= knjiga.id")
    iznajmljivanja = cursor.fetchall()
    return flask.jsonify(iznajmljivanja)


    
@app.route("/api/obrisiIznajmljivanje/<int:id>", methods=["DELETE"])
def obrisi_iznajmljivanje(id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM iznajmljivanje WHERE id=%s", id)
    db.commit()
    return flask.jsonify(None)


@app.route("/api/dodajNovoIznajmljivanje", methods=["POST"])
def dodaj_iznajmljivanje():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO iznajmljivanje (datum_iznajmljivanja, rok_za_vracanje, knjiga_id, korisnik_id)  VALUES (%(datum_iznajmljivanja)s, %(rok_za_vracanje)s, %(knjiga_id)s, %(korisnik_id)s) ", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json)

@app.route("/api/zatvoriIznajmljivanje/<int:id>", methods=["PUT"])
def zatvori_iznajmljivanje(id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE iznajmljivanje SET vraceno = CURDATE() WHERE id=%s", id)
    db.commit()
    return flask.jsonify(flask.request.json)


@app.route("/api/login", methods=["POST"])
def proveri_parametre():
    db = mysql.get_db()
    cursor = db.cursor()
    data = request.get_json()
    cursor.execute("SELECT * FROM korisnik WHERE user_name LIKE '" + data["userName"] + "' AND password LIKE '"+data["password"] +"'")
    korisnici = cursor.fetchall()
    if len(korisnici) > 0:
        korisnik = korisnici[0]
        return flask.jsonify(
            {
                "user_name": korisnik["user_name"],
                "tip_korisnika_id": korisnik["tip_korisnika_id"]
            }
        )
    else:
        return flask.jsonify(False)
