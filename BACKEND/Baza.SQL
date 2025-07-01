--create database grupe_proizvoda;

use master;
go
drop database if exists grupe_proizvoda;
go
create database grupe_proizvoda collate Croatian_CI_AS;
go
use grupe_proizvoda;

create table grupe_proizvoda(
sifra_grupe int primary key,
naziv_grupe varchar(50) not null
);

create table proizvodi(
sifra_proizvoda int primary key,
naziv_proizvoda varchar(100) not null,
grupa int,
nabavna_cijena decimal(10,2) not null,
prodajna_cijena decimal(10,2) not null,
foreign key (grupa) references grupe_proizvoda(sifra_grupe) 
);

create table prodaja(
sifra_prodaje int primary key,
sifra_proizvoda int,
datum_prodaje date not null,
kolicina int not null,
cijena_po_jednici decimal(10,2) not null,
foreign key (sifra_proizvoda) references proizvodi(sifra_proizvoda)
);

-- marža po proizvodu

select  p.sifra_proizvoda, p.naziv_proizvoda,
sum(pr.kolicina) as ukupno_prodano,p.nabavna_cijena,p.prodajna_cijena,
(p.prodajna_cijena - p.nabavna_cijena) * sum(pr.kolicina) as marza
from proizvodi p
join  prodaja pr on p.sifra_proizvoda = pr.sifra_proizvoda
group by  p.sifra_proizvoda, p.naziv_proizvoda, p.nabavna_cijena, p.prodajna_cijena
order by marza desc;

-- marža po grupi proizvoda

select gp.sifra_grupe,gp.naziv_grupe,
sum(pr.kolicina) as ukupno_prodano,
sum((p.prodajna_cijena - p.nabavna_cijena) * pr.kolicina) as ukupna_marza
from grupe_proizvoda gp
join proizvodi p on gp.sifra_grupe = p.grupa
join prodaja pr on p.sifra_proizvoda = pr.sifra_proizvoda
group by gp.sifra_grupe, gp.naziv_grupe
order by ukupna_marza desc;

-- unos 10 proizvoda u grupe proizvoda

insert into grupe_proizvoda (sifra_grupe, naziv_grupe) values
(1, 'Pića'),
(2, 'Mliječni proizvodi'),
(3, 'Pekarski proizvodi'),
(4, 'Mesni proizvodi'),
(5, 'Voće'),
(6, 'Povrće'),
(7, 'Zamrznuta hrana'),
(8, 'Grickalice'),
(9, 'Kozmetika'),
(10, 'Kućanstvo');

-- unos 10 proizvoda po različitim grupama

insert into proizvodi (sifra_proizvoda, naziv_proizvoda, grupa, nabavna_cijena, prodajna_cijena) values
(101, 'Coca Cola 1L', 1, 0.80, 1.20),
(102, 'Jogurt 0.5L', 2, 0.60, 1.00),
(103, 'Kruh bijeli', 3, 0.40, 0.80),
(104, 'Pileći file', 4, 3.50, 5.00),
(105, 'Banana', 5, 0.70, 1.10),
(106, 'Rajčica', 6, 0.90, 1.50),
(107, 'Zamrznuta pizza', 7, 2.00, 3.00),
(108, 'Čips', 8, 0.70, 1.20),
(109, 'Šampon', 9, 1.80, 3.00),
(110, 'Papirnati ručnici', 10, 1.00, 1.80);

-- unos 10 prodaja za razne proizvode

insert into prodaja (sifra_prodaje, sifra_proizvoda, datum_prodaje, kolicina, cijena_po_jednici) values
(1001, 101, '2025-05-01', 5, 1.20),
(1002, 102, '2025-05-02', 3, 1.00),
(1003, 103, '2025-05-03', 10, 0.80),
(1004, 104, '2025-05-04', 2, 5.00),
(1005, 105, '2025-05-05', 6, 1.10),
(1006, 106, '2025-05-06', 4, 1.50),
(1007, 107, '2025-05-07', 1, 3.00),
(1008, 108, '2025-05-08', 7, 1.20),
(1009, 109, '2025-05-09', 3, 3.00),
(1010, 110, '2025-05-10', 2, 1.80);


-- pregled proizvoda sa pripadajućom grupom

select p.sifra_proizvoda,p.naziv_proizvoda, g.naziv_grupe, p.nabavna_cijena,p.prodajna_cijena
from proizvodi p
join grupe_proizvoda g on p.grupa = g.sifra_grupe;
select p.sifra_proizvoda,p.naziv_proizvoda,g.naziv_grupe,p.nabavna_cijena,p.prodajna_cijena
from proizvodi p
join grupe_proizvoda g on p.grupa = g.sifra_grupe;

-- pregled svih prodaja s nazivima proizoda

select pr.sifra_prodaje,p.naziv_proizvoda,pr.datum_prodaje,pr.kolicina,pr.cijena_po_jednici
from prodaja pr
join proizvodi p on pr.sifra_proizvoda = p.sifra_proizvoda;

-- ispisati razliku prodajnog i nabavnog iznosa
-- grupirane po nazivu grupe

select gp.naziv_grupe,
sum(p.nabavna_cijena * pr.kolicina) as ukupna_nabavna_vrijednost,
sum(pr.cijena_po_jednici * pr.kolicina) as ukupna_prodajna_vrijednost,
sum((pr.cijena_po_jednici - p.nabavna_cijena) * pr.kolicina) as ukupna_razlika
from prodaja pr
join proizvodi p on pr.sifra_proizvoda = p.sifra_proizvoda
join grupe_proizvoda gp on p.grupa = gp.sifra_grupe
group by gp.naziv_grupe;

select sifra_proizvoda,nabavna_cijena from proizvodi;
select sifra_prodaje from prodaja;
select  * from proizvodi where nabavna_cijena <5;
select * from proizvodi;
select sifra_proizvoda, nabavna_cijena from proizvodi;
select * from grupe_proizvoda;

-- gp je naziv grupa proizvoda u kojoj grupiramo rezultate
-- sum(p.nabavna_cijena * pr.kolicina) uk. nab. vrijed. prodanih proizvoda u toj grupi
-- sum(pr.cijena_po_jednici * pr.kolicina) uk. pr vrijed. prod. proiz. u toj grupi
-- sum((pr.cijena_po_jednici - p.nabavna_cijena) * pr.kolicina) uk razlika između prodajne i nabave vrijednosti
