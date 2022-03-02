Section test2.

    Variables P Q R S : Prop.

    Section test2Aquestion1.
        Hypothesis H0 : S -> ~Q.
        Hypothesis H1 : S -> R -> Q.

        Lemma A1 : (~S -> P) -> (S -> R) -> P.
        Proof.
        Admitted.
        End test2Aquestion1.

    Section test2Aquestion2.
        Hypothesis H0 : S -> P.
        Hypothesis H1 : P -> Q.
        Hypothesis H2 : ~(S -> R).
        
        Lemma A2 : R -> (P -> R) -> Q.
        Proof.
        Admitted.
    End test2Aquestion2.

    Section test2Bquestion1.
        Hypothesis H0 : P -> ~R.
        Hypothesis H1 : P -> Q -> R.

        Lemma B1 : (~P -> S) -> (P -> Q) -> S.
        Proof.
        Admitted.
    End test2Bquestion1.

    Section test2Bquestion2.
        Hypothesis H0 : P -> S.
        Hypothesis H1 : S -> R.
        Hypothesis H2 : ~(P -> Q).

        Lemma B2 : Q -> (S -> Q) -> R.
        Proof.
        Admitted.
    End test2Bquestion2.

End test2.