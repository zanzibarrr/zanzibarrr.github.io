# QCM Bases de Données Avancées

QCM interactifs pour réviser les examens **TI603 — Bases de Données Avancées**.

## QCM disponibles

| Bouton | Fichier | Questions | Contexte affiché |
|--------|---------|-----------|------------------|
| **DE 24-25** | `json/bdd.json` | 40 | Q31–35 vues/hôpital ; Q36–40 Livres |
| **DE 23-24** | `json/bdd_2324.json` | 50 | Q32–40 SalesRecord ; Q41–50 magasin/triggers |
| **DE P2023 (2021)** | `json/bdd_p2023.json` | 60 | Contextes complets dans `contexts-exam.js` (ex. Q13 V_EMP, Q17 deadlock, Q32 vue V1) |
| **DE BDD (2021)** | `json/bdd_de_bdd.json` | 50 | Contextes complets dans `contexts-exam.js` (MCD, Design 1/2, FILM, ordersview, Person) |

- Ordre du sujet (1 → n)
- Réponses d’après les corrections officielles
- Questions à réponses multiples : tout cocher puis **Valider**

## Lancer le site

```bash
python -m http.server 8000
```

http://localhost:8000 → **QCM Bases de Données**

## Régénérer les JSON

```bash
python build_bdd_json.py
python build_bdd_2324.py
python build_bdd_p2023.py
python build_bdd_de_bdd.py
```

Sources : `2425-..._81823_correction.pdf`, `2324-..._ba7c5_correction.pdf`, `BDD_DE_P2023_1.pdf`, `DE_BDD.pdf`.
