# Database oppgave:

## Oppgave 1:

| ElevID | Fornavn | Etternavn  | Klasse | Hobby     | Kjonn |
|--------|---------|------------|--------|-----------|-------|
|      1 | Thomas  | Hansen     |      1 | Fotball   | G     |
|      2 | Linn    | Jensen     |      2 | Gaming    | J     |
|      3 | Lise    | Olsen      |      1 | Strikking | J     |
|      4 | Eva     | Yttergård  |      2 | Gaming    | J     |
|      5 | Martin  | Hjelle     |      2 | Strikking | G     |
|      6 | Bjarne  | Utvik      |      3 | Håndball  | G     |
|      7 | Joakim  | Fredriksen |      1 | Løping    | G     |
|      8 | Jenny   | Gullaug    |      4 | Band      | J     |
|      9 | Bjarte  | Ås         |      2 | Band      | G     |
|     10 | Hanna   | Ullevik    |      4 | Fotball   | J     |

| ProgramfagID | Programfag            | Lerer                | Klasserom |
|--------------|-----------------------|----------------------|-----------|
|            1 | Informasjonsteknologi | Lars Helgerød        | B308      |
|            2 | Medievitenskap        | Bendik Kristoffersen | B306      |
|            4 | Helse og Sosial       | Trine Haug           | B303      |
|            5 | Kokkefag              | Bjørn Kolstad        | Kjøkken   |

## Oppgave 2:
### a
Spørring for å få alle jentene blant elevene
```sql
SELECT * FROM `elev` WHERE Kjonn = "J";
```

### b
Spørring for å fa alle guttene i klasse 2
```sql
SELECT * FROM `elev` WHERE Kjonn = "G" AND Klasse = "2";
```

### c
Spørring for å finne ut hvor mange jenter det er i klasse 2
```sql
SELECT * FROM `elev` WHERE Kjonn = "J" AND Klasse = "2";
```

### d
Spørring for å finne de elevene som starter på J
```sql
SELECT * FROM `elev` WHERE Fornavn LIKE "J%";
```

### e
Spørring for å finne de elevene som starter på M og går i klasse 2
```sql
SELECT * FROM `elev` WHERE Fornavn LIKE "M%" AND Klasse = "2";
```

### f
Spørring for å finne de som har fotball som hobby
```sql
SELECT * FROM `elev` WHERE Hobby = "Fotball";
```

## Oppgave 3:
| DatamaskinID | Merke | Moddel |
|--------------|-------|--------|
|            1 | Dell  | 2015   |
|            2 | Acer  | 2017   |
|            3 | Asus  | 2012   |

## Oppgave 4:
| ElevID | Fornavn | Etternavn  | Klasse | Hobby     | Kjonn | Datamaskin |
|--------|---------|------------|--------|-----------|-------|------------|
|      1 | Thomas  | Hansen     |      1 | Fotball   | G     |          1 |
|      2 | Linn    | Jensen     |      2 | Gaming    | J     |          2 |
|      3 | Lise    | Olsen      |      1 | Strikking | J     |          3 |
|      4 | Eva     | Yttergård  |      2 | Gaming    | J     |          2 |
|      5 | Martin  | Hjelle     |      2 | Strikking | G     |          3 |
|      6 | Bjarne  | Utvik      |      3 | Håndball  | G     |          1 |
|      7 | Joakim  | Fredriksen |      1 | Løping    | G     |          1 |
|      8 | Jenny   | Gullaug    |      4 | Band      | J     |          3 |
|      9 | Bjarte  | Ås         |      2 | Band      | G     |          1 |
|     10 | Hanna   | Ullevik    |      4 | Fotball   | J     |          2 |

## Oppgave 5:
Koble opp Datamaskin kolonen til datamskin tabellen
```sql
ALTER TABLE `elev` ADD CONSTRAINT `Datamskin` FOREIGN KEY (`Datamaskin`) REFERENCES `datamaskin`(`DatamaskinID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
```

## Oppgave 6:
Finne ut hvilket datamaskiner Martin og Hanna har
```sql
SELECT * FROM `elev` INNER JOIN `datamaskin` ON elev.Datamaskin = datamaskin.DatamaskinID WHERE Fornavn IN ("Martin", "Hanna");
```

## Oppgave 7:
Sortere elevene etter fornavn i kronologisk rekkefølge
```sql
SELECT * FROM `elev` ORDER BY Fornavn;
```

## Oppgave 8:
Finne Klassene med mer en 2 elever og sortere dem i kronologisk rekkefølge
```sql
SELECT Klasse, COUNT(Klasse) FROM `elev` GROUP BY Klasse HAVING COUNT(Klasse) >= 2 ORDER BY Klasse;
```

## Oppgave 9:
Oppdatere hobbyen til en av eleven med en UPDATE kommando
```sql
UPDATE `elev` SET Hobby = "ny hobby" WHERE Fornavn = "Lise";
```

## Oppgave 10:
Legge til en ny elev i tabbelen
```sql
INSERT INTO `elev` (`ElevID`, `Fornavn`, `Etternavn`, `Klasse`, `Hobby`, `Kjonn`, `Datamaskin`) VALUES (NULL, 'Peder', 'Peterson', '2', 'Gaming', 'J', '2');
```

## Oppgave 11:
Slette en elev med sql
```sql
DELETE FROM `elev` WHERE Fornavn = "Peder";
```

## Oppgave 12:
### Oppgave 9 med annet språk:
```php
if (mysqli_num_rows($result) > 0) {
$row = $result->fetch_assoc();

    if(MD5($current_passord) == $row["Passord"]) {
        if($new_password == $repeat_password) {
            $sql2 = "UPDATE `users` SET `Passord` = '" . Md5($new_password) . "'";
            $changed = $conn->query($sql2);
            Redirect('password_changed.php?user=' . $row["KryptertBruker"], false);
        } else {
            echo "<h2>Passordene er ikke like</h2>";
        }
    } else {
        echo "<h2>Feil passord</h2>";
    }
}
```