/*
Double-Cubic Seat
source: http://www.flong.com/archive/texts/code/shapers_poly/

This seat-shaped function is formed by joining two 3rd-order polynomial (cubic) curves. The curves meet with a horizontal inflection point at the control coordinate (a,b) in the unit square.
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st,float y){
    return smoothstep(y-.005,y,st.y)-smoothstep(y,y+.005,st.y);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    float b=.6;
    float a=.5;
    float x_lt_a=b-b*pow((1.-st.x/a),3.);
    float x_gt_a=b+(1.-b)*pow((st.x-a)/(1.-a),3.);
    float y=(1.-step(a,st.x))*x_lt_a+step(a,st.x)*x_gt_a;
    
    float plt=plot(st,y);
    
    vec3 bg_color=vec3(0.,0.,1.);
    vec3 fg_color=vec3(1.,0.,0.);
    gl_FragColor=(1.-plt)*vec4(bg_color,1.)+plt*vec4(fg_color,1.);
}
