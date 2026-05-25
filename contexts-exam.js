/**
 * Contextes complets (texte du sujet) — DE P2023 et DE BDD.
 * Clé = numéro de question (1, 2, …).
 */
window.EXAM_CONTEXTS = {
  p2023: {
    1: `<h3>Contexte</h3><pre>CREATE TABLE orders (
    ord_no NUMERIC(2) CONSTRAINT ord_pk PRIMARY KEY,
    ord_mode VARCHAR(10),
    ord_date DATE,
    client_id NUMERIC(4)
);

CREATE TABLE ord_items(
    item_no NUMERIC(3),
    ord_no NUMERIC(2),
    qte NUMERIC(3) CHECK (qte BETWEEN 100 AND 200),
    expiry_date DATE,
    client_id NUMERIC(4),
    CONSTRAINT it_pk PRIMARY KEY (ord_no, item_no),
    CONSTRAINT ord_fk FOREIGN KEY (client_id)
        REFERENCES orders(client_id)
);</pre>`,
    2: `<h3>Contexte</h3><p>Considérons la table <strong>T(A: int, B: int, C: int)</strong>.</p>`,
    13: `<h3>Contexte</h3><p>On crée une vue à partir de la table <strong>EMPLOYEES</strong> du schéma HR :</p>
<pre>CREATE OR REPLACE VIEW V_EMP AS
SELECT department_id, sum(salary) somme, count(*) nbre
FROM employees
GROUP BY department_id;</pre>
<p>Ensuite on exécute :</p>
<pre>UPDATE V_EMP SET SOMME=20000 WHERE DEPARTMENT_ID=20;</pre>`,
    14: `<h3>Contexte</h3><p>Table <strong>T(A: int, B: int, C: int)</strong> avec <strong>A</strong> clé primaire.</p>
<p>Requête : <code>select A, B from T</code></p>`,
    17: `<h3>Contexte</h3><p>La session <strong>SCOTT</strong> reçoit après un <code>UPDATE</code> sur <strong>EMP</strong> :</p>
<pre>ERROR at line 1: deadlock detected while waiting for resource</pre>
<p>Une session <strong>JIM</strong> a une transaction qui a causé l'impasse.</p>`,
    18: `<h3>Contexte</h3><p>Table <strong>T(A: int, B: int)</strong> avec <strong>A</strong> clé primaire.</p>`,
    19: `<h3>Contexte</h3><p>Table <strong>T(A: int, B: int, C: int)</strong>.</p>`,
    20: `<h3>Contexte</h3><p>Tables <strong>Pieces</strong> et <strong>Produits</strong> — pièces utilisées pour fabriquer le produit.</p>`,
    23: `<h3>Contexte</h3><pre>SELECT promo_categorie, AVG(promo_prix) AS 'MOYPRIX',
       AVG(promo_prix)*.25 AS 'MOYPROMO'
FROM PROMOTIONS
WHERE promo_categorie IN ('TV', 'INTERNET','POST')
GROUP BY MOYPRIX
ORDER BY MOYPROMO;</pre>`,
    26: `<h3>Contexte</h3><p>Table <strong>CLIENTS</strong> : <code>client_ville='Paris'</code> pour <code>client_prenom='ABIGAIL'</code>.</p>
<pre>SELECT INITCAP(client_prenom||' '||UPPER(SUBSTR(client_ville,LENGTH(client_ville),2)))
FROM CLIENTS WHERE client_prenom='ABIGAIL';</pre>`,
    27: `<h3>Contexte</h3><p>Tables <strong>T(A, B)</strong> et <strong>S(B, C)</strong>.</p>`,
    30: `<h3>Contexte</h3><pre>1 CREATE ROLE hr_role IDENTIFIED BY pass;
2 GRANT CREATE table TO hr_role;
3 GRANT SELECT table TO hr_role;
4 GRANT CONNECT TO hr_role;</pre>`,
    32: `<h3>Contexte</h3><p>Définition de la vue <strong>V1</strong> :</p>
<pre>CREATE OR REPLACE VIEW V1 AS
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE department_id = 20;</pre>
<p>Quelles commandes permettent de <strong>créer</strong> cette vue ?</p>`,
    37: `<h3>Section — Schémas, relations, dépendances fonctionnelles</h3>`,
    38: `<h3>Section — Schémas, relations, dépendances fonctionnelles</h3>`,
    39: `<h3>Section — Schémas, relations, dépendances fonctionnelles</h3>`,
    40: `<h3>Contexte</h3><p>Tables :</p>
<ul>
<li><strong>SALARIES</strong> (Numsal, Nomsal, Ruesal, Cpsal, Villesal, Codeag)</li>
<li><strong>STAGE</strong> (Refstage, Nomstage, Duree)</li>
<li><strong>EFFECTUER</strong> (Numsal, Refstage)</li>
</ul>
<p>Affirmation : un salarié ne peut faire qu'un seul stage.</p>`,
    41: `<h3>Contexte</h3><p><strong>EMPLOYE</strong> (Num, Nom, Catégorie, Salaire). <strong>Num</strong> = clé primaire. <code>Catégorie → Salaire</code>.</p>`,
    42: `<h3>Section — Schémas, relations, dépendances fonctionnelles</h3>`,
    43: `<h3>Section — Schémas, relations, dépendances fonctionnelles</h3>`,
    44: `<h3>Contexte</h3><p><strong>R(A, B, C, D)</strong>, clé <strong>AB</strong>, attributs atomiques.</p>
<p><strong>F = { AB→CD, A→B, D→CB }</strong></p>`,
    46: `<h3>Contexte</h3><p><strong>CLIENT</strong> (numero, nom, prenom, dateDinscription), clé primaire <strong>numero</strong>.</p>`,
    47: `<h3>Contexte</h3><p>Dépendances fonctionnelles :</p>
<ol>
<li>NomClient → TypeClient</li>
<li>TypeClient → CategorieClient</li>
<li>NomClient → CategorieClient</li>
<li>NumCommande → DescCommande</li>
<li>(NumCommande, NomClient) → DateCommande</li>
</ol>`,
    45: `<h3>Section — Schémas, relations, dépendances fonctionnelles</h3>`,
    49: `<h3>Contexte</h3><p><strong>R(A,B,C,D,E)</strong></p>
<p><strong>DF</strong> = { AB→CDE ; B→C ; AC→BDE ; C→BD ; B→E }</p>`,
    53: `<h3>Contexte</h3><p>Modèle relationnel — tables, clés primaires, tuples.</p>`,
    54: `<h3>Section — Schémas, relations, dépendances fonctionnelles</h3>`,
    55: `<h3>Section — Schémas, relations, dépendances fonctionnelles</h3>`,
    56: `<h3>Section — Schémas, relations, dépendances fonctionnelles</h3>`,
    59: `<h3>Section — Schémas, relations, dépendances fonctionnelles</h3>`,
    60: `<h3>Section — Schémas, relations, dépendances fonctionnelles</h3>`,
    51: `<h3>Contexte</h3>
<p><strong>CLIENT</strong> (Num_client, Nom, Rue, Ville, Code_postal, Telephone) — PK Num_client</p>
<p><strong>FACTURE</strong> (Num_facture, Date_facture, Num_client) — PK Num_facture, FK Num_client → CLIENT</p>`,
    52: `<h3>Contexte</h3>
<p><strong>PRODUIT</strong> (Codeprod, Numcat, Nomprod) — PK (Codeprod, Numcat), FK Numcat → CATEGORIE</p>`,
    57: `<h3>Contexte</h3>
<p><strong>CLIENT</strong> (numero, nom, prenom, dateDinscription), PK numero.</p>`,
    58: `<h3>Contexte</h3>
<p><strong>CLIENT</strong> (numero, nom, prenom, dateDinscription)</p>
<p><strong>COMMANDE</strong> (numero, date, numeroDuClient) — PK numero, FK numeroDuClient → CLIENT</p>`,
  },

  de_bdd: {
    3: `<h3>Contexte</h3><p>Entité <strong>Personne</strong> :</p>
<ul>
<li><strong>ID_Personne</strong> (clé, AUTO_INCREMENT)</li>
<li><strong>Nom</strong> — VARCHAR(50)</li>
<li><strong>ADRESSE_RUE_VILLE_CP</strong> — VARCHAR(50)</li>
</ul>`,
    4: `<h3>Contexte</h3>
<p>Relation <strong>Employe</strong> (NumE, #NumDep, #NumChef, Nom, Fonction, DateEntree, Salaire)</p>
<p>Clé primaire : <strong>NumE</strong></p>
<pre>Select Nom from Employe where NumChef is NULL;</pre>`,
    22: `<h3>Contexte</h3>
<pre>CREATE VIEW ordersview AS
SELECT ord_num, ord_amount, a.agent_code, agent_name, cust_name
FROM orders a, customer b, agents c
WHERE a.cust_code=b.cust_code AND a.agent_code=c.agent_code;</pre>
<p>Mise à jour souhaitée :</p>
<pre>UPDATE ordersview SET cust_name="Harry" WHERE ord_num=121137</pre>`,
    26: `<h3>Contexte</h3><p><code>autocommit = false</code>. Exécution sur la table <strong>Person</strong> :</p>
<pre>insert into person values (123, "Hellen")
insert into person values (324, "Gary")
insert into person values (111, "Wayne")
ROLLBACK
insert into person values (544, "Mary")
insert into person values (862, "Dorra")
COMMIT
insert into person values (923, "Suzy")</pre>`,
    27: `<h3>Exercice 1 — Modèle conceptuel (MCD)</h3>
<p><strong>Employee</strong> : id, name, address, gender, date_of_birth, date_of_recruitement</p>
<p><strong>Department</strong> : d_no, name, location</p>
<p><strong>Project</strong> : P_no, name, location</p>
<p><strong>Child</strong> : c_id, c_name, gender</p>
<p><strong>Relations :</strong></p>
<ul>
<li><strong>works_in</strong> — Employee (1,1) ↔ Department (1,N)</li>
<li><strong>is_manager_of</strong> — Employee (0,1) ↔ Department (1,1), attribut <em>since</em></li>
<li><strong>has</strong> — Department (0,N) ↔ Project (0,N)</li>
<li><strong>works_on</strong> — Employee (0,N) ↔ Project (1,N)</li>
<li><strong>in_charge_of</strong> — Employee (0,N) ↔ Child (0,1)</li>
</ul>`,
    28: `<h3>Exercice 1 — MCD</h3><p><em>Même modèle conceptuel que la question 27.</em></p>`,
    29: `<h3>Exercice 1 — MCD</h3><p><em>Même modèle conceptuel que la question 27.</em></p>`,
    30: `<h3>Exercice 1 — MCD</h3><p><em>Même modèle conceptuel que la question 27.</em></p>`,
    31: `<h3>Exercice 1 — MCD</h3><p><em>Même modèle conceptuel que la question 27.</em></p>`,
    32: `<h3>Exercice 1 — MCD</h3><p><em>Même modèle conceptuel que la question 27.</em></p>`,
    33: `<h3>Exercice 1 — MCD</h3><p><em>Même modèle conceptuel que la question 27.</em></p>`,
    34: `<h3>Exercice 1 — MCD</h3><p><em>Même modèle conceptuel que la question 27.</em></p>`,
    35: `<h3>Exercice 2 — Normalisation (Design 1)</h3>
<table style="width:100%;font-size:0.82em;border-collapse:collapse;margin:8px 0">
<tr><th>OID</th><th>O_Date</th><th>CID</th><th>C_Name</th><th>C_State</th><th>PID</th><th>P_Desc</th><th>P_Price</th><th>Qty</th></tr>
<tr><td>1006</td><td>10/24/09</td><td>2</td><td>Apex</td><td>NC</td><td>7,4,5</td><td>Table, Desk, Chair</td><td>800, 325, 200</td><td>1,1,5</td></tr>
<tr><td>1007</td><td>10/25/09</td><td>6</td><td>Acme</td><td>GA</td><td>11,4</td><td>Dresser, Chair</td><td>500, 200</td><td>4, 6</td></tr>
</table>
<p><strong>DF :</strong> OID→O_Date ; CID→C_Name, C_State ; PID→P_Desc, P_Price ; OID→CID ; (PID,OID)→Qty.</p>
<p><em>7,4,5</em> = produits 7, 4 et 5 — <em>1,1,5</em> = quantités.</p>`,
    36: `<h3>Exercice 2 — Design 1</h3><p><em>Même tableau et DF que la question 35.</em></p>`,
    37: `<h3>Exercice 2 — Design 1</h3><p><em>Même tableau Design 1.</em></p>`,
    38: `<h3>Exercice 2 — Design 1</h3>
<p><em>Design 1 + DF complètes :</em></p>
<ul>
<li>OID → O_Date</li>
<li>CID → C_Name, C_State</li>
<li>PID → P_Desc, P_Price</li>
<li>OID → CID</li>
<li>(PID, OID) → Qty</li>
</ul>
<p>Objectif : normaliser en <strong>3FN</strong>.</p>`,
    39: `<h3>Exercice 2 — Design 2</h3>
<p><strong>Customer</strong> (CID, C_Name, C_State) — ex. (2, Apex, NC), (6, Acme, GA)</p>
<p><strong>Product</strong> (PID, P_Desc, P_Price) — ex. (7, Table, 800), (5, Desk, 325), (4, Chair, 200), (11, Dresser, 500)</p>
<p><strong>Order</strong> (OID, O_Date, CID, PID, Quantity) — ex. (1006, 10/24/09, 2, 7, 1), (1006, 10/24/09, 2, 4, 5), (1007, 10/25/09, 6, 11, 4)…</p>`,
    40: `<h3>Exercice 2 — Design 2</h3><p><em>Même tables Customer, Product, Order.</em></p>`,
    41: `<h3>Exercice 2 — Design 2</h3><p><em>Même Design 2.</em></p>`,
    42: `<h3>Exercice 2 — Design 2</h3><p><em>Même Design 2.</em></p>`,
    43: `<h3>Exercice 2 — Design 2</h3><p><em>Même Design 2 — décomposition pour 2FN.</em></p>`,
    44: `<h3>Exercice 3 — SQL (schéma cinéma)</h3>
<pre>FILM (id, title, release_year, country, Duration, language, budget)
PERSON (id, name, birthdate, deathdate)
PLAYS_IN (id_person, id_film, role)
DIRECTS (id_person, id_film)</pre>`,
    45: `<h3>Exercice 3 — SQL</h3><p><em>Même schéma FILM / PERSON / PLAYS_IN / DIRECTS.</em></p>`,
    46: `<h3>Exercice 3 — SQL</h3><p><em>Même schéma.</em></p>`,
    47: `<h3>Exercice 3 — SQL</h3><p><em>Même schéma.</em></p>`,
    48: `<h3>Exercice 3 — SQL</h3>
<pre>select country, SUM(budget) from FILM where release_year > 2000
group by country having AVG(budget) > 10000000</pre>`,
    49: `<h3>Exercice 3 — SQL</h3>
<pre>select name as director from PERSON join DIRECTS using(id_person)</pre>`,
    50: `<h3>Exercice 3 — SQL</h3>
<p>Équivalence de :</p>
<pre>select * from FILM where release_year between 1990 and 2000</pre>`,
  },
};
