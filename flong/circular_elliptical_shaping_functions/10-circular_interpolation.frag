/*
Circular Interpolation: Ease-In and Ease-Out
source: http://www.flong.com/archive/texts/code/shapers_circ/

A circular arc offers a quick and easy-to-code method for easing in or out of the unit square.
The computational efficiency of the function is diminished by its use of a square root, however.
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st,float y){
    return smoothstep(y-.009,y,st.y)-smoothstep(y,y+.009,st.y);
}

float circular_ease_in(float x) {
    return 1.0 - sqrt(1. - pow(x, 2.0));
}

float circular_ease_out(float x) {
    return sqrt(1. - pow(1. - x, 2.));
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    // float y=circular_ease_in(st.x);
    float y = circular_ease_out(st.x);
    
    float plt=plot(st,y);
    
    vec3 bg_color=vec3(0.,0.,0.);
    vec3 fg_color=vec3(1.,1.,1.);
    gl_FragColor=(1.-plt)*vec4(bg_color,1.)+plt*vec4(fg_color,1.);
}
