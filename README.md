
# TP Qualité stress

**Scénario de Test**

Le test de charge utilise une suite de tests Jest qui envoie des requêtes GET à l’endpoint /feedback. Les paramètres des requêtes incluent un name et un message, générés dynamiquement pour chaque utilisateur simulé.

**Méthodologie**

1.  **Simulations d’Utilisateurs** : Le test envoie des requêtes en parallèle, avec un nombre d’utilisateurs variant de 1 à 1000.

2.  **Durée du Test** : Chaque scénario est exécuté pendant 10 secondes, sauf pour le dernier où 1000 utilisateurs sont simulés pendant 1 minute.

3.  **Mesures Capturées** :

•  Temps de réponse moyen par requête.

•  Nombre de requêtes réussies (status 200).

•  Nombre de requêtes échouées.


**Résumé des Tests**

| Scénario  | Temps de Réponse Moyen (ms)  | Succès  |  Échecs |
|---|---|---|---|
| 1 utilisateur, 10 secondes   | 5.51   |  1809 |  0 |
|  10 utilisateurs, 10 secondes |  14.47 | 5780  | 0  |
|  100 utilisateurs, 10 secondes  | 107.17  | 7400  |  0 |
| 500 utilisateurs, 10 secondes | 643.49 | 2994 | 6  |
| 1000 utilisateurs, 10 secondes  | 1087.90  | 5237 | 763  |
| 1000 utilisateurs, 1 minute | 1172.88  | 28417  | 1583 |


**Observations**

1.  **Performances Initiales** :

•  Avec un petit nombre d’utilisateurs (1 à 100), l’API répond rapidement, avec un temps de réponse moyen de 5 à 107 ms, et aucune requête échouée.

2.  **Charge Plus Importante** :

•  À partir de 500 utilisateurs simultanés, le temps de réponse augmente significativement, atteignant environ 643 ms.

•  Des échecs mineurs commencent à apparaître (6 échecs pour 500 utilisateurs).

3.  **Charge Maximale (1000 utilisateurs)** :

•  Le temps de réponse dépasse 1 seconde en moyenne.

•  Le nombre d’échecs augmente, avec 763 échecs sur 6000 requêtes dans le test de 10 secondes, et 1583 échecs dans le test de 1 minute.



**Conclusion**

•  **Scalabilité** : L’API gère efficacement jusqu’à 100 utilisateurs simultanés avec des temps de réponse acceptables et aucun échec.

•  **Limites** : Avec 500 utilisateurs ou plus, les performances se dégradent et des échecs commencent à apparaître.

•  **Prochaines Étapes** : Il est recommandé d’analyser les goulets d’étranglement dans l’architecture backend pour optimiser le traitement des requêtes lorsque la charge augmente.
