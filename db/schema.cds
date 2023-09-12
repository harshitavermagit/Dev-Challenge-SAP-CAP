namespace golf;

using {managed} from '@sap/cds/common';

entity Holes {
    key ID    : UUID;
    key round_ID : Association to Rounds;
        score : Integer;
        title : String(111);
        par   : Integer;
        shots : Composition of many Shots
                    on shots.hole_ID = $self;
        result: String;
}

entity Rounds : managed {
    key ID    : UUID;
        title : String(111);
        holes : Composition of many Holes
                    on holes.round_ID = $self;

}


entity Shots {
    key ID   : UUID;
    key hole_ID : Association to Holes;
    title : String(111);
}
