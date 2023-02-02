SELECT SUM(Quartier.Population), Département.NomDépartement 
FROM Département 
INNER JOIN Ville ON Ville.CodeDépartement = Département.CodeDépartement
INNER JOIN Quartier ON Quartier.CodeVille = Ville.CodeVille
INNER JOIN Région ON Région.CodeRégion = Département.CodeRégion
INNER JOIN Contenir ON Contenir.CodeQuartier = Quartier.CodeQuartier
INNER JOIN Zone ON Zone.CodeZone = Contenir.CodeZone
WHERE Région.NomRégion = "Bourgogne-Franche-Comté"
AND Zone.NomZone = "franchise"
ORDER BY Département.NomDépartement ASC;
