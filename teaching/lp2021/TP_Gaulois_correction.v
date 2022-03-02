Ltac forall_e H t := (generalize (H t); intro).

Require Import Setoid.


Section Gaulois.
  Variable personnage: Set.
  Variables humain gaulois romain animal: personnage -> Prop.
  Variables Idefix Panoramix: personnage.

  Hypothesis Hngr: forall p:personnage, ~(gaulois p /\ romain p).
  Hypothesis Hpers: forall p:personnage, animal p \/ gaulois p \/ romain p.
  Hypothesis Hhum: forall p:personnage, humain p <-> (gaulois p \/ romain p).
  Hypothesis Hnon_humain_animal:
    forall p:personnage, ~(humain p /\ animal p).

  Hypothesis Hidef: animal Idefix.
  Hypothesis Hpano: gaulois Panoramix.
  Hypothesis Hrom: exists p:personnage, romain p.

  Theorem Exemple: exists x:personnage, humain x /\ ~gaulois x.
  Proof.
    destruct Hrom as [y Hy].
    exists y.
    split.
    - rewrite Hhum.
      right.
      assumption.
    - forall_e Hngr y.
      intro Hgy.
      apply H.
      split.
      + assumption.
      + assumption.
  Qed.

(* Dans les 5 théorèmes ci-dessous, remplacez "Admitted." par un 
   script de preuve complet, que vous terminerez par "Qed."

   Barème indicatif: pour chaque théorème, 3.5 points pour un
   script qui prouve le théorème sans rien admetter; 0.5 point 
   supplémentaire si la preuve est structurée de manière à 
   permettre de la suivre sans interagir avec Coq (prendre exemple
   sur la preuve précédente).

   *)
  
  Theorem Exercice1: ~ gaulois Idefix.
  Proof.
    intro.
    (* À ce stade de la preuve, on suppose qu'Idéfix est un animal et est 
    gaulois, alors que l'hypothèse Hnon_humain_animal ne dit qu'aucun
    personnage ne peut-être à la fois un humain et un animal. **)
    forall_e Hnon_humain_animal Idefix.
    apply H0.
    split.
    - rewrite Hhum.
      left ; assumption.
    - assumption.
  Qed.

(* Autre preuve qui n'utilise pas forall_e : 
 Proof.
    intro.
    apply (Hnon_humain_animal Idefix).
    split.
    - rewrite Hhum.
      left ; assumption.
    - assumption.
  Qed.
*)

  Theorem Exercice2:
    forall p:personnage, humain p -> ~romain p -> gaulois p.
  Proof.
    intros.
    rewrite Hhum in H.
    destruct H.
    - assumption.
    - contradiction.
  Qed.

  Theorem Exercice3:
    exists p:personnage, humain p /\ ~gaulois p.
  Proof.
    (* On veut prouver "exists p:personnage, humain p /\ ~gaulois p",
    on doit donc trouver un objet p de type personnage qui satisfait
    "humain p /\ ~gaulois p" : prenons un romain ! *)
    destruct Hrom.
    exists x.
    split.
    - rewrite Hhum.
      right ; assumption.
    - intro.
      (* À ce stade, on suppose que x est romain et gaulois, ce qui n'est pas possible à cause de Hngr. *)
      apply (Hngr x).
      (* Au lieu de "apply (Hngr x)" on aurait pu faire
      "forall_e Hngr x. apply H1.". *)
      split ; assumption.
  Qed.

  Theorem Exercice4:
    forall p, ~animal p -> gaulois p \/ romain p.
  Proof.
    intros.
    destruct (Hpers p).
    - contradiction.
    - assumption.
  Qed.

  Theorem Exercice5: Idefix <> Panoramix.
  Proof.
    (* Indication: on peut utiliser n'importe quel théorème, 
       y compris un qui a été prouvé comme exercice *)
    (* Idée : On sait qu'Idefix n'est pas gaulois mais que Paroramix l'est ! *)
    intro.
    apply Exercice1.
    rewrite H.
    assumption.
  Qed.

End Gaulois.