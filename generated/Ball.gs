var Position_X = 33;
var Position_Y = -118;
var Speed_X = -8;
var Speed_Y = -1;
var Is_Squashed = 0;

costumes "Ball/Ball.svg", "Ball/Squashed.svg";

nowarp proc Fire_Ball {
    Speed_X = (mouse_x() - Position_X) / 10;
    Speed_Y = (mouse_y() - Position_Y) / 10;
}

nowarp proc Fix_If_Ball_Stuck {
    until not color_is_touching_color("#ff0000", "#00cc44") {
        Position_Y += 1;
        set_y Position_Y;
    }
}

nowarp proc Check_Off_Screen {
    if Position_X < -240 {
        Position_X += 480;
    }
    if Position_X > 240 {
        Position_X += -480;
    }
    if Position_Y < -180 {
        Position_Y += 360;
    }
    if Position_Y > 180 {
        Position_Y = 180;
    }
}

nowarp proc Move_Ball_X {
    Position_X += Speed_X;
    set_x Position_X;
    if color_is_touching_color("#ff0000", "#00cc44") {
        Position_X += -Speed_X;
        Speed_X = 0 * Speed_X;
        set_x Position_X;
    }
}

nowarp proc Move_Ball_Y {
    Speed_Y += 0;
    Position_Y += Speed_Y;
    set_y Position_Y;
    if color_is_touching_color("#ff0000", "#00cc44") {
        Position_Y += -Speed_Y;
        if abs(Speed_Y) < 1 {
            Speed_Y = 0;
            if Is_Squashed == 1 {
                Speed_X = 0 * Speed_X;
            }
            else {
                Speed_X = 0 * Speed_X;
            }
        }
        elif Is_Squashed == 1 {
            Speed_Y = 0 * Speed_Y;
        }
        else {
            Speed_Y = 0 * Speed_Y;
        }
        set_y Position_Y;
        if not mouse_down() {
            if Is_Squashed == 1 {
                Is_Squashed = 0;
                switch_costume "Ball";
                Fix_If_Ball_Stuck;
                Fire_Ball;
            }
        }
    }
}

onflag {
    Position_X = 0;
    Position_Y = 0;
    set_size 100;
    switch_costume "Ball";
    Is_Squashed = 0;
    goto Position_X, Position_Y;
    Speed_X = 3.0;
    Speed_Y = 0;
    forever {
        Move_Ball_X;
        Move_Ball_Y;
        Check_Off_Screen;
        if mouse_down() {
            switch_costume "Squashed";
            Is_Squashed = 1;
        }
    }
}

